

const Problem = require("../models/problemSchema");
const SolutionVideo = require("../models/videoSolnSchema");
const { uploadOnCloudinary, deleteFromCloudinary } = require("../utils/cloudinary");



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