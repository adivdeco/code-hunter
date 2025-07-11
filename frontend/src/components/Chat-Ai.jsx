import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
// import axiosClient from "../utils/axiosClint";
import { Send } from "lucide-react";
import { useSelector } from 'react-redux';
import ChatMessage from "@/components/AiCodeWriter"; // adjust path if needed



function ChatAi({ problem }) {
  const { user } = useSelector((state) => state.auth);

  const chatKey = `chat-${problem._id}`;

  const [messages, setMessages] = useState(() => {
    const stored = localStorage.getItem(chatKey);
    return stored
      ? JSON.parse(stored)
      : [
        { role: "model", text: `hi ${user?.name}, how can I help you?` },
        // { role: "user", text: "..." },
      ];
  });


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(); // part of hook-form
  const messagesEndRef = useRef(null); // to bring latest msg in view

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); // logic for recent msg look always in p0v of user..
  }, [messages]);




  const onSubmit = async (data) => {
    const userMessage = { role: "user", text: data.message };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages); // update UI immediately
    reset();

    const modelMessage = { role: "model", text: "" };
    setMessages((prev) => [...prev, modelMessage]);

    try {
      const response = await fetch("http://localhost:5500/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          messages: newMessages,
          title: problem.title,
          description: problem.description,
          testCases: problem.visibleTestCases,
          startCode: problem.startCode,
        }),
      });

      if (!response.body) throw new Error("No response stream");

      // const reader = response.body.getReader();
      // const decoder = new TextDecoder("utf-8");

      // let streamedText = "";

      // while (true) {
      //   const { value, done } = await reader.read();
      //   if (done) break;

      //   streamedText += decoder.decode(value, { stream: true });

      //   // Update the last message (model's response)
      //   setMessages((prev) => {
      //     const updated = [...prev];
      //     updated[updated.length - 1] = {
      //       ...updated[updated.length - 1],
      //       text: streamedText,
      //     };
      //     return updated;
      //   });
      // }
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let accumulatedText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        for (const char of chunk) {
          accumulatedText += char;


          await new Promise((r) => setTimeout(r, 20));

          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              text: accumulatedText,
            };
            return updated;
          });
        }
      }



    } catch (error) {
      console.error("Streaming error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "This service is currently unavailable.",
        },
      ]);
    }
  };


  useEffect(() => {
    localStorage.setItem(chatKey, JSON.stringify(messages));
  }, [messages, chatKey]);

  return (
    <div className="flex flex-col h-screen max-h-[80vh] min-h-[500px] bg-gray-700 rounded-2xl">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"
              }`}
          >
            <div className="chat-bubble bg-base-200 text-base-content">
              {/* {msg.text} */}
              <ChatMessage content={msg.text} />
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sticky bottom-0 p-4 bg-transparent "
      >
        {/* main part */}
        <div className="flex items-center">
          <input
            placeholder="Ask me !anything, only related to question hear."
            className="input input-bordered flex-1"
            {...register("message", { required: true, minLength: 2 })}
          />
          <button
            type="submit"
            className="btn btn-circle bg-gray-700 ml-2"
            disabled={errors.message}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatAi;
