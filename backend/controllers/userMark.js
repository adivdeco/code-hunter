const BookMark = require('../models/bookmarkSchema');

// ✅ CREATE Bookmark
const createMark = async (req, res) => {
    try {
        const userId = req.finduser._id;
        const problemId = req.params.id;

        const exists = await BookMark.findOne({ userId, problemId });
        if (exists) return res.status(200).json({ message: "Already bookmarked" });

        const bookmark = await BookMark.create({ userId, problemId });
        res.status(201).json({ message: "Bookmarked!", bookmark });

    } catch (err) {
        console.error("Bookmark add error:", err);
        res.status(500).json({ message: "Error adding bookmark", err });
    }
};



const delMark = async (req, res) => {
    try {
        const userId = req.finduser._id;
        const problemId = req.params.id;

        await BookMark.deleteOne({ userId, problemId });
        res.json({ message: "Removed from bookmarks" });

    } catch (error) {
        // console.log(error);

        console.error("Bookmark removal error:", error);
        res.status(500).json({ message: "Error removing bookmark", error });
    }
};

// ✅ GET Bookmarks
const getMark = async (req, res) => {
    try {
        const userId = req.finduser._id;
        const bookmarks = await BookMark.find({ userId }).populate('problemId');

        res.status(200).json({ bookmarks });

    } catch (error) {
        console.error("Bookmark fetch error:", error);
        res.status(500).json({ message: "Error fetching bookmarks", error });
    }
};

module.exports = { createMark, getMark, delMark };
