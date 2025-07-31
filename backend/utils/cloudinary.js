const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary once using environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

const uploadOnCloudinary = async (localFilePath, options = {}) => {
    try {
        if (!localFilePath) {
            throw new Error("No file path provided");
        }

        // Upload with additional options and explicit resource type
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            ...options
        });

        fs.unlinkSync(localFilePath); // Clean up temp file
        return response;
    } catch (error) {
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath); // Clean up temp file on error
        }
        console.error("Cloudinary upload error:", error);
        throw error; // Re-throw to handle in controller
    }
};

const deleteFromCloudinary = async (publicId, resourceType = "image") => {
    try {
        if (!publicId) {
            throw new Error("No public ID provided");
        }
        return await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType
        });
    } catch (error) {
        console.error("Cloudinary delete error:", error);
        throw error;
    }
};

module.exports = { uploadOnCloudinary, deleteFromCloudinary };