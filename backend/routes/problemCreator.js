const express = require('express');
const adminMiddleware = require('../middleware/adminMiddleware');
const { createProblem, updateProblem, deleteProblem, getProblemById, getAllProblem, solvedProblem, allUserSubmissions, allsubmission, allSolve } = require('../controllers/userProblem');
const userMiddleware = require('../middleware/userMiddleware');


const problemRouter = express.Router();

//admin
problemRouter.post('/create', adminMiddleware, createProblem);
problemRouter.put('/update/:id', adminMiddleware, updateProblem);
problemRouter.delete('/delete/:id', adminMiddleware, deleteProblem);


// //user
problemRouter.get("/find/:id", userMiddleware, getProblemById);
problemRouter.get("/allProblems", userMiddleware, getAllProblem);
problemRouter.get("/allsolve", userMiddleware, solvedProblem);
problemRouter.get("/allsoln", adminMiddleware, allSolve)
problemRouter.get("/allsubmission/:id", userMiddleware, allsubmission);
problemRouter.get("/submissions", userMiddleware, allUserSubmissions);

module.exports = problemRouter;