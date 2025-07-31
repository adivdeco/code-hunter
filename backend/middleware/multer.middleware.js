const multer = require("multer");

// Configure how files are stored. We're using diskStorage to save them to a folder.
const storage = multer.diskStorage({
    // Define the destination folder for temporary files
    destination: function (req, file, cb) {
        cb(null, "./public/temp"); // Save files to the public/temp directory
    },
    // Define how files should be named to avoid conflicts
    filename: function (req, file, cb) {
        // For a unique filename, we can use the original name plus the current timestamp.
        // This is generally safe enough for this use case.
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname.match(/\..*$/)[0]);
    }
});

// Create the Multer upload instance with the configured storage.
// This instance can now be used as middleware in our routes.
// In your multer middleware
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB
        files: 2 // Max 2 files (video + thumbnail)
    },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'video' && !file.mimetype.startsWith('video/')) {
            return cb(new Error('Only video files are allowed'), false);
        }
        if (file.fieldname === 'thumbnail' && !file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed for thumbnails'), false);
        }
        cb(null, true);
    }
});

// Export the middleware so we can use it in other files
module.exports = { upload };