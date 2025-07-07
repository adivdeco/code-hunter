

const express = require('express');
const userMiddleware = require('../middleware/userMiddleware');
const { creatNote, getNote, allNote } = require("../controllers/useNote")
const noteRouter = express.Router()


noteRouter.post('/createnote/:id', userMiddleware, creatNote)
noteRouter.get('/getnote/:id', userMiddleware, getNote)
noteRouter.get('/allnotes', userMiddleware, allNote)


module.exports = noteRouter