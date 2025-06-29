

const express = require('express');
const userMiddleware = require('../middleware/userMiddleware');
const { creatNote,getNote } = require("../controllers/useNote")
const noteRouter = express.Router()


noteRouter.post('/createnote/:id' , userMiddleware,creatNote)
noteRouter.get('/getnote/:id' , userMiddleware,getNote)



module.exports = noteRouter