const express = require("express");
const aiRouter = express.Router();
const userMiddleware = require("../middleware/userMiddleware")
const solveDobut = require("../controllers/solveDoubt.js")


aiRouter.post('/chat', userMiddleware, solveDobut);


module.exports = aiRouter;