const express = require("express");
const app = express();
const main = require("./config/database");
require("dotenv").config();
const authRoutre = require("./routes/userAuth");
const cookieParser = require("cookie-parser");
const redisClint = require("./config/redis");
const problemRouter = require("./routes/problemCreator");
const submitRouter = require("./routes/submit");
const cors = require("cors");
const aiRouter = require("./routes/aiChatting");
const noteRouter = require("./routes/noteSection");

// app.use(
//   cors({
//     // origin: ['http://localhost:5173', "http://localhost:5174"],
//     credentials: true,

//   })
// );
let whitelist = ['http://example1.com/', 'http://example2.com/', "https://code-hunter-sable.vercel.app/"]
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(
  corsOptions
))

app.get("/", (req, res) => {
  res.status(200).json({ sucess: true, message: "All is well" })
})

app.use(express.json());
app.use(cookieParser()); // Middleware to parse cookies

app.use("/auth", authRoutre); // user  login,registration,logout and progile view code
app.use("/problem", problemRouter);
app.use("/submit", submitRouter);
app.use("/ai", aiRouter);
app.use("/note", noteRouter);



const surver = async () => {
  try {
    await Promise.all([main(), redisClint.connect()]);

    console.log("Connected to MongoDB and Redis");

    app.listen(5500, () => {
      console.log("Server is running on port 5500");
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};
surver();
module.exports = app;

// main()
// .then(async () => {
//     console.log('Connected to MongoDB');

//     app.listen(5500, () => {
//         console.log('Server is running on port 5500');
//     });

// })
