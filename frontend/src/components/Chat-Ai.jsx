import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Send, User, BrainCircuit, Bot } from "lucide-react";
import { useSelector } from 'react-redux';
import ChatMessage from "@/components/AiCodeWriter";
import { motion, AnimatePresence } from "framer-motion";

function ChatAi({ problem }) {
  const { user } = useSelector((state) => state.auth);
  const chatKey = `chat-${problem._id}`;

  const [messages, setMessages] = useState(() => {
    // ... (no changes here)
    const stored = localStorage.getItem(chatKey);
    return stored
      ? JSON.parse(stored)
      : [{ role: "model", text: `Hi ${user?.name}, I am your AI assistant. How can I help you with the "${problem.title}" problem?` }];
  });

  // ✨ KEY CHANGE 1: Bring back and use a dedicated state for loading.
  const [isStreaming, setIsStreaming] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const filteredMessages = messages.filter(m => m.text.trim() !== "");
    localStorage.setItem(chatKey, JSON.stringify(filteredMessages));
  }, [messages, chatKey]);

  const onSubmit = async (data) => {
    // ✨ KEY CHANGE 2: Add a guard clause at the very top.
    // If we are already streaming, do nothing. This prevents double-sends.
    if (isStreaming) return;

    // ✨ KEY CHANGE 3: Set streaming to true immediately and synchronously.
    setIsStreaming(true);

    const userMessage = { role: "user", text: data.message };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    reset();

    setMessages((prev) => [...prev, { role: "model", text: "" }]);

    try {
      const response = await fetch("https://code-hunter-backend.onrender.com/ai/chat", {
        // ... (no changes in fetch config)
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          messages: newMessages.filter(m => m.text.trim() !== ""),
          title: problem.title,
          description: problem.description,
          testCases: problem.visibleTestCases,
          startCode: problem.startCode,
        }),
      });

      if (!response.body) throw new Error("No response stream");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let accumulatedText = "";

      while (true) {
        // ... (no changes in while loop)
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        // You can remove the artificial delay if you want a faster response
        // for (const char of chunk) { ... }
        accumulatedText += chunk;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...updated[updated.length - 1], text: accumulatedText };
          return updated;
        });
      }

    } catch (error) {
      console.error("Streaming error:", error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "model", text: "Sorry, this service is currently unavailable. Please try again later." };
        return updated;
      });
    } finally {

      setIsStreaming(false);
    }
  };

  const isAiTyping = messages[messages.length - 1]?.role === 'model' && messages[messages.length - 1]?.text.trim() === '';


  return (
    <div className="flex flex-col h-screen max-h-[82.5vh] min-h-[500px] bg-black/30 border border-purple-500/20 shadow-2xl shadow-purple-900/50 rounded-xl backdrop-blur-sm overflow-hidden">



      <div className="flex-1 overflow-y-auto py-6 px-1 space-y-6">
        {/* ... */}
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-1 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === 'model' && (
                <div className="flex-shrink-0 p-1 rounded-full bg-pink-500/20 border border-pink-400/50 flex items-center justify-center">
                  <Bot size={20} className="text-pink-400" />
                </div>
              )}
              <div className={`max-w-xl px-4 py-2 rounded-2xl ${msg.role === "user" ? 'bg-purple-500/30 border border-purple-400/50 text-white/90 rounded-br-none' : 'bg-black/20 border border-white/10 text-white/80 rounded-bl-none'}`}>
                {isAiTyping && index === messages.length - 1 ? <span className="text-gray-400 italic">Thinking...</span> : <ChatMessage content={msg.text} />}
              </div>
              {msg.role === 'user' && (
                <div className="flex-shrink-0 p-1 rounded-full bg-purple-500/30 border border-purple-400/50 flex items-center justify-center">
                  <User size={20} className="text-purple-300" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {messages[messages.length - 1]?.text?.trim() === "" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2 justify-start pl-14">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />

      </div>

      {/* Input Form */}
      <div className="p-2 border-t border-purple-500/20 bg-black/20">
        <form onSubmit={handleSubmit(onSubmit)} className="relative">
          <input
            placeholder={isStreaming ? "AI is responding..." : "Ask anything about this problem..."}
            className="w-full bg-black/40 border border-purple-700/60 rounded-full py-3 pl-5 pr-14 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            {...register("message", { required: true, minLength: 2 })}
            // ✨ KEY CHANGE 5: Disable based on the reliable isStreaming state.
            disabled={isStreaming}
          />
          <button
            type="submit"
            className="absolute right-2 flex justify-center align-middle items-center top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 border-none disabled:bg-gray-600 disabled:from-gray-600 disabled:to-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transition-transform duration-200"
            // ✨ KEY CHANGE 6: Also disable based on isStreaming.
            disabled={!!errors.message || isStreaming}
          >
            <Send size={18} className="text-white" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatAi;





// message give chunk by chunk formate
// import { useState, useRef, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { Send, User, BrainCircuit, Bot } from "lucide-react";
// import { useSelector } from 'react-redux';
// import ChatMessage from "@/components/AiCodeWriter";
// import { motion, AnimatePresence } from "framer-motion";

// function ChatAi({ problem }) {
//     const { user } = useSelector((state) => state.auth);
//     const chatKey = `chat-${problem._id}`;

//     const [messages, setMessages] = useState(() => {
//         const stored = localStorage.getItem(chatKey);
//         return stored
//             ? JSON.parse(stored)
//             : [{ role: "model", text: `Hi ${user?.name}, I am your AI assistant. How can I help you with the "${problem.title}" problem?` }];
//     });

//     // const [isStreaming, setIsStreaming] = useState(false);

//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors },
//     } = useForm();
//     const messagesEndRef = useRef(null); // inview msg

//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages]);



//     useEffect(() => {
//         // Save messages, but filter out empty ones that might occur during streaming errors
//         const filteredMessages = messages.filter(m => m.text.trim() !== "");
//         localStorage.setItem(chatKey, JSON.stringify(filteredMessages));
//     }, [messages, chatKey]);


//     const onSubmit = async (data) => {
//         const userMessage = { role: "user", text: data.message };
//         const newMessages = [...messages, userMessage];
//         setMessages(newMessages);
//         reset();


//         setMessages((prev) => [...prev, { role: "model", text: "" }]);

//         try {
//             const response = await fetch("https://code-hunter-backend.onrender.com/ai/chat", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 credentials: "include",
//                 body: JSON.stringify({
//                     messages: newMessages.filter(m => m.text.trim() !== ""),
//                     title: problem.title,
//                     description: problem.description,
//                     testCases: problem.visibleTestCases,
//                     startCode: problem.startCode,
//                 }),
//             });

//             if (!response.body) throw new Error("No response stream");

//             const reader = response.body.getReader();
//             const decoder = new TextDecoder("utf-8");
//             let accumulatedText = "";

//             while (true) {
//                 const { value, done } = await reader.read();
//                 if (done) break;

//                 const chunk = decoder.decode(value, { stream: true });

//                 for (const char of chunk) {
//                     accumulatedText += char;


//                     await new Promise((r) => setTimeout(r, 30));


//                     setMessages((prev) => {
//                         const updated = [...prev];
//                         // Update the last message (the AI's placeholder)
//                         updated[updated.length - 1] = { ...updated[updated.length - 1], text: accumulatedText };
//                         return updated;
//                     });
//                 }
//             }

//         } catch (error) {
//             console.error("Streaming error:", error);
//             setMessages((prev) => {
//                 const updated = [...prev];
//                 updated[updated.length - 1] = { role: "model", text: "Sorry, this service is currently unavailable. Please try again later." };
//                 return updated;
//             });
//         }
//     };

//     const isAiTyping = messages[messages.length - 1]?.role === 'model' && messages[messages.length - 1]?.text.trim() === '';


//     return (
//         // ✨ Enhanced container with a subtle glow and border
//         <div className="flex flex-col h-screen max-h-[82vh] min-h-[500px] bg-black/30 border border-purple-500/20 shadow-2xl shadow-purple-900/50 rounded-xl backdrop-blur-sm overflow-hidden">
//             {/* ✨ Header */}
//             <div className="flex-shrink-0 px-4 py-3 border-b border-purple-500/20 bg-black/20 flex items-center space-x-3">
//                 <BrainCircuit className="text-pink-400" />
//                 <h2 className="text-lg font-bold text-white">AI Code Assistant</h2>
//             </div>

//             {/* ✨ Messages Area with AnimatePresence for smooth entry/exit */}
//             <div className="flex-1 overflow-y-auto py-6 px-1 space-y-6">
//                 <AnimatePresence>
//                     {messages.map((msg, index) => (
//                         <motion.div
//                             key={index}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -20 }}
//                             transition={{ duration: 0.3 }}
//                             className={`flex items-start gap-1 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
//                         >
//                             {/* ✨ AI Avatar */}
//                             {msg.role === 'model' && (
//                                 <div className="flex-shrink-0 p-1 rounded-full bg-pink-500/20 border border-pink-400/50 flex items-center justify-center">
//                                     <Bot size={20} className="text-pink-400" />
//                                 </div>
//                             )}

//                             <div className={`max-w-md px-4 py-2 rounded-2xl ${msg.role === "user"
//                                 ? 'bg-purple-500/30 border border-purple-400/50 text-white/90 rounded-br-none'
//                                 : 'bg-black/20 border border-white/10 text-white/80 rounded-bl-none'
//                                 }`}>
//                                 {msg.text.trim() === "" ? <span className="text-gray-400 italic">Thinking...</span> : <ChatMessage content={msg.text} />}
//                             </div>

//                             {/* ✨ User Avatar */}
//                             {msg.role === 'user' && (
//                                 <div className="flex-shrink-0 p-1 rounded-full bg-purple-500/30 border border-purple-400/50 flex items-center justify-center">
//                                     <User size={20} className="text-purple-300" />
//                                 </div>
//                             )}

//                         </motion.div>
//                     ))}
//                 </AnimatePresence>

//                 {/* ✨ AI Typing Indicator */}
//                 {messages[messages.length - 1]?.text?.trim() === "" && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         className="flex items-center space-x-2 justify-start pl-14">
//                         <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
//                         <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
//                         <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
//                     </motion.div>
//                 )}
//                 <div ref={messagesEndRef} />
//             </div>

//             <div className="p-2 border-t border-purple-500/20 bg-black/20">
//                 <form onSubmit={handleSubmit(onSubmit)} className="relative">
//                     <input
//                         placeholder="Ask anything about this problem..."
//                         className="w-full bg-black/40 border border-purple-700/60 rounded-full py-3 pl-5 pr-14 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//                         {...register("message", { required: true, minLength: 2 })}
//                         disabled={isAiTyping}
//                     />
//                     <button
//                         type="submit"
//                         className="absolute right-2 flex justify-center align-middle items-center top-1/2 -translate-y-1/2  h-9 w-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 border-none disabled:bg-gray-600 disabled:opacity-50 hover:scale-110 transition-transform duration-200"
//                         disabled={!!errors.message || isAiTyping}
//                     >
//                         <Send size={18} className="text-white" />
//                     </button>

//                 </form>
//             </div>
//         </div>
//     );
// }

// export default ChatAi;