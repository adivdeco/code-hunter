import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

import Navbar from '@/components/Navbar';
import ThreeRingLoader from '@/components/ThreeRingLoader';

const socket = io("https://code-hunter-backend.onrender.com", { autoConnect: false }); // move outside component

const GlobalChatPage = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const chatEndRef = useRef(null);

    // Connect socket once when authenticated
    useEffect(() => {
        if (!isAuthenticated || !user) return;

        if (!socket.connected) {
            socket.connect();
        }

        socket.on("connect", () => {
            console.log("✅ Socket connected:", socket.id);
        });

        socket.on("initialMessages", (initialMessages) => {
            console.log("📨 Received messages:", initialMessages);
            setMessages(initialMessages);
            setIsLoading(false);
        });

        socket.on("newMessage", (newMessage) => {
            console.log("💬 New message:", newMessage);
            setMessages((prev) => [...prev, newMessage]);
        });

        return () => {
            socket.off("connect");
            socket.off("initialMessages");
            socket.off("newMessage");
            socket.disconnect();
        };
    }, [user, isAuthenticated]);

    // Scroll to bottom when messages update
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() && user) {
            const messageData = {
                userId: user._id,
                message: newMessage.trim(),
            };
            socket.emit('sendMessage', messageData);
            setNewMessage('');
        }
    };

    if (!isAuthenticated || !user || isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-black text-white">
                <ThreeRingLoader />
            </div>
        );
    }

    const MessageBubble = ({ msg }) => {
        const isCurrentUser = msg.userId?._id === user?._id;
        const avatarSeed = msg.userId?.avatarSeed || msg.userId?.name || 'default';

        return (
            <motion.div
                layout
                className={`flex items-start gap-3 my-4 w-full ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
                {!isCurrentUser && (
                    <img
                        src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${avatarSeed}`}
                        alt="avatar"
                        className="w-10 h-10 rounded-full border-2 border-purple-400/50"
                    />
                )}
                <div className={`flex flex-col max-w-lg ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                    <div className={`px-4 py-2 rounded-xl ${isCurrentUser ? 'bg-purple-500/30 border border-purple-400 rounded-br-none' : 'bg-pink-500/30 border border-pink-400  rounded-bl-none'}`}>
                        <div className="font-changa text-xs mb-1">
                            {isCurrentUser ? 'You' : msg.userId?.name || 'Anonymous'}
                        </div>
                        <p className="text-white break-words">{msg.message}</p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                        {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                    </span>
                </div>
                {isCurrentUser && (
                    <img
                        src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${avatarSeed}`}
                        alt="avatar"
                        className="w-10 h-10 rounded-full border-2 border-purple-400/50"
                    />
                )}
            </motion.div>
        );
    };

    return (
        <div className='bg-gradient-to-br from-black via-gray-950 to-purple-950 min-h-screen flex flex-col text-white'>

            <nav className='text-white'>
                <Navbar />
            </nav>

            <main className="flex-grow flex mt-[10vh] flex-col p-4 container mx-auto">

                {/* tittle */}
                <h1 className="text-4xl font-aladin font-bold text-center my-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400  to-pink-500">
                    Global Discussion Hub
                </h1>

                {/* Chat Messages Container */}
                <div className="flex-grow overflow-y-scroll h-80 p-4 mb-4 bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-xl shadow-lg">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <ThreeRingLoader />
                        </div>
                    ) : (
                        <AnimatePresence>
                            {messages.map((msg) => (
                                <MessageBubble key={msg._id || Math.random()} msg={msg} />
                            ))}
                            <div ref={chatEndRef} />
                        </AnimatePresence>
                    )}
                </div>

                {/* Message Input Form */}
                <form
                    onSubmit={handleSendMessage}
                    className="flex items-center gap-4 p-4 text-white backdrop-blur-md border border-purple-500/20 rounded-xl shadow-2xl"
                >
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={isAuthenticated ? "Type your message..." : "Please log in to chat."}
                        disabled={!isAuthenticated || isLoading}
                        className="flex-grow px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition w-full disabled:cursor-not-allowed"
                    />
                    <button
                        type="submit"
                        disabled={!isAuthenticated || isLoading || !newMessage.trim()}
                        className="p-3 bg-purple-600 rounded-full hover:bg-purple-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                        <Send size={20} />
                    </button>
                </form>

            </main>

            {/* <Footer /> */}
        </div>
    );
};

export default GlobalChatPage;
