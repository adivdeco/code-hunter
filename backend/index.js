const express = require("express");
const app = express();
const main = require("./config/database");
require("dotenv").config();
const authRoutre = require("./routes/userAuth");
const cookieParser = require("cookie-parser");
const redisClint = require("./config/redis");
const problemRouter = require("./routes/problemCreator");
const submitRouter = require("./routes/submit");
const aiRouter = require("./routes/aiChatting");
const noteRouter = require("./routes/noteSection");
const bookmarkRouter = require('./routes/bookmark')
const errorHandler = require('./middleware/errorHandler');
// Only allow your deployed frontend for CORS with credentials
const cors = require("cors");
// const FRONTEND_URL = "https://code-hunter-sable.vercel.app";

// app.use(
//   cors({
//     origin: FRONTEND_URL,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization", "Accept"],
//     exposedHeaders: ["Set-Cookie"],
//   })
// );

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
  })
)

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "All is well" })
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(cookieParser()); // Middleware to parse cookies

app.use("/auth", authRoutre); // user  login,registration,logout and progile view code
app.use("/problem", problemRouter);
app.use("/submit", submitRouter);
app.use("/ai", aiRouter);
app.use("/note", noteRouter);
app.use("/book", bookmarkRouter)
app.use(errorHandler);



const server = async () => {
  try {
    await Promise.all([main(), redisClint.connect()]);

    // console.log("Connected to MongoDB and Redis");

    app.listen(5500, () => {
      // console.log("Server is running on port 5500");
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};
server();
module.exports = app;

// main()
// .then(async () => {
//     console.log('Connected to MongoDB');

//     app.listen(5500, () => {
//         console.log('Server is running on port 5500');
//     });

// })
