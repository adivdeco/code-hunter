

// // Pricing.jsx (Updated with Flip Card Design)
// "use client";

// import React from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/footer";
// import { CheckCircle } from "lucide-react";
// import "../Pricing.css";
// import { AuroraText } from "@/components/magicui/aurora-text";

// const plans = [
//     {
//         name: "Freemium",
//         price: "\u20B90",
//         description: "Perfect for beginners starting their coding journey",
//         button: "Current Plan",
//         color: "bg-green-50",
//         features: [
//             "Access to 100+ coding problems",
//             "Community sheets and challenges",
//             "Basic Platform roadmaps",
//             "Limited 1 month of AI discussion access",
//             "Basic Progress tracking and analytics",
//         ],
//         isCurrent: true,
//         prices: false,
//         symbol: "⃣",
//     },
//     {
//         name: "Pro",
//         price: "\u20B92100",
//         description: "For serious coders and job seekers aiming to excel",
//         button: "Unlock Pro",
//         color: "bg-yellow-50",
//         features: [
//             "Access to 500+ coding problems",
//             "Premium Sheets and Challenges",
//             "Personalized learning paths with AI",
//             "Priority support",
//             "Limited 6 months of AI discussion access",
//             "Advanced Progress tracking and analytics",
//         ],
//         isCurrent: false,
//         prices: true,
//         symbol: "⃤",
//     },
//     {
//         name: "Premium",
//         price: "\u20B95100",
//         description:
//             "For the elite coders and tech enthusiasts and ready to dominate.",
//         button: "Go Premium",
//         color: "bg-yellow-100",
//         features: [
//             "Unlimited access to all coding problems",
//             "Premium Sheets and Challenges",
//             "Personalized learning paths with AI",
//             "1:1 mentorship sessions",
//             "Unlimited AI discussion access",
//             "Advanced Progress tracking and analytics",
//         ],
//         isCurrent: false,
//         prices: true,
//         symbol: "〇",
//     },
// ];

// const Pricing = () => {
//     return (
//         <div className="min-h-screen flex flex-col bg-white text-black">
//             <Navbar />

//             <div className="bg-yellow-400 text-center py-2 mt-20 font-semibold">
//                 {/* 🚨 LeetLabs is in Beta! Join now for lifetime access to new problems, roadmaps, and premium features. */}
//             </div>

//             <main className="py-16 px-4 max-w-6xl mx-auto mb-[40vh] text-center">
//                 <h1 className="text-4xl font-bold font-changa mb-4">
//                     Unlock Your Coding Potential with <AuroraText className="italic">Codehunter</AuroraText>
//                 </h1>
//                 <p className="text-lg text-gray-700 mb-12">
//                     No monthly charges, no hidden costs — just lifetime access to everything you need to master coding
//                 </p>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
//                     {plans.map((plan) => (
//                         <div key={plan.name} className="container group w-[350px] h-[520px] mx-auto">
//                             <div className="P_card">

//                                 {/* FRONT SIDE */}
//                                 <div className="card_front h-80 w-52 flex items-center justify-center">
//                                     {/* <h1 className="card-symbol text-white text-[8rem] font-cantata">{plan.symbol}</h1> */}
//                                 </div>

//                                 {/* BACK SIDE */}
//                                 <div className={`card_back  text-left`}>
//                                     <div className={`absolute inset-0 ${plan.color} bg-opacity-70 mix-blend-multiply`}></div>
//                                     <div className="relative z-10 p-6">

//                                         <h2 className="text-4xl font-bold mb-2 font-aladin">{plan.name}</h2>
//                                         <p className="text-sm font-changa text-gray-600 mb-4">
//                                             {plan.description}
//                                         </p>
//                                         <p className="text-3xl font-extrabold mb-2">{plan.price}</p>
//                                         <p className="text-xs mb-6 text-gray-600">
//                                             {plan.prices
//                                                 ? "one-time payment plus GST"
//                                                 : "No Payment. Free Lifetime access."}
//                                         </p>
//                                         <button
//                                             className={`w-full py-2 px-4 rounded-md font-semibold ${plan.isCurrent
//                                                 ? "bg-black text-white"
//                                                 : "bg-yellow-400 hover:bg-yellow-500"
//                                                 }`}
//                                         >
//                                             {plan.button}
//                                         </button>

//                                         <ul className="mt-6 space-y-3 text-sm">
//                                             {plan.features.map((feature) => (
//                                                 <li key={feature} className="flex items-start gap-2">
//                                                     <CheckCircle className="w-4 h-4 text-green-600 mt-[2px]" />
//                                                     <span>{feature}</span>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 </div>
//                                 {/*  */}

//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </main>

//             <Footer />
//         </div>
//     );
// };

// export default Pricing;

"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { CheckCircle, Zap, Sparkles, Rocket, Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
// import { AuroraBackground } from "@/components/magicui/aurora-text";
// import { TextGenerateEffect } from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { AuroraText } from "@/components/magicui/aurora-text";

const plans = [
    {
        id: "freemium",
        name: "Starter",
        price: "\u20B90",
        description: "Perfect for beginners starting their coding journey",
        button: "Current Plan",
        color: "from-green-100 to-green-50",
        border: "border-green-200",
        features: [
            "Access to 100+ coding problems",
            "Community sheets and challenges",
            "Basic Platform roadmaps",
            "Limited 1 month of AI discussion access",
            "Basic Progress tracking"
        ],
        isCurrent: true,
        prices: false,
        icon: <Zap className=" language-icon w-5 h-5 text-green-600" />
    },
    {
        id: "pro",
        name: "Pro",
        price: "\u20B91999",
        originalPrice: "\u20B92999",
        description: "For serious coders and job seekers aiming to excel",
        button: "Upgrade to Pro",
        color: "from-purple-100 to-purple-50",
        border: "border-purple-200",
        features: [
            "Access to 500+ coding problems",
            "Premium Sheets and Challenges",
            "Personalized learning paths with AI",
            "Priority support",
            "6 months of AI discussion access",
            "Advanced Progress analytics"
        ],
        isCurrent: false,
        prices: true,
        popular: true,
        icon: <Sparkles className="w-5 h-5 language-icon text-purple-600" />
    },
    {
        id: "premium",
        name: "Premium",
        price: "\u20B94999",
        originalPrice: "\u20B95999",
        description: "For elite coders ready to dominate the industry",
        button: "Go Premium",
        color: "from-amber-100 to-amber-50",
        border: "border-amber-200",
        features: [
            "Unlimited access to all problems",
            "All Premium Sheets and Challenges",
            "AI-powered personalized paths",
            "1:1 mentorship sessions",
            "Unlimited AI discussion access",
            "Premium Progress analytics"
        ],
        isCurrent: false,
        prices: true,
        icon: <Crown className="w-5 h-5 language-icon text-amber-600" />
    }
];

const Pricing = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [hoveredPlan, setHoveredPlan] = useState(null);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
            <Navbar />

            {/* <AuroraBackground> */}
            <div className="relative z-10 pt-28 pb-16 px-4 max-w-7xl mx-auto text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl md:text-5xl font-bold mb-6 text-black bg-clip-text font-changa"
                >
                    Unlock Your Coding Potential With <AuroraText className="italic">CodeHunter</AuroraText>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl text-gray-600 max-w-3xl mx-auto"
                >
                    Choose the perfect plan for your journey. Pay once, get lifetime access.
                </motion.p>
            </div>
            {/* </AuroraBackground> */}

            <main className="relative z-10 py-12 mb-[40vh] px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ y: -10 }}
                            onHoverStart={() => setHoveredPlan(plan.id)}
                            onHoverEnd={() => setHoveredPlan(null)}
                            onClick={() => setSelectedPlan(plan.id === selectedPlan ? null : plan.id)}
                            className={cn(
                                "relative rounded-2xl border bg-gradient-to-b p-0.5 overflow-hidden transition-all duration-300",
                                plan.border,
                                selectedPlan === plan.id ? "ring-4  ring-purple-500/30" : "",
                                plan.popular ? "shadow-lg shadow-purple-500/50" : "shadow-md"
                            )}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className={cn(
                                "rounded-[15px] bg-white p-6 h-full flex flex-col",
                                plan.color
                            )}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        {plan.icon}
                                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                                    </div>
                                    {plan.originalPrice && (
                                        <span className="text-sm line-through text-gray-500">
                                            {plan.originalPrice}
                                        </span>
                                    )}
                                </div>

                                <div className="mb-6">
                                    <p className="text-4xl font-extrabold mb-1">{plan.price}</p>
                                    <p className="text-xs text-gray-500">
                                        {plan.prices ? "One-time payment" : "Free forever"}
                                    </p>
                                </div>

                                <p className="text-gray-600 mb-6">{plan.description}</p>

                                <Button
                                    size="lg"
                                    className={cn(
                                        "w-full mb-6 font-bold transition-all",
                                        plan.isCurrent ? "bg-gray-900 hover:bg-gray-800" :
                                            plan.id === "pro" ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700" :
                                                "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                                    )}
                                >
                                    {plan.button}
                                </Button>

                                <AnimatePresence>
                                    {(selectedPlan === plan.id || hoveredPlan === plan.id) && (
                                        <motion.ul
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="mt-4 space-y-3 overflow-hidden"
                                        >
                                            {plan.features.map((feature) => (
                                                <motion.li
                                                    key={feature}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="flex items-start gap-2 text-sm"
                                                >
                                                    <CheckCircle className="flex-shrink-0 w-4 h-4 mt-0.5 text-green-600" />
                                                    <span>{feature}</span>
                                                </motion.li>
                                            ))}
                                        </motion.ul>
                                    )}
                                </AnimatePresence>

                                {!(selectedPlan === plan.id || hoveredPlan === plan.id) && (
                                    <div className="mt-auto pt-4 text-center">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="text-xs text-gray-500 inline-flex items-center gap-1 cursor-pointer"
                                        >
                                            <Rocket className="w-3 h-3" />
                                            View features
                                        </motion.div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100">
                    <h3 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                question: "Is this a subscription or one-time payment?",
                                answer: "All our paid plans are one-time payments with lifetime access. No recurring fees!"
                            },
                            {
                                question: "Can I upgrade my plan later?",
                                answer: "Yes! You can upgrade anytime and only pay the difference between plans."
                            },
                            {
                                question: "Do you offer refunds?",
                                answer: "We offer a 14-day money-back guarantee if you're not satisfied."
                            },
                            {
                                question: "Will there be more content added?",
                                answer: "Absolutely! We continuously add new problems, challenges, and features at no extra cost."
                            }
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -2 }}
                                className="bg-white p-5 rounded-xl shadow-sm border"
                            >
                                <h4 className="font-semibold text-lg mb-2">{faq.question}</h4>
                                <p className="text-gray-600">{faq.answer}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Pricing;