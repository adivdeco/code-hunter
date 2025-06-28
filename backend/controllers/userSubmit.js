const Solution = require("../models/solutionSchema");
const Problem = require("../models/problemSchema"); 
const { getlanguageById,submitBatch,submitToken } = require('../utils/ProblemsValidtor');



const userSubmit = async (req, res) => {

    try{
        
          const userId = req.finduser._id
          const problemId = req.params.id;

          let { code, language } = req.body;

          if (!code || !language || !problemId || !userId) {
              return res.status(400).send("Code and language are required");
          }

        if(language==='cpp')
        language='c++'
      
        console.log(language);
    // fetch the problem to check if it exists
    
          const problems = await Problem.findById(problemId);
          if (!problems) {
              return res.status(404).send("Problem not found");
          }
          
          // add all the data of soln to db.. then to judge0 . 
         
          const submitedResult = await Solution.create({
            userId,
            problemId,
            code,
            language,
            status: "accepted", 
            testCasesTotal:problems.hiddenTestCases.length,

          })
 
          // send the data to judge0 api

         const languageId =  getlanguageById(language);

          const submissions =  problems.hiddenTestCases.map((testCase)=>({  
            source_code:code,  // question code
            language_id: languageId,
            stdin: testCase.input,
            expected_output: testCase.output
        }));

        const submitResult = await submitBatch(submissions);
        const resultToken = submitResult.map((value)=> value.token);
        const testResult = await submitToken(resultToken);
        
        console.log(testResult);
        
        //update the solutionResult status based on the test results which is part of solutionSchema
        
        let testCasesPassed = 0;
        let errorMessage = null;
        let status = "pending"; 
        let runtime = 0;
        let memory = 0;
        let stdout = null

        for (const result of testResult) {
            if (result.status_id==3) { 
                testCasesPassed++;
                runtime = runtime+parseFloat(result.time);
                memory = Math.max(memory,result.memory)
                status= "accepted";
                stdout=result.stdout 

            } else if (result.status.id === 4) { // 6 means compilation error
                status = "error";
                errorMessage = result.stedrr;
            } else {
                status = "wrong_answer";
                errorMessage = result.stderr;
            }
            // runtime += result.time; // accumulate runtime
            // memory += result.memory; // accumulate memory
        }

        // store the result in database in submittedResult
       
        submitedResult.status = status;
        submitedResult.runtime = runtime;
        submitedResult.memory = memory;
        submitedResult.testCasesPassed = testCasesPassed;
        submitedResult.errormessage = errorMessage;
        submitResult.stdout=stdout

      await submitedResult.save();

       if(!req.finduser.problemSolved){
            req.finduser.problemSolved = [];
      }
      // add the problemId to the user problemSolved array if it is not already present in userSchema
      if(!req.finduser.problemSolved.includes(problemId)){
            req.finduser.problemSolved.push(problemId);
            await req.finduser.save();
      }
      res.status(201).send(submitedResult);

    }
    catch(err) {
        res.status(500).send("Error: " + err);
    }
}

const userRun = async (req, res) => {
    try {

         const problemId = req.params.id;        

        let { code, language } = req.body;

        if (!code || !language) {
            return res.status(400).send("Code and language are required");
        }
       
        const problems = await Problem.findById(problemId);
          if (!problems) {
            return res.status(404).send("Problem not found");
            }
              if(language==='cpp')
        language='c++'

           const languageId =  getlanguageById(language);

          const submissions =  problems.visibleTestCases.map((testCase)=>({  
            source_code:code,  // question code
            language_id: languageId,
            stdin: testCase.input,
            expected_output: testCase.output
        }));

        const submitResult = await submitBatch(submissions);
        const resultToken = submitResult.map((value)=> value.token);
        const testResult = await submitToken(resultToken);
      
    let testCasesPassed = 0;
    let runtime = 0;
    let memory = 0;
    let status = true;
    let errorMessage = null;
       


//  const passed = testResult.every(test => test.status.id === 3); 
//         if(passed) {
//             res.status(200).send({
//                message:"Code executed successfully",
//                testResult
//             });
//         }
for(const test of testResult){
        if(test.status_id==3){
           testCasesPassed++;
           runtime = runtime+parseFloat(test.time)
           memory = Math.max(memory,test.memory);
        }else{
          if(test.status_id==4){
            status = false
            errorMessage = test.stderr
          }
          else{
            status = false
            errorMessage = test.stderr
          }
        }
    }

    res.status(201).json({
    success:status,
    testCases: testResult,
    runtime,
    memory
   });
      



    } catch (err) {
        res.status(500).send("Error: " + err);
    }
}


module.exports = { userSubmit , userRun}