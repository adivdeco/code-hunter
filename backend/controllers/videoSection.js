

const Problem = require("../models/problemSchema");
const SolutionVideo = require("../models/videoSolnSchema");
const { uploadOnCloudinary, deleteFromCloudinary } = require("../utils/cloudinary"); // A new helper util

// Note: For this to work, you need `multer` for file handling
// npm install multer
// We'll handle this in the route or use a file upload utility

const getAllVideosForProblem = async (req, res) => {
    try {
        const { problemId } = req.params;
        const videos = await SolutionVideo.find({ problem: problemId })
            .populate("uploader", "name avatar") // Get uploader's name and avatar
            .sort({ createdAt: -1 });

        if (!videos || videos.length === 0) {
            return res.status(200).json({ message: "No video solutions found for this problem.", data: [] });
        }

        res.status(200).json({ message: "Videos fetched successfully", data: videos });
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).json({ error: 'Server error while fetching videos' });
    }
};

const uploadVideo = async (req, res) => {
    try {
        console.log("Upload request received:", req.files);

        const { problemId } = req.params;
        const { title, description } = req.body;
        const uploaderId = req.finduser._id;

        if (!title) {
            return res.status(400).json({ error: "Video title is required." });
        }

        const videoLocalPath = req.files?.video?.[0]?.path;
        if (!videoLocalPath) {
            return res.status(400).json({ error: "Video file is required" });
        }

        // Upload video with additional options
        const videoUploadResponse = await uploadOnCloudinary(videoLocalPath, {
            folder: "problem_videos",
            resource_type: "video"
        });

        if (!videoUploadResponse) {
            return res.status(500).json({ error: "Failed to upload video" });
        }

        // Handle thumbnail if exists
        let thumbnailUrl = videoUploadResponse.secure_url.replace('.mp4', '.jpg');
        const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;
        if (thumbnailLocalPath) {
            const thumbnailResponse = await uploadOnCloudinary(thumbnailLocalPath, {
                folder: "video_thumbnails"
            });
            thumbnailUrl = thumbnailResponse?.secure_url || thumbnailUrl;
        }

        // Create video document
        const newVideo = await SolutionVideo.create({
            problem: problemId,
            uploader: uploaderId,
            title,
            description,
            cloudinaryPublicId: videoUploadResponse.public_id,
            secureUrl: videoUploadResponse.secure_url,
            duration: videoUploadResponse.duration,
            thumbnailUrl
        });

        // Update problem
        await Problem.findByIdAndUpdate(problemId, {
            $push: { videoSolutions: newVideo._id }
        });

        return res.status(201).json({
            message: "Video uploaded successfully",
            video: newVideo
        });

    } catch (error) {
        console.error("Full upload error:", error);
        console.error("Error stack:", error.stack);
        res.status(500).json({
            error: error.message || 'Server error during video upload',
            details: error.stack
        });
    }
};

const deleteVideo = async (req, res) => {
    try {
        const { videoId } = req.params;
        const video = await SolutionVideo.findById(videoId);

        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        // 1. Delete from Cloudinary
        await deleteFromCloudinary(video.cloudinaryPublicId, 'video');

        // 2. Remove from Problem's videoSolutions array
        await Problem.findByIdAndUpdate(video.problem, {
            $pull: { videoSolutions: videoId }
        });

        // 3. Delete the video document itself
        await video.deleteOne();

        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        console.error('Error deleting video:', error);
        res.status(500).json({ error: 'Failed to delete video' });
    }
};

// --- LIKE/DISLIKE LOGIC ---
const toggleLike = async (req, res) => {
    try {
        const { videoId } = req.params;
        const userId = req.finduser._id; // From authMiddleware

        const video = await SolutionVideo.findById(videoId);
        if (!video) {
            return res.status(404).json({ error: "Video not found" });
        }

        // Check if user already liked
        const likeIndex = video.likes.indexOf(userId);
        const dislikeIndex = video.dislikes.indexOf(userId);

        // Remove from dislikes if exists
        if (dislikeIndex > -1) {
            video.dislikes.splice(dislikeIndex, 1);
        }

        // Toggle like
        if (likeIndex > -1) {
            video.likes.splice(likeIndex, 1); // Unlike
        } else {
            video.likes.push(userId); // Like
        }

        await video.save();

        res.status(200).json({
            success: true,
            likes: video.likes.length,
            dislikes: video.dislikes.length
        });

        await AnalyticsEvent.create({
            userId,
            eventType: likeIndex > -1 ? 'video_unlike' : 'video_like',
            videoId,
            metadata: {
                previousLikes: likeIndex > -1 ? video.likes.length + 1 : video.likes.length - 1,
                currentLikes: video.likes.length,
                hadDislike: dislikeIndex > -1
            }
        });

    } catch (error) {
        console.error('Error toggling like:', error);
        res.status(500).json({
            success: false,
            error: 'Server error while toggling like'
        });
    }
};

const toggleDislike = async (req, res) => {
    try {
        const { videoId } = req.params;
        const userId = req.finduser._id; // From authMiddleware

        const video = await SolutionVideo.findById(videoId);
        if (!video) {
            return res.status(404).json({ error: "Video not found" });
        }

        // Check if user already disliked
        const dislikeIndex = video.dislikes.indexOf(userId);
        const likeIndex = video.likes.indexOf(userId);

        // Remove from likes if exists
        if (likeIndex > -1) {
            video.likes.splice(likeIndex, 1);
        }

        // Toggle dislike
        if (dislikeIndex > -1) {
            video.dislikes.splice(dislikeIndex, 1); // Undislike
        } else {
            video.dislikes.push(userId); // Dislike
        }

        await video.save();

        res.status(200).json({
            success: true,
            likes: video.likes.length,
            dislikes: video.dislikes.length
        });

    } catch (error) {
        console.error('Error toggling dislike:', error);
        res.status(500).json({
            success: false,
            error: 'Server error while toggling dislike'
        });
    }
};


module.exports = { getAllVideosForProblem, uploadVideo, deleteVideo, toggleLike, toggleDislike };


// const Problem = require("../models/problemSchema");
// const SolutionVideo = require("../models/videoSolnSchema");
// const User = require("../models/userSchema");
// const { uploadOnCloudinary, deleteFromCloudinary } = require("../utils/cloudinary");
// const { generateCaptions } = require('../services/captionService');
// const { translateText } = require('../services/translationService');
// const AnalyticsEvent = require('../models/analyticsSchema');

// // Get all videos for a problem with pagination and filtering
// const getAllVideosForProblem = async (req, res) => {
//     try {
//         const { problemId } = req.params;
//         const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc',
//             solutionType, language, search } = req.query;

//         // Build query
//         const query = { problem: problemId };

//         if (solutionType) {
//             query.solutionType = solutionType;
//         }

//         if (language) {
//             query.language = language;
//         }

//         if (search) {
//             query.$text = { $search: search };
//         }

//         // Build sort
//         const sort = {};
//         sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

//         const options = {
//             page: parseInt(page),
//             limit: parseInt(limit),
//             sort,
//             populate: [
//                 { path: 'uploader', select: 'name avatar' },
//                 { path: 'problem', select: 'title difficulty' }
//             ]
//         };

//         const result = await SolutionVideo.paginate(query, options);

//         res.status(200).json({
//             success: true,
//             data: result.docs,
//             pagination: {
//                 total: result.totalDocs,
//                 pages: result.totalPages,
//                 page: result.page,
//                 limit: result.limit
//             }
//         });
//     } catch (error) {
//         console.error('Error fetching videos:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Server error while fetching videos',
//             details: error.message
//         });
//     }
// };

// // Upload solution (video, image, or text)
// const uploadSolution = async (req, res) => {
//     try {
//         const { problemId } = req.params;
//         const { title, description, solutionType, content, language, tags } = req.body;
//         const uploaderId = req.finduser._id;

//         // Validate input
//         if (!title) {
//             return res.status(400).json({ error: "Title is required." });
//         }

//         // Check if problem exists
//         const problem = await Problem.findById(problemId);
//         if (!problem) {
//             return res.status(404).json({ error: "Problem not found" });
//         }

//         let solutionData = {
//             problem: problemId,
//             uploader: uploaderId,
//             title,
//             description,
//             solutionType,
//             language: language || 'en',
//             tags: tags ? tags.split(',').map(tag => tag.trim()) : []
//         };

//         // Handle different solution types
//         switch (solutionType) {
//             case 'video':
//                 const videoLocalPath = req.files?.video?.[0]?.path;
//                 if (!videoLocalPath) {
//                     return res.status(400).json({ error: "Video file is required" });
//                 }

//                 const videoUploadResponse = await uploadOnCloudinary(videoLocalPath, {
//                     folder: "problem_solutions/videos",
//                     resource_type: "video"
//                 });

//                 if (!videoUploadResponse) {
//                     return res.status(500).json({ error: "Failed to upload video" });
//                 }

//                 // Generate thumbnail if not provided
//                 let thumbnailUrl = videoUploadResponse.secure_url.replace('.mp4', '.jpg');
//                 const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;
//                 if (thumbnailLocalPath) {
//                     const thumbnailResponse = await uploadOnCloudinary(thumbnailLocalPath, {
//                         folder: "solution_thumbnails"
//                     });
//                     thumbnailUrl = thumbnailResponse?.secure_url || thumbnailUrl;
//                 }

//                 // Generate captions (async)
//                 generateCaptions(videoUploadResponse.secure_url)
//                     .then(captionsUrl => {
//                         SolutionVideo.findByIdAndUpdate(solutionData._id, {
//                             captionsUrl
//                         }).exec();
//                     })
//                     .catch(err => console.error('Caption generation failed:', err));

//                 solutionData = {
//                     ...solutionData,
//                     cloudinaryPublicId: videoUploadResponse.public_id,
//                     secureUrl: videoUploadResponse.secure_url,
//                     duration: videoUploadResponse.duration,
//                     thumbnailUrl
//                 };
//                 break;

//             case 'image':
//                 const imageLocalPath = req.files?.image?.[0]?.path;
//                 if (!imageLocalPath) {
//                     return res.status(400).json({ error: "Image file is required" });
//                 }

//                 const imageUploadResponse = await uploadOnCloudinary(imageLocalPath, {
//                     folder: "problem_solutions/images"
//                 });

//                 if (!imageUploadResponse) {
//                     return res.status(500).json({ error: "Failed to upload image" });
//                 }

//                 solutionData = {
//                     ...solutionData,
//                     cloudinaryPublicId: imageUploadResponse.public_id,
//                     secureUrl: imageUploadResponse.secure_url,
//                     thumbnailUrl: imageUploadResponse.secure_url
//                 };
//                 break;

//             case 'text':
//                 if (!content) {
//                     return res.status(400).json({ error: "Content is required for text solutions" });
//                 }
//                 solutionData.content = content;
//                 break;

//             default:
//                 return res.status(400).json({ error: "Invalid solution type" });
//         }

//         // Create solution document
//         const newSolution = await SolutionVideo.create(solutionData);

//         // Update problem's solutions array
//         await Problem.findByIdAndUpdate(problemId, {
//             $push: { videoSolutions: newSolution._id }
//         });

//         // Update user's contributions
//         await User.findByIdAndUpdate(uploaderId, {
//             $inc: { contributions: 1 }
//         });

//         // Log analytics event
//         await AnalyticsEvent.create({
//             userId: uploaderId,
//             eventType: 'solution_upload',
//             solutionId: newSolution._id,
//             metadata: {
//                 solutionType,
//                 problemId,
//                 title
//             }
//         });

//         return res.status(201).json({
//             success: true,
//             message: "Solution uploaded successfully",
//             data: newSolution
//         });

//     } catch (error) {
//         console.error("Upload error:", error);
//         res.status(500).json({
//             success: false,
//             error: error.message || 'Server error during solution upload',
//             details: process.env.NODE_ENV === 'development' ? error.stack : undefined
//         });
//     }
// };

// // Track video view and engagement
// const trackView = async (req, res) => {
//     try {
//         const { videoId } = req.params;
//         const userId = req.finduser?._id;
//         const { watchTime, isCompleted } = req.body;

//         const updateData = {
//             $inc: { views: 1 }
//         };

//         if (watchTime) {
//             updateData.$inc = {
//                 ...updateData.$inc,
//                 'engagement.watchTime': watchTime
//             };

//             if (isCompleted) {
//                 updateData.$inc = {
//                     ...updateData.$inc,
//                     'engagement.completionRate': 1
//                 };
//             }
//         }

//         const video = await SolutionVideo.findByIdAndUpdate(
//             videoId,
//             updateData,
//             { new: true }
//         );

//         if (!video) {
//             return res.status(404).json({ success: false, error: "Video not found" });
//         }

//         // Log analytics event if user is logged in
//         if (userId) {
//             await AnalyticsEvent.create({
//                 userId,
//                 eventType: 'video_view',
//                 videoId,
//                 metadata: {
//                     watchTime,
//                     isCompleted,
//                     videoTitle: video.title
//                 }
//             });
//         }

//         res.status(200).json({
//             success: true,
//             data: video
//         });
//     } catch (error) {
//         console.error('Error tracking view:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Server error while tracking view'
//         });
//     }
// };

// // Get video details
// const getVideoDetails = async (req, res) => {
//     try {
//         const { videoId } = req.params;

//         const video = await SolutionVideo.findById(videoId)
//             .populate('uploader', 'name avatar')
//             .populate('problem', 'title difficulty');

//         if (!video) {
//             return res.status(404).json({ success: false, error: "Video not found" });
//         }

//         res.status(200).json({
//             success: true,
//             data: video
//         });
//     } catch (error) {
//         console.error('Error fetching video details:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Server error while fetching video details'
//         });
//     }
// };

// // Delete solution
// const deleteSolution = async (req, res) => {
//     try {
//         const { solutionId } = req.params;
//         const userId = req.finduser._id;
//         const isAdmin = req.finduser.role === 'admin';

//         const solution = await SolutionVideo.findById(solutionId);
//         if (!solution) {
//             return res.status(404).json({ error: 'Solution not found' });
//         }

//         // Check permissions
//         if (!isAdmin && solution.uploader.toString() !== userId.toString()) {
//             return res.status(403).json({ error: 'Not authorized to delete this solution' });
//         }

//         // Delete from Cloudinary if it's a media file
//         if (solution.solutionType !== 'text') {
//             const resourceType = solution.solutionType === 'video' ? 'video' : 'image';
//             await deleteFromCloudinary(solution.cloudinaryPublicId, resourceType);
//         }

//         // Remove from Problem's solutions array
//         await Problem.findByIdAndUpdate(solution.problem, {
//             $pull: { videoSolutions: solutionId }
//         });

//         // Delete the solution document
//         await solution.deleteOne();

//         // Log analytics event
//         await AnalyticsEvent.create({
//             userId,
//             eventType: 'solution_delete',
//             solutionId,
//             metadata: {
//                 solutionType: solution.solutionType,
//                 problemId: solution.problem
//             }
//         });

//         res.status(200).json({
//             success: true,
//             message: 'Solution deleted successfully'
//         });
//     } catch (error) {
//         console.error('Error deleting solution:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to delete solution',
//             details: error.message
//         });
//     }
// };

// // Report a solution
// const reportSolution = async (req, res) => {
//     try {
//         const { solutionId } = req.params;
//         const userId = req.finduser._id;
//         const { reason, comment } = req.body;

//         const solution = await SolutionVideo.findById(solutionId);
//         if (!solution) {
//             return res.status(404).json({ error: 'Solution not found' });
//         }

//         // Check if user already reported
//         const existingReport = solution.reports.find(report =>
//             report.userId.toString() === userId.toString()
//         );

//         if (existingReport) {
//             return res.status(400).json({ error: 'You have already reported this solution' });
//         }

//         solution.reports.push({
//             userId,
//             reason,
//             comment
//         });

//         await solution.save();

//         // Notify admins (could be implemented with a notification system)
//         // notifyAdminsAboutReport(solution, userId);

//         res.status(200).json({
//             success: true,
//             message: 'Solution reported successfully'
//         });
//     } catch (error) {
//         console.error('Error reporting solution:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to report solution'
//         });
//     }
// };

// // Get similar solutions
// const getSimilarSolutions = async (req, res) => {
//     try {
//         const { solutionId } = req.params;

//         const solution = await SolutionVideo.findById(solutionId);
//         if (!solution) {
//             return res.status(404).json({ error: 'Solution not found' });
//         }

//         // Find similar solutions (same problem or similar tags)
//         const similarSolutions = await SolutionVideo.find({
//             $or: [
//                 { problem: solution.problem, _id: { $ne: solution._id } },
//                 { tags: { $in: solution.tags }, _id: { $ne: solution._id } }
//             ]
//         })
//             .limit(5)
//             .sort({ views: -1, likes: -1 })
//             .populate('uploader', 'name avatar');

//         res.status(200).json({
//             success: true,
//             data: similarSolutions
//         });
//     } catch (error) {
//         console.error('Error fetching similar solutions:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to fetch similar solutions'
//         });
//     }
// };

// // Translate solution
// const translateSolution = async (req, res) => {
//     try {
//         const { solutionId } = req.params;
//         const { targetLanguage } = req.body;

//         const solution = await SolutionVideo.findById(solutionId);
//         if (!solution) {
//             return res.status(404).json({ error: 'Solution not found' });
//         }

//         // Translate title, description, and content
//         const [translatedTitle, translatedDescription, translatedContent] = await Promise.all([
//             translateText(solution.title, targetLanguage),
//             translateText(solution.description, targetLanguage),
//             solution.content ? translateText(solution.content, targetLanguage) : Promise.resolve('')
//         ]);

//         res.status(200).json({
//             success: true,
//             data: {
//                 title: translatedTitle,
//                 description: translatedDescription,
//                 content: translatedContent,
//                 originalLanguage: solution.language,
//                 targetLanguage
//             }
//         });
//     } catch (error) {
//         console.error('Error translating solution:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to translate solution'
//         });
//     }
// };

// module.exports = {
//     getAllVideosForProblem,
//     uploadSolution,
//     trackView,
//     getVideoDetails,
//     deleteSolution,
//     reportSolution,
//     getSimilarSolutions,
//     translateSolution
// };