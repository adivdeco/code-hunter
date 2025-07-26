const { Server } = require("socket.io");
const Chat = require('../models/chatSchema');
const { getCorsOptions } = require('../config/corsOptions');

const initializeSocket = (httpServer) => {
    // Initialize Socket.io with the HTTP server and CORS options
    const io = new Server(httpServer, {
        cors: getCorsOptions(), // Reuse the same CORS config as Express
    });

    // Handle all socket connection logic
    io.on('connection', (socket) => {
        console.log(`✅ User connected via WebSocket: ${socket.id}`);

        // --- Event: Send initial chat history ---
        const sendChatHistory = async () => {
            try {
                // Fetch the last 50 messages, populating user info
                // .lean() makes the query faster as it returns plain JS objects
                const last50Messages = await Chat.find()
                    .sort({ createdAt: -1 })
                    .limit(50)
                    .populate('userId', 'name avatarSeed')
                    .lean();

                // Reverse the array to display in chronological order on the client
                socket.emit('initialMessages', last50Messages.reverse());
            } catch (error) {
                console.error("Error fetching initial chat messages:", error);
                // Optionally emit an error to the client
                socket.emit('chatError', { message: "Could not load chat history." });
            }
        };

        sendChatHistory(); // Send history on connection

        // --- Event: Listen for new messages from a client ---
        socket.on('sendMessage', async (data) => {
            const { userId, message } = data;

            // Validate incoming data
            if (!userId || !message || typeof message !== 'string' || message.trim() === "") {
                socket.emit('chatError', { message: 'Invalid message data.' });
                return;
            }

            try {
                // Save the new message to the database
                const newMessage = new Chat({ userId, message: message.trim() });
                let savedMessage = await newMessage.save();

                // Populate the user details before broadcasting for immediate display
                savedMessage = await savedMessage.populate('userId', 'name avatarSeed');

                // Broadcast the new message to ALL connected clients
                io.emit('newMessage', savedMessage);
            } catch (error) {
                console.error('Error saving or broadcasting message:', error);
                socket.emit('chatError', { message: 'Message could not be sent.' });
            }
        });

        // --- Event: Handle disconnection ---
        socket.on('disconnect', () => {
            console.log(`❌ User disconnected: ${socket.id}`);
        });
    });

    console.log("Socket.io initialized successfully.");
    return io;
};

module.exports = { initializeSocket };