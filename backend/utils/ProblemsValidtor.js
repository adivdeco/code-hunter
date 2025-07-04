const axios = require('axios');


const getlanguageById = (lang) => {

  const language = {
    "c++": 54,
    "java": 62,
    "javascript": 63,
    "python": 71,
    "go": 60
  }

  return language[lang.toLowerCase()];
}


const submitBatch = async (submissions) => {

  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
    params: {
      base64_encoded: 'false',
    },
    headers: {
      'x-rapidapi-key': ['b7055c95acmsh34946e84e4e6f61p1448adjsn7ebce46cd253' && '76ffe15e8cmsha9abf02ab7b7937p1e8e51jsn36db5c33381c'],
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      submissions
    }
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  return await fetchData();
}
// this is used to submit the code and get the token of each submission> as [ { tocken:ndjbdjkh289u90u3},{ tocken:ndjbdjkh289u90u3}] bcz it wont check the result of test cases at a time it just submit the code and return the token of each submission

const waiting = async (time) => {
  setTimeout(() => {
    return 1
  }, time);
} // wating fun for 1s , to make sure that we dont hit the api too fast and get rate limit error



const submitToken = async (resultToken) => {

  const options = {
    method: 'GET',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
    params: {
      tokens: resultToken.join(','), // Join tokens with commas
      base64_encoded: 'false',
      fields: '*'
    },
    headers: {
      'x-rapidapi-key': 'b7055c95acmsh34946e84e4e6f61p1448adjsn7ebce46cd253', //'76ffe15e8cmsha9abf02ab7b7937p1e8e51jsn36db5c33381c',
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
    }
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  while (true) {

    const result = await fetchData();

    const Isresultobtained = result.submissions.every((r) => r.status_id > 2)

    if (Isresultobtained) {
      return result.submissions;
    }

    await waiting(1000)

  }

}

// this fun gives the result of all test cases as array of objects like [{status:{id:3},time:0.1,memory:1024},{status:{id:3},time:0.1,memory:1024}] and we can check the status_id to know if the test case passed or not
// status_id 3 means test case passed, 4 means test case failed, 5 means compilation error, 6 means runtime error, 7 means time limit exceeded, 8 means memory limit exceeded








module.exports = { getlanguageById, submitBatch, submitToken };