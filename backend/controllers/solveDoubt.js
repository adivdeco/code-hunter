// const { GoogleGenAI } = require("@google/genai");

// const solveDoubt = async (req, res) => {
//   try {
//     const { messages, title, description, testCases, startCode } = req.body;

//     const ai = new GoogleGenAI({ apiKey: process.env.GoogleGenAI });

//     async function main() {
//       const response = await ai.models.generateContentStream({
//         model: "gemini-1.5-flash",
//         contents: messages,
//         config: {
//           systemInstruction:
//             `promot`
//           ,
//         },
//       });

//       res.status(201).json({
//         message: response.text,
//       });
//     }

//     main();
//   } catch (err) {
//     res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// };

// module.exports = solveDoubt;

const { GoogleGenAI } = require("@google/genai");

const solveDoubt = async (req, res) => {
  try {
    const { messages, title, description, testCases, startCode } = req.body;

    const ai = new GoogleGenAI({ apiKey: process.env.GoogleGenAi });

    const result = await ai.models.generateContentStream({
      model: "gemini-1.5-flash",
      contents: messages,
      config: {
        systemInstruction: `You are an expert coding assistant. Help solve: ${title}. Description: ${description}.`,
      },
    });

    // Set headers for streaming text
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    for await (const chunk of result) {
      if (chunk.text) {
        res.write(chunk.text);
      }
    }

    res.end(); // Important: close the stream
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = solveDoubt;
