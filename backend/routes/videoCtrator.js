// const express = require('express');
// const {
//     uploadVideo,
//     deleteVideo,
//     toggleLike,
//     toggleDislike,
//     getAllVideosForProblem
// } = require("../controllers/videoSection.js");

// const adminMiddleware = require('../middleware/adminMiddleware');
// const authMiddleware = require('../middleware/userMiddleware.js');
// const { uploadVideoFiles, cleanupTempFiles } = require('../middleware/multer.middleware.js');
// const { likeDislikeLimiter } = require('../middleware/rateLimiter.js');
// const { likeDislikeValidator } = require('../middleware/validators/videoValidators');

// const videoRouter = express.Router();

// // Route to get all videos for a specific problem (for ANY user)
// videoRouter.get("/problem/:problemId", getAllVideosForProblem);

// // Route to upload a video (Admin only)
// videoRouter.post(
//     "/upload/:problemId",
//     adminMiddleware,
//     uploadVideoFiles, // Using the configured multer middleware
//     uploadVideo,
//     (req, res, next) => {
//         // Ensure temp files are cleaned up after request
//         cleanupTempFiles(req.files);
//         next();
//     }
// );

// // Route to delete a specific video by ITS OWN ID (Admin only)
// videoRouter.delete("/:videoId", adminMiddleware, deleteVideo);

// // --- User Interaction Routes (Logged-in users only) ---

// // Route to like/unlike a video
// videoRouter.post("/:videoId/like", authMiddleware, likeDislikeLimiter, likeDislikeValidator, toggleLike);

// // Route to dislike/undislike a video
// videoRouter.post("/:videoId/dislike", authMiddleware, likeDislikeLimiter, likeDislikeValidator, toggleDislike);

// module.exports = videoRouter;


const express = require('express');
const {
    getAllVideosForProblem,
    uploadSolution,
    trackView,
    getVideoDetails,
    deleteSolution,
    reportSolution,
    getSimilarSolutions,
    translateSolution
} = require("../controllers/videoSection.js");

const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/userMiddleware.js');
const { uploadSolutionFiles, cleanupTempFiles } = require('../middleware/multer.middleware.js');
const { solutionRateLimiter } = require('../middleware/rateLimiter.js');
const {
    uploadSolutionValidator,
    reportSolutionValidator,
    translationValidator
} = require('../middleware/validators/videoValidators');

const videoRouter = express.Router();

// Public routes
videoRouter.get("/problem/:problemId", getAllVideosForProblem);
videoRouter.get("/:videoId", getVideoDetails);
videoRouter.get("/:solutionId/similar", getSimilarSolutions);

// Authenticated routes
videoRouter.post("/track/:videoId", authMiddleware, trackView);
videoRouter.post("/translate/:solutionId", authMiddleware, translationValidator, translateSolution);

// Upload route (authenticated users)
videoRouter.post(
    "/upload/:problemId",
    authMiddleware,
    solutionRateLimiter,
    uploadSolutionFiles,
    uploadSolutionValidator,
    uploadSolution,
    cleanupTempFiles
);

// Report route (authenticated users)
videoRouter.post(
    "/report/:solutionId",
    authMiddleware,
    reportSolutionValidator,
    reportSolution
);

// Admin routes
videoRouter.delete(
    "/:solutionId",
    authMiddleware,
    adminMiddleware,
    deleteSolution
);

module.exports = videoRouter;