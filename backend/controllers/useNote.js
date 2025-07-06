const Note = require('../models/noteSchema')


const creatNote = async (req, res) => {

    try {
        const userId = req.finduser._id;
        const problemId = req.params.id;

        if (!problemId || !userId) {
            console.log("user id or problem id missing");

        }

        const { content } = req.body;

        if (content.length > 500) {
            return res.status(400).json({ message: "Note exceeds character limit (500)." });
        }


        let note = await Note.findOneAndUpdate(
            { userId, problemId },
            { content, updatedAt: Date.now() },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.status(201).send({ message: "note created sucessfully", note })

    }

    catch (err) {
        console.error("Note creation error:", err);
        res.status(500).json({
            message: "error in create note", err
        })
    }

}

const getNote = async (req, res) => {

    try {
        const userId = req.finduser._id;
        const problemId = req.params.id;

        const allnote = await Note.find({ userId, problemId })

        if (!allnote) {
            return res.status(200).send({ message: "No note found", note: null });
        }
        res.status(200).send({ message: 'hears all note', allnote });

    }
    catch (err) {
        console.error("Error fetching note:", err);
        res.json({
            message: 'error in fetch notedata'
        })
    }

}






module.exports = { creatNote, getNote };