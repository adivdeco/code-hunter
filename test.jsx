const uploadVideo = async (req, res) => {
    try {
        // Check files
        if (!req.files || !req.files.video || !req.files.thumbnail) {
            return res.status(400).json({ error: 'Both video and thumbnail are required.' });
        }
        const videoFile = req.files.video[0].path;
        const thumbnailFile = req.files.thumbnail[0].path;

        // Upload to Cloudinary
        const videoResult = await uploadOnCloudinary(videoFile);
        const thumbnailResult = await uploadOnCloudinary(thumbnailFile);

        if (!videoResult || !thumbnailResult) {
            return res.status(500).json({ error: 'Cloudinary upload failed.' });
        }

        // Save to DB as needed...

        res.status(201).json({ videoUrl: videoResult.secure_url, thumbnailUrl: thumbnailResult.secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Server error' });
    }
};