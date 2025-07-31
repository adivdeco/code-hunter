const express = require('express');
const {
    uploadVideo,
    deleteVideo,
    toggleLike,
    toggleDislike,
    getAllVideosForProblem
} = require("../controllers/videoSection.js");

const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/userMiddleware.js');
const { uploadVideoFiles, cleanupTempFiles } = require('../middleware/multer.middleware.js');

const videoRouter = express.Router();

// Route to get all videos for a specific problem (for ANY user)
videoRouter.get("/problem/:problemId", getAllVideosForProblem);

// Route to upload a video (Admin only)
videoRouter.post(
    "/upload/:problemId",
    adminMiddleware,
    uploadVideoFiles, // Using the configured multer middleware
    uploadVideo,
    (req, res, next) => {
        // Ensure temp files are cleaned up after request
        cleanupTempFiles(req.files);
        next();
    }
);

// Route to delete a specific video by ITS OWN ID (Admin only)
videoRouter.delete("/:videoId", adminMiddleware, deleteVideo);

// --- User Interaction Routes (Logged-in users only) ---

// Route to like/unlike a video
videoRouter.post("/:videoId/like", authMiddleware, toggleLike);

// Route to dislike/undislike a video
videoRouter.post("/:videoId/dislike", authMiddleware, toggleDislike);

module.exports = videoRouter;