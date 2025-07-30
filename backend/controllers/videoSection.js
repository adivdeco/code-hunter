// const cloudinary = require('cloudinary').v2;
// const Problem = require("../models/problemSchema")
// const User = require("../models/userSchema");
// const SolutionVideo = require("../models/videoSolnSchema");
// const { sanitizeFilter } = require('mongoose');


// cloudinary.config({
//     cloud_name: "djupaqjuz",
//     api_key: "78786937855545",
//     api_secret: "iB0j9C_coZTE23rtqwvaTzSXMSc"
// });

// const generateUploadSignature = async (req, res) => {
//     try {
//         const { problemId } = req.params;

//         const userId = req.result._id;
//         // Verify problem exists
//         const problem = await Problem.findById(problemId);
//         if (!problem) {
//             return res.status(404).json({ error: 'Problem not found' });
//         }

//         // Generate unique public_id for the video
//         const timestamp = Math.round(new Date().getTime() / 1000);
//         const publicId = `leetcode-solutions/${problemId}/${userId}_${timestamp}`;

//         // Upload parameters
//         const uploadParams = {
//             timestamp: timestamp,
//             public_id: publicId,
//         };

//         // Generate signature
//         const signature = cloudinary.utils.api_sign_request(
//             uploadParams,
//             process.env.CLOUDINARY_API_SECRET
//         );

//         res.json({
//             signature,
//             timestamp,
//             public_id: publicId,
//             api_key: process.env.CLOUDINARY_API_KEY,
//             cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//             upload_url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`,
//         });

//     } catch (error) {
//         console.error('Error generating upload signature:', error);
//         res.status(500).json({ error: 'Failed to generate upload credentials' });
//     }
// };


// const saveVideoMetadata = async (req, res) => {
//     try {
//         const {
//             problemId,
//             cloudinaryPublicId,
//             secureUrl,
//             duration,
//         } = req.body;

//         const userId = req.result._id;

//         // Verify the upload with Cloudinary
//         const cloudinaryResource = await cloudinary.api.resource(
//             cloudinaryPublicId,
//             { resource_type: 'video' }
//         );

//         if (!cloudinaryResource) {
//             return res.status(400).json({ error: 'Video not found on Cloudinary' });
//         }

//         // Check if video already exists for this problem and user
//         const existingVideo = await SolutionVideo.findOne({
//             problemId,
//             userId,
//             cloudinaryPublicId
//         });

//         if (existingVideo) {
//             return res.status(409).json({ error: 'Video already exists' });
//         }

//         // const thumbnailUrl = cloudinary.url(cloudinaryResource.public_id, {
//         // resource_type: 'image',  
//         // transformation: [
//         // { width: 400, height: 225, crop: 'fill' },
//         // { quality: 'auto' },
//         // { start_offset: 'auto' }  
//         // ],
//         // format: 'jpg'
//         // });

//         const thumbnailUrl = cloudinary.image(cloudinaryResource.public_id, { resource_type: "video" })

//         // https://cloudinary.com/documentation/video_effects_and_enhancements#video_thumbnails
//         // Create video solution record
//         const videoSolution = await SolutionVideo.create({
//             problemId,
//             userId,
//             cloudinaryPublicId,
//             secureUrl,
//             duration: cloudinaryResource.duration || duration,
//             thumbnailUrl
//         });


//         res.status(201).json({
//             message: 'Video solution saved successfully',
//             videoSolution: {
//                 id: videoSolution._id,
//                 thumbnailUrl: videoSolution.thumbnailUrl,
//                 duration: videoSolution.duration,
//                 uploadedAt: videoSolution.createdAt
//             }
//         });

//     } catch (error) {
//         console.error('Error saving video metadata:', error);
//         res.status(500).json({ error: 'Failed to save video metadata' });
//     }
// };


// const deleteVideo = async (req, res) => {
//     try {
//         const { problemId } = req.params;
//         const userId = req.result._id;

//         const video = await SolutionVideo.findOneAndDelete({ problemId: problemId });



//         if (!video) {
//             return res.status(404).json({ error: 'Video not found' });
//         }

//         await cloudinary.uploader.destroy(video.cloudinaryPublicId, { resource_type: 'video', invalidate: true });

//         res.json({ message: 'Video deleted successfully' });

//     } catch (error) {
//         console.error('Error deleting video:', error);
//         res.status(500).json({ error: 'Failed to delete video' });
//     }
// };

// module.exports = { generateUploadSignature, saveVideoMetadata, deleteVideo };

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
    // This requires `multer` middleware on the frontend to handle form-data
    // I am assuming the file paths are available on req.files
    const { problemId } = req.params;
    const { title, description } = req.body;
    const uploaderId = req.result._id; // from adminMiddleware

    if (!title) {
        return res.status(400).json({ error: "Video title is required." });
    }

    // 1. Check if problem exists
    const problem = await Problem.findById(problemId);
    if (!problem) {
        return res.status(404).json({ error: 'Problem not found' });
    }

    // 2. Check for files (Video is required, thumbnail is optional)
    const videoLocalPath = req.files?.video?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    if (!videoLocalPath) {
        return res.status(400).json({ error: "Video file is required" });
    }

    try {
        // 3. Upload to Cloudinary
        const videoUploadResponse = await uploadOnCloudinary(videoLocalPath);
        let thumbnailUploadResponse = null;
        if (thumbnailLocalPath) {
            thumbnailUploadResponse = await uploadOnCloudinary(thumbnailLocalPath);
        }

        if (!videoUploadResponse) {
            return res.status(500).json({ error: "Failed to upload video to cloud service" });
        }

        // 4. Create new Video Solution in DB
        const newVideo = await SolutionVideo.create({
            problem: problemId,
            uploader: uploaderId,
            title,
            description,
            cloudinaryPublicId: videoUploadResponse.public_id,
            secureUrl: videoUploadResponse.secure_url,
            duration: videoUploadResponse.duration.toFixed(2), // Cloudinary provides duration
            thumbnailUrl: thumbnailUploadResponse?.secure_url || videoUploadResponse.secure_url.replace('.mp4', '.jpg') // Auto thumbnail
        });

        // 5. Link this new video to the problem
        problem.videoSolutions.push(newVideo._id);
        await problem.save();

        res.status(201).json({ message: "Video uploaded successfully", video: newVideo });

    } catch (error) {
        console.error('Error uploading video:', error);
        res.status(500).json({ error: 'Server error during video upload' });
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
    const { videoId } = req.params;
    const userId = req.result._id; // From authMiddleware

    try {
        const video = await SolutionVideo.findById(videoId);
        if (!video) return res.status(404).json({ error: "Video not found" });

        // Remove from dislikes if it exists there
        video.dislikes.pull(userId);

        const isLiked = video.likes.includes(userId);
        if (isLiked) {
            video.likes.pull(userId); // Unlike
        } else {
            video.likes.push(userId); // Like
        }

        await video.save();
        res.status(200).json({ message: "Success", likes: video.likes.length, dislikes: video.dislikes.length });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

const toggleDislike = async (req, res) => {
    const { videoId } = req.params;
    const userId = req.result._id;

    try {
        const video = await SolutionVideo.findById(videoId);
        if (!video) return res.status(404).json({ error: "Video not found" });

        // Remove from likes if it exists there
        video.likes.pull(userId);

        const isDisliked = video.dislikes.includes(userId);
        if (isDisliked) {
            video.dislikes.pull(userId); // Undislike
        } else {
            video.dislikes.push(userId); // Dislike
        }

        await video.save();
        res.status(200).json({ message: "Success", likes: video.likes.length, dislikes: video.dislikes.length });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};


module.exports = { getAllVideosForProblem, uploadVideo, deleteVideo, toggleLike, toggleDislike };