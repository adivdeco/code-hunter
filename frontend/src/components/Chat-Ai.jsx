import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../utils/axiosClint";
import { Send } from 'lucide-react';

function ChatAi({problem}) {
    const [messages, setMessages] = useState([
        { role: 'model', parts:[{text: "'hi', how i help you?"}] },
        { role: 'user', parts:[{text:"..."}] }
    ]);

    const { register, handleSubmit, reset,formState: {errors} } = useForm();  // part of hook-form
    const messagesEndRef = useRef(null);     // to bring latest msg in view

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); // logic for recent msg look always in p0v of user..
    }, [messages]);



    const onSubmit = async (data) => {

        setMessages(prev => [...prev, { role: 'user', parts:[{text:data.message}]}]);
        reset();

        try {
            
            const response = await axiosClient.post("/ai/chat", {
                messages,
                title:problem.title,
                description:problem.description,
                testCases: problem.visibleTestCases,
                startCode:problem.startCode
            });

           
            setMessages(prev => [...prev, { 
                role: 'model', 
                // content: response.data.message || response.data.content 
                parts:[{text: response.data.message}]
            }]);

        } catch (error) {
            console.error("API Error:", error);
            setMessages(prev => [...prev, { 
                role: 'model', 
                // content: "Sorry, I encountered an error" 
                parts:[{text:"this service is curently shutdown.." }]
            }]);
        }
    };

    return (
        <div className="flex flex-col h-screen max-h-[80vh] min-h-[500px] bg-gray-700 rounded-2xl">
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}
                    >
                        <div className="chat-bubble bg-base-200 text-base-content">
                            {msg.parts[0].text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="sticky bottom-0 p-4 bg-transparent "
            >
                <div className="flex items-center">
                    <input 
                        placeholder="Ask me !anything, only related to question hear." 
                        className="input input-bordered flex-1" 
                        {...register("message", { required: true, minLength: 2 })}
                    />
                    <button 
                        type="submit" 
                        className="btn btn-ghost ml-2"
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