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
// const discussRouter = require('./routes/discussSection');

// Only allow your deployed frontend for CORS with credentials
const cors = require("cors");
const http = require('http');
const { Server } = require("socket.io");
const Chat = require('./models/chatSchema');
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
    credentials: true,
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
// app.use("/discuss", discussRouter);
// app.use(errorHandler);



const server = async () => {
  try {
    await Promise.all([main(), redisClint.connect()]);

    console.log("Connected to MongoDB and Redis");

    const server = http.createServer(app);

    // 3.
    const io = new Server(server, {
      cors: {
        // Re-define origins for socket.io
        origin: ['http://localhost:5173', 'http://localhost:5174', "https://code-hunter-sable.vercel.app"],
        methods: ["GET", "POST"]
      }
    });

    // 4. Define all Socket.io connection logic here
    io.on('connection', async (socket) => {
      console.log('A user connected via WebSocket:', socket.id);

      // Send chat history to the newly connected user
      try {
        const last50Messages = await Chat.find()
          .sort({ createdAt: -1 }) // Get newest first to limit, then reverse on client if needed
          .limit(50)
          .populate('userId', 'name avatarSeed') // Populate with essential user details
          .lean(); // Use .lean() for faster read-only operations

        // Reverse to show oldest first in the chat window
        socket.emit('initialMessages', last50Messages.reverse());

      } catch (error) {
        console.error("Error fetching initial messages:", error);
      }

      // Listen for a new message from a client
      socket.on('sendMessage', async (data) => {
        const { userId, message } = data;

        if (!userId || !message || message.trim() === "") {
          // You can optionally emit an error back to the user
          // socket.emit('chatError', { message: 'Invalid message or user.' });
          return;
        }

        try {
          // Save the new message to the database
          const newMessage = new Chat({ userId, message: message.trim() });
          let savedMessage = await newMessage.save();

          // Populate the user info before broadcasting
          savedMessage = await savedMessage.populate('userId', 'name avatarSeed');

          // Broadcast the new message to ALL connected clients, including the sender
          io.emit('newMessage', savedMessage);
        } catch (error) {
          console.error('Error saving or broadcasting message:', error);
          // socket.emit('chatError', { message: 'Could not send message.' });
        }
      });

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });


    server.listen(5500, () => {
      console.log("🚀 Server is running on port 5500");
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit if critical connections fail

  }
};
server();
module.exports = app;


