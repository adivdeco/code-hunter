// const cloudinary = require('cloudinary').v2;
// const fs = require('fs');

// // Configure Cloudinary once using environment variables
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//     secure: true
// });

// const uploadOnCloudinary = async (localFilePath, options = {}) => {
//     try {
//         if (!localFilePath) {
//             throw new Error("No file path provided");
//         }

//         // Upload with additional options and explicit resource type
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto",
//             ...options
//         });

//         fs.unlinkSync(localFilePath); // Clean up temp file
//         return response;
//     } catch (error) {
//         if (fs.existsSync(localFilePath)) {
//             fs.unlinkSync(localFilePath); // Clean up temp file on error
//         }
//         console.error("Cloudinary upload error:", error);
//         throw error; // Re-throw to handle in controller
//     }
// };

// const deleteFromCloudinary = async (publicId, resourceType = "image") => {
//     try {
//         if (!publicId) {
//             throw new Error("No public ID provided");
//         }
//         return await cloudinary.uploader.destroy(publicId, {
//             resource_type: resourceType
//         });
//     } catch (error) {
//         console.error("Cloudinary delete error:", error);
//         throw error;
//     }
// };

// module.exports = { uploadOnCloudinary, deleteFromCloudinary };




const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const stream = require('stream');
const { promisify } = require('util');
const pipeline = promisify(stream.pipeline);
const axios = require('axios');

// Configure Cloudinary once using environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

/**
 * Uploads a file to Cloudinary with advanced options
 * @param {string} localFilePath - Path to the local file
 * @param {object} options - Additional Cloudinary upload options
 * @returns {Promise<object>} Cloudinary upload response
 */
const uploadOnCloudinary = async (localFilePath, options = {}) => {
    try {
        if (!localFilePath) {
            throw new Error("No file path provided");
        }

        // Default options
        const uploadOptions = {
            resource_type: "auto",
            quality_analysis: true,
            accessibility_analysis: true,
            ...options
        };

        // For videos, add additional video-specific options
        if (uploadOptions.resource_type === 'video') {
            uploadOptions.quality_control = 'auto:good';
            uploadOptions.audio_codec = 'aac';
            uploadOptions.video_codec = { codec: 'h264', profile: 'high', level: '4.1' };
        }

        // Upload the file
        const response = await cloudinary.uploader.upload(localFilePath, uploadOptions);

        // Clean up temp file
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return response;
    } catch (error) {
        // Clean up temp file on error
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        console.error("Cloudinary upload error:", error);
        throw error;
    }
};

/**
 * Uploads a file from a URL to Cloudinary
 * @param {string} fileUrl - URL of the file to upload
 * @param {object} options - Additional Cloudinary upload options
 * @returns {Promise<object>} Cloudinary upload response
 */
const uploadFromUrl = async (fileUrl, options = {}) => {
    try {
        if (!fileUrl) {
            throw new Error("No URL provided");
        }

        const response = await cloudinary.uploader.upload(fileUrl, {
            resource_type: "auto",
            ...options
        });

        return response;
    } catch (error) {
        console.error("Cloudinary URL upload error:", error);
        throw error;
    }
};

/**
 * Deletes a file from Cloudinary
 * @param {string} publicId - Public ID of the file to delete
 * @param {string} resourceType - Type of resource ('image', 'video', 'raw')
 * @returns {Promise<object>} Cloudinary delete response
 */
const deleteFromCloudinary = async (publicId, resourceType = "image") => {
    try {
        if (!publicId) {
            throw new Error("No public ID provided");
        }

        // First, check if the resource exists
        try {
            await cloudinary.api.resource(publicId, { resource_type: resourceType });
        } catch (checkError) {
            if (checkError.http_code === 404) {
                console.warn(`Resource ${publicId} not found in Cloudinary`);
                return { result: "not found" };
            }
            throw checkError;
        }

        // If it exists, delete it
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
            invalidate: true // Invalidate CDN cache
        });

        return result;
    } catch (error) {
        console.error("Cloudinary delete error:", error);
        throw error;
    }
};

/**
 * Generates a signed URL for direct upload from client
 * @param {string} folder - Cloudinary folder path
 * @param {string} resourceType - Type of resource ('image', 'video', 'raw')
 * @returns {object} Signed upload parameters
 */
const generateSignedUploadParams = (folder = '', resourceType = 'auto') => {
    const timestamp = Math.round(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request(
        {
            timestamp,
            folder,
            resource_type: resourceType
        },
        process.env.CLOUDINARY_API_SECRET
    );

    return {
        signature,
        timestamp,
        api_key: process.env.CLOUDINARY_API_KEY,
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        folder,
        resource_type: resourceType
    };
};

/**
 * Generates a thumbnail URL with transformations
 * @param {string} publicId - Public ID of the original image/video
 * @param {object} options - Transformation options
 * @returns {string} Transformed URL
 */
const generateThumbnailUrl = (publicId, options = {}) => {
    const defaultOptions = {
        width: 300,
        height: 200,
        crop: 'fill',
        quality: 'auto',
        format: 'jpg'
    };

    const transformOptions = { ...defaultOptions, ...options };
    return cloudinary.url(publicId, transformOptions);
};

module.exports = {
    uploadOnCloudinary,
    uploadFromUrl,
    deleteFromCloudinary,
    generateSignedUploadParams,
    generateThumbnailUrl
};