// const express = require('express');
// const adminMiddleware = require('../middleware/adminMiddleware');
// const videoRouter = express.Router();
// const { generateUploadSignature, saveVideoMetadata, deleteVideo } = require("../controllers/videoSection")

// videoRouter.get("/create/:problemId", adminMiddleware, generateUploadSignature);
// videoRouter.post("/save", adminMiddleware, saveVideoMetadata);
// videoRouter.delete("/delete/:problemId", adminMiddleware, deleteVideo);


// module.exports = videoRouter;

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

const videoRouter = express.Router();

// Route to get all videos for a specific problem (for ANY user)
videoRouter.get("/problem/:problemId", getAllVideosForProblem);

// Route to upload a video (Admin only)
// Note: This is now a single endpoint that handles everything
videoRouter.post("/upload/:problemId", adminMiddleware, uploadVideo);

// Route to delete a specific video by ITS OWN ID (Admin only)
videoRouter.delete("/:videoId", adminMiddleware, deleteVideo);

// --- User Interaction Routes (Logged-in users only) ---

// Route to like/unlike a video
videoRouter.post("/:videoId/like", authMiddleware, toggleLike);

// Route to dislike/undislike a video
videoRouter.post("/:videoId/dislike", authMiddleware, toggleDislike);

module.exports = videoRouter;