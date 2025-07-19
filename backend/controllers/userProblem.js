const Problem = require('../models/problemSchema');
const Solution = require('../models/solutionSchema');
const User = require('../models/userSchema');
const { getlanguageById, submitBatch, submitToken } = require('../utils/ProblemsValidtor');



const createProblem = async (req, res) => {
    console.log("Creating problem with data:", req.body);

    const { title, description, tags, visibleTestCases,
        hiddenTestCases, startCode, referenceSolution, problemCreator } = req.body;



    try {

        for (const { language, completeCode } of referenceSolution) {

            const languageId = getlanguageById(language);
            console.log("Language ID:", languageId);


            const submissions = visibleTestCases.map((testCase) => ({
                source_code: completeCode,  // question code
                language_id: languageId,
                stdin: testCase.input,
                expected_output: testCase.output
            }));
            // const submissions  creates an array of objects like this in last line

            const submitResult = await submitBatch(submissions);  // this give data of all submissions  as tocken arr=> as [ { tocken:ndjbdjkh289u90u3},{ tocken:ndjbdjkh289u90u3}]
            // console.log("1");

            const resultToken = submitResult.map((value) => value.token); // hear we make array of all tokens like [ndjbdjkh289u90u3, ndjbdjkh289u90u3]
            // console.log("2");
            const testResult = await submitToken(resultToken); // this will give all test cases result as array of objects like [{status:{id:3},time:0.1,memory:1024},{status:{id:3},time:0.1,memory:1024}]

        }

        //export to db
        const problem = await Problem.create({
            ...req.body,
            problemCreator: req.finduser._id,
        });
        res.status(201).send({ message: "Problem created successfully", problem });

    }
    catch (err) {
        console.error("Error creating problem:", err);
        res.status(500).send({ message: "Error creating problem", error: err.message });
    }


}

const updateProblem = async (req, res) => {

    const { id } = req.params;

    const { title, description, tags, visibleTestCases,
        hiddenTestCases, startCode, referenceSolution, problemCreator } = req.body;


    try {
        for (const { language, completeCode } of referenceSolution) {
            const languageId = getlanguageById(language);
            console.log("Language ID:", languageId);


            const submissions = visibleTestCases.map((testCase) => ({
                source_code: completeCode,
                language_id: languageId,
                stdin: testCase.input,
                expected_output: testCase.output
            }));

            const submitResult = await submitBatch(submissions);

            const resultToken = submitResult.map((value) => value.token);

            const testResult = await submitToken(resultToken);

        }
        const newProblem = await Problem.findByIdAndUpdate(id, { ...req.body }, { runValidators: true, new: true });
        if (!newProblem) {
            return res.status(404).send("Problem not found");
        }

        res.status(200).send("Problem updated successfully");
    }

    catch (err) {
        res.status(500).send("Error: " + err)
    }
}


const deleteProblem = async (req, res) => {

    const { id } = req.params;
    try {
        const delproblem = await Problem.findByIdAndDelete(id);
        if (!delproblem) {
            return res.status(404).send("Problem not found");
        }
        res.status(200).send("Problem deleted successfully");
    }

    catch (err) {
        res.status(500).send("Error: " + err)
    }
}


const problemFetch = async (req, res) => {

    try {

        const { id } = req.params
        const findproblem = await Problem.findById(id);
        if (!findproblem) {
            return res.status(404).send("Problem not found");
        }
        res.status(200).send({ message: "Problem find successfully", findproblem });
    }
    catch (err) {
        res.status(500).send("error: " + err)
    }
}



const getAllProblem = async (req, res) => {

    try {
        // const page = parseInt(req.query.page) || 1;
        // const limit = 9;
        // const skip = (page - 1) * limit;

        const allproblem = await Problem.find()
        // .skip(skip).limit(limit);                        //await Problem.find({skip:10,limit:10}); // 
        if (allproblem.length === 0) {                                     //await Problem.find({difficulty: "easy",tags:"array"}); 
            return res.status(404).send("No problems found");
        }
        res.status(200).json({ message: "All problems fetched successfully", allproblem });
    }
    catch (err) {
        res.status(500).send("Eroor: " + err)
    }
}



const solvedProblem = async (req, res) => {
    try {
        const userId = req.finduser._id;
        // Populate problemSolved.problemId with full problem details
        const user = await User.findById(userId).populate({
            path: 'problemSolved2.problemdata',
            select: '_id title description '
        });
        // Optionally, you can format the response to only send problemSolved array
        // res.status(200).json({ problemSolved: user.problemSolved });
        res.status(200).send(user);
    }
    catch (err) {
        res.status(500).send("Error: " + err)
    }
} // gives all unique problems solved by user not all submissions



const allsubmission = async (req, res) => {
    const userId = req.finduser._id;
    const problemId = req.params.id

    try {
        const allsubmissions = await Solution.find({ userId, problemId })

        if (allsubmissions.length === 0) {
            return res.status(404).send("No submissions found for this problem");
        }
        res.status(200).send(allsubmissions);


    }
    catch (err) {
        res.status(500).send("Error: " + err)
    }
}
// all submission for a single problem

const allSolve = async (req, res) => {
    try {
        const allsoln = await Solution.find().populate({
            path: 'problemId',
            select: '_id title description tags difficulty companies '
        })
        if (allsoln.length === 0) {
            return res.status(404).send("No User found");
        }
        res.status(200).json({ message: "All solve fetch successfully", allsoln });

    } catch (error) {
        res.status(500).send("Error: " + error)

    }
}
// all submission pass by all user


// all submission ofa single-user
const allUserSubmissions = async (req, res) => {
    try {
        const userId = req.finduser._id;

        const submissions = await Solution.find({ userId })
            .populate({
                path: 'problemId',
                select: '_id title' // Only get problem ID and title
            })
            .sort({ createdAt: -1 }); // Newest first

        res.status(200).json(submissions);
    } catch (err) {
        res.status(500).json({ message: "Error fetching submissions", error: err.message });
    }
}


module.exports = { createProblem, updateProblem, deleteProblem, problemFetch, getAllProblem, solvedProblem, allsubmission, allSolve, allUserSubmissions };





