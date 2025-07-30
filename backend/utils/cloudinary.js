// utils/cloudinary.js
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        // File has been uploaded successfully
        fs.unlinkSync(localFilePath); // Remove the locally saved temporary file
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // remove temp file if upload fails
        return null;
    }
};

const deleteFromCloudinary = async (publicId, resourceType = "image") => {
    try {
        if (!publicId) return null;
        await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = { uploadOnCloudinary, deleteFromCloudinary };