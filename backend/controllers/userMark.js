const BookMark = require('../models/ bookmarkSchema')


const createMark = async (req, res) => {

    try {
        const userId = req.finduser._id;
        const problemId = req.params.Id;

        const exists = await BookMark.findOne({ userId, problemId });
        if (exists) return res.status(200).json({ message: "Already bookmarked" });

        const bookmark = await BookMark.create({ userId, problemId });
        res.status(201).json({ message: "Bookmarked!", bookmark });

    }
    catch (err) {
        console.error("Bookmark add error:", err);
        res.status(500).json({
            message: "error in Bookmark addition", err
        })
    }
}

const delMark = async (req, res) => {
    try {
        await BookMark.deleteOne({ userId, problemId });
        res.json({ message: "Removed from bookmarks" });

    } catch (error) {
        res.send('error in bookmark removed: ', error)
    }
}

const getMark = async (req, res) => {
    try {
        const userId = req.finduser._id;
        const bookmarks = await BookMark.find({ userId }).populate('problemId');
        res.json({ bookmarks });

    } catch (error) {
        res.send('error in fetch bookmark: ', error)

    }
}





module.exports = { createMark, getMark, delMark }