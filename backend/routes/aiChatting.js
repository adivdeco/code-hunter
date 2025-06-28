const express = require("express");
const aiRouter = express.Router();
const userMiddleware = require("../middleware/userMiddleware")
const solveDout = require("../controllers/solveDoubt.js")


aiRouter.post('/chat' , userMiddleware,solveDout);


module.exports = aiRouter;