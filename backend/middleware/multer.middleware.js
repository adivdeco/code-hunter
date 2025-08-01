const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configure temp directory
const tempDir = path.join(__dirname, '../public/temp');

// Create temp directory if it doesn't exist
const ensureTempDir = () => {
    try {
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
            console.log(`Created temp directory at: ${tempDir}`);
        }
    } catch (err) {
        console.error('Error creating temp directory:', err);
        throw new Error('Failed to initialize upload directory');
    }
};

// File filter for security
const fileFilter = (req, file, cb) => {
    try {
        // Allowed file types
        const allowedTypes = {
            video: ['video/mp4', 'video/webm', 'video/quicktime'],
            image: ['image/jpeg', 'image/png', 'image/webp']
        };

        const fileType = file.fieldname === 'video' ? 'video' : 'image';
        const isValid = allowedTypes[fileType].includes(file.mimetype);

        if (isValid) {
            cb(null, true);
        } else {
            cb(new Error(`Invalid file type for ${file.fieldname}. Only ${allowedTypes[fileType].join(', ')} are allowed.`), false);
        }
    } catch (err) {
        cb(err, false);
    }
};

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        ensureTempDir();
        cb(null, tempDir);
    },
    filename: (req, file, cb) => {
        try {
            const ext = path.extname(file.originalname).toLowerCase();
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
            const sanitizedName = file.originalname
                .replace(ext, '')
                .replace(/[^a-zA-Z0-9-_]/g, '')
                .substring(0, 50);

            cb(null, `${file.fieldname}-${sanitizedName}-${uniqueSuffix}${ext}`);
        } catch (err) {
            cb(err);
        }
    }
});

// Configure multer instance
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB limit
        files: 2, // Max 2 files (video + thumbnail)
        fields: 10 // Max 10 non-file fields
    },
    onError: (err, next) => {
        console.error('Multer error:', err);
        next(err);
    }
});

// Middleware for handling multiple files
const uploadVideoFiles = upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
]);

// Cleanup function to remove temp files
const cleanupTempFiles = (files) => {
    if (!files) return;

    Object.values(files).forEach(fileArray => {
        fileArray.forEach(file => {
            try {
                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                }
            } catch (err) {
                console.error('Error cleaning up temp file:', file.path, err);
            }
        });
    });
};

module.exports = {
    uploadVideoFiles,
    cleanupTempFiles,
    tempDir
};