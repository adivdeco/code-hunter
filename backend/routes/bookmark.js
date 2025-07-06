

const express = require('express');
const userMiddleware = require('../middleware/userMiddleware');
const { createMark, getMark, delMark } = require("../controllers/userMark")
const bookmarkRouter = express.Router()


bookmarkRouter.post('/createmark/:id', userMiddleware, createMark);
bookmarkRouter.get('/getmark/:id', userMiddleware, getMark)
bookmarkRouter.delete('delmark/:id', userMiddleware, delMark)



module.exports = bookmarkRouter