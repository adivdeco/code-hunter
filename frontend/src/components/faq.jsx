import { useState, useRef, Suspense, lazy, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { AuroraText } from "./magicui/aurora-text";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Sparkles, Bot, Code, Languages } from "lucide-react";
import Confetti from "react-dom-confetti";


const notifications = [
    {
        id: "lang-support",
        name: "What Languages Do We Support?",
        description: "We currently support Java, JavaScript, Python, Go, and C++ with more languages coming soon!",
        icon: "📚",
        color: "#00C9A7",
        gradient: "from-emerald-100 to-teal-100"
    },
    {
        id: "experience-needed",
        name: "Do I Need Prior Coding Experience?",
        description: `Not at all! We guide you through the journey with increasing difficulty. Start with our beginner-friendly problems and work your way up as you build confidence. We offer introductory modules for absolute beginners.`,
        icon: "👤",
        color: "#FFB800",
        gradient: "from-amber-100 to-yellow-100"
    },
    {
        id: "improvement-timeline",
        name: "How Long Until I See Improvement?",
        description: `Most users report significant confidence improvements within 2-3 weeks of consistent training. Our data shows measurable skill improvements typically appear within 3-4 weeks for users practicing 4-5 times per week.`,
        icon: "📈",
        color: "#FF3D71",
        gradient: "from-pink-100 to-rose-100"
    },
    {
        id: "job-guarantee",
        name: "Do You Offer Job Placement Guarantees?",
        description: "While we don't guarantee specific job outcomes, we do guarantee measurable skill improvement. Our data shows that members who complete our full training program experience a 74% higher interview success rate compared to industry averages.",
        icon: "💼",
        color: "#1E86FF",
        gradient: "from-blue-100 to-sky-100"
    },
    {
        id: "leetcode-comparison",
        name: "How Does This Compare To LeetCode?",
        description: "We're not here to compete — we're here to complement. CodeHunter provides a more guided, immersive, and themed experience with personalized learning paths that adapt to your skill level and goals. Many users find our approach more structured for systematic improvement.",
        icon: "🆚",
        color: "#8A2BE2",
        gradient: "from-purple-100 to-violet-100"
    }
];

// Confetti configuration
const confettiConfig = {
    angle: 90,
    spread: 200,
    startVelocity: 35,
    elementCount: 100,
    dragFriction: 0.07,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

export default function FAQSection() {


    const [expandedItem, setExpandedItem] = useState(null);
    const [aiThinking, setAiThinking] = useState(false);
    const [aiResponse, setAiResponse] = useState("");
    const confettiRefs = useRef([]);



    const handleAskAI = async (question) => {
        setAiThinking(true);
        setAiResponse("");

        // Mock AI responses based on question
        const responses = {
            "lang-support": "We currently support Java, JavaScript, Python, and C++. Based on your activity, I recommend focusing on JavaScript as it aligns with your progress.",
            "experience-needed": "Our data shows beginners typically need 2 weeks with our fundamentals track before tackling standard problems. Try our 'Zero to Coder' pathway!",
            "improvement-timeline": "Users with your practice frequency (3x/week) usually see interview readiness in 5-6 weeks. Boost this to daily for 3x faster results!",
            "job-guarantee": "While we can't guarantee jobs, our Premium users have an 82% placement rate within 3 months when completing all mock interviews.",
            "leetcode-comparison": "Unlike LeetCode's vast pool, we curate problems targeting your weak areas (like your recent OOP challenges)."
        };

        const mockResponse = responses[question] || "I'd be happy to help with that! Our platform specializes in...";

        // Simulate streaming API response
        const simulateStreaming = async () => {
            let accumulatedText = "";

            // Add a small delay to simulate network latency
            await new Promise(resolve => setTimeout(resolve, 4300));

            for (const char of mockResponse) {
                accumulatedText += char;
                setAiResponse(accumulatedText);

                // Randomize the delay slightly for more natural typing effect
                await new Promise(r => setTimeout(r, 10 + Math.random() * 40));
            }

            setAiThinking(false);
        };

        await simulateStreaming();

    };

    return (
        <section className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50">

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-100">
                <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-100 animate-blob"></div>
                <div className="absolute top-0 right-20 w-96 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative flex flex-col items-center justify-center px-4 mx-auto text-center max-w-7xl"
            >
                <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-purple-100 text-purple-600 text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    Need Help?
                </div>
                <h2 className="text-5xl font-bold mb-4">
                    <AuroraText className="italic">Frequently Asked Questions</AuroraText>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl">
                    Quick answers to common questions about <span className="font-semibold text-purple-600">CodeHunter</span>
                </p>
            </motion.div>

            {/* Enhanced FAQ */}
            <motion.div className="relative flex flex-col overflow-hidden mt-8 px-4 mx-auto max-w-5xl">
                <Accordion
                    type="single"
                    collapsible
                    value={expandedItem}
                    onValueChange={(value) => {
                        setExpandedItem(value);
                        setAiResponse("");
                    }}
                    className="space-y-4"
                >
                    {notifications.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="relative">
                                <div className="absolute top-0 right-0 transform translate-y-[-50%]">
                                    <Confetti
                                        active={expandedItem === item.id}
                                        config={confettiConfig}
                                    />
                                </div>

                                <AccordionItem
                                    value={item.id}
                                    className={cn(
                                        "rounded-2xl border overflow-hidden bg-gradient-to-br",
                                        item.gradient,
                                        expandedItem === item.id ? "shadow-lg ring-2 ring-purple-400" : "shadow-md"
                                    )}
                                >
                                    <AccordionTrigger className="font-changa text-2xl p-6 hover:no-underline">
                                        <div className="flex items-center gap-4 w-full">
                                            <span
                                                className="flex items-center justify-center w-10 h-10 rounded-full text-xl"
                                                style={{ backgroundColor: `${item.color}20`, color: item.color }}
                                            >
                                                {item.icon}
                                            </span>
                                            <span className="text-left flex-1">{item.name}</span>
                                            {expandedItem === item.id && (
                                                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                                                    Expanded!
                                                </span>
                                            )}
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="font-changa text-lg px-6 pb-6 pt-2 space-y-4">
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                            className="border-t border-gray-200 pt-4"
                                        >
                                            {item.description}
                                        </motion.div>

                                        {/* AI Assistant Section */}
                                        {expandedItem === item.id && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="mt-4 p-4 bg-white/80 rounded-lg border border-purple-100"
                                            >
                                                <div className="flex items-center gap-3 mb-3">
                                                    <Bot className="text-purple-600" />
                                                    <h4 className="font-bold">AI Assistant</h4>
                                                </div>

                                                {aiResponse ? (
                                                    <div className="p-3 bg-purple-50 rounded-md text-sm relative">
                                                        {aiResponse}
                                                        {aiThinking && (
                                                            <span className="ml-1 inline-block w-2 h-5 bg-purple-600 animate-pulse"></span>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => handleAskAI(item.id)}
                                                        disabled={aiThinking}
                                                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full text-sm font-medium hover:from-purple-200 hover:to-blue-200 transition-all"
                                                    >
                                                        {aiThinking ? (
                                                            <>
                                                                <svg className="animate-spin h-4 w-4 text-purple-600" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg>
                                                                Thinking...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Sparkles className="w-4 h-4 text-purple-600" />
                                                                Ask AI for personalized advice
                                                            </>
                                                        )}
                                                    </button>
                                                )}
                                            </motion.div>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            </div>
                        </motion.div>
                    ))}
                </Accordion>

                {/* ... (previous CTA section) */}
            </motion.div>


            {/* CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-16 text-center"
            >
                <p className="text-xl text-gray-600 font-rocksalt mb-6">
                    Still have questions? We're here to help!
                </p>

                <div className="relative inline-block">
                    <button
                        className="px-8 py-3 bg-gradient-to-r font-changa from-purple-600 to-blue-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"

                    >
                        Contact Our Support Team
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                    </button>
                    <div className="absolute -right-2 -top-2 bg-red-500 text-xs text-white font-bold px-2 py-1 rounded-full animate-bounce">
                        LIVE
                    </div>
                </div>






            </motion.div>


            <style>{`
         @keyframes blob {
           0% { transform: translate(0px, 0px) scale(1); }
           33% { transform: translate(30px, -50px) scale(1.1); }
           66% { transform: translate(-20px, 20px) scale(0.9); }
           100% { transform: translate(0px, 0px) scale(1); }
         }
         .animate-blob {
           animation: blob 7s infinite;
         }
         .animation-delay-2000 {
           animation-delay: 2s;
         }
         .animation-delay-4000 {
           animation-delay: 4s;
         }
       `}</style>

        </section>
    );
}