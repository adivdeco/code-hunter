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
const discussionRoutes = require('./routes/discussionRoutes');
const videoRouter = require("./routes/videoCtrator")
const session = require('express-session');
const passport = require('passport');


const app = express();


// part of fit
// Add these to your existing server setup:

// Session configuration with Redis store
const RedisStore = require('connect-redis')(session);
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Trust proxy for HTTPS
app.set('trust proxy', 1);

// Add CORS middleware for OAuth routes
app.use('/auth/github', cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
// git part end


const errorHandler = require('./middleware/errorHandler');



// --- Application Constants ---
const PORT = process.env.PORT || 5500;
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
app.get('/', (req, res) => {
  res.send('Code Hunter Backend API is running 🚀');
});
process.on('SIGINT', async () => {
  console.log('🔌 Shutting down server...');
  await redisClient.quit();
  // Optionally close DB connection if needed
  httpServer.close(() => {
    console.log('🛑 Server stopped.');
    process.exit(0);
  });
});

app.use('/auth', cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use("/auth", authRouter);
app.use("/problem", problemRouter);
app.use("/submit", submitRouter);
app.use("/ai", aiRouter);
app.use("/note", noteRouter);
app.use("/book", bookmarkRouter);
app.use('/api/discussion', discussionRoutes);
app.use("/video", videoRouter);
// --- Error Handling Middleware (must be last) ---
// 1. Handle 404 Not Found for any unhandled routes
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// 2. Global error handler to catch all other errors
app.use(errorHandler);
// app.use((err, req, res, next) => {
//   console.error("🔴 Error Middleware:", err.stack || err);
//   res.status(500).json({ success: false, error: err.message });
// });


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