// --- Core Node.js Modules ---
const http = require('http');

// --- Third-Party Modules ---
require("dotenv").config(); // Load environment variables first
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// --- Local Modules ---
const dbConnection = require("./config/database");
const redisClient = require("./config/redis");
const { getCorsOptions } = require("./config/corsOptions");
const { initializeSocket } = require('./socket/socketHandler');

// Routes
const authRouter = require("./routes/userAuth");
const problemRouter = require("./routes/problemCreator");
const submitRouter = require("./routes/submit");
const aiRouter = require("./routes/aiChatting");
const noteRouter = require("./routes/noteSection");
const bookmarkRouter = require('./routes/bookmark');

// Middleware
const errorHandler = require('./middleware/errorHandler');

// --- Application Constants ---
const PORT = process.env.PORT || 5500;
const app = express();
const httpServer = http.createServer(app);

// --- Middleware Setup ---
app.use(cors(getCorsOptions())); // Use centralized CORS configuration
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.use(cookieParser()); // To parse cookies

// --- API Routes ---
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", message: "Server is healthy" });
});

app.use("/auth", authRouter);
app.use("/problem", problemRouter);
app.use("/submit", submitRouter);
app.use("/ai", aiRouter);
app.use("/note", noteRouter);
app.use("/book", bookmarkRouter);

// --- Error Handling Middleware (must be last) ---
// 1. Handle 404 Not Found for any unhandled routes
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// 2. Global error handler to catch all other errors
app.use(errorHandler);


// --- Server Startup ---
const startServer = async () => {
  try {
    // 1. Connect to essential services (Database, Redis) in parallel
    await Promise.all([dbConnection(), redisClient.connect()]);
    console.log("✅ Connected to MongoDB and Redis");

    // 2. Initialize Socket.io after successful connections
    initializeSocket(httpServer);

    // 3. Start listening for HTTP requests
    httpServer.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start the server:", err);
    process.exit(1); // Exit process with failure code if critical services fail
  }
};

startServer();

module.exports = app;