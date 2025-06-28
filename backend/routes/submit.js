
const express = require('express');
const userMiddleware = require("../middleware/userMiddleware");
const { userSubmit ,userRun } = require('../controllers/userSubmit');

const submitRouter = express.Router();


submitRouter.post('/submit/:id' , userMiddleware,userSubmit)
submitRouter.post('/run/:id' , userMiddleware,userRun) 



module.exports = submitRouter;