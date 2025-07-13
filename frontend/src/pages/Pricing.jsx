
// // Pricing.jsx
// "use client";

// import React from "react";
// import Navbar from "@/components/Navbar"
// import Footer from "@/components/footer";
// import { CheckCircle } from "lucide-react";

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
//             "Basic Progress tracking and analytics"
//         ],
//         isCurrent: true,
//         prices: false
//     },
//     {
//         name: "Pro",
//         price: "\u20B91999",
//         description: "For serious coders and job seekers aiming to excel",
//         button: "Unlock Pro",
//         color: "bg-yellow-50",
//         features: [
//             "Access to 500+ coding problems",
//             "Premium Sheets and Challenges",
//             "Personalized learning paths with AI",
//             "Priority support",
//             "Limited 6 months of AI discussion access",
//             "Advanced Progress tracking and analytics"
//         ],
//         isCurrent: false,
//         prices: true
//     },
//     {
//         name: "Premium",
//         price: "\u20B94999",
//         description: "For the elite coders and tech enthusiasts and ready to dominate.",
//         button: "Go Premium",
//         color: "bg-yellow-100",
//         features: [
//             "Unlimited access to all coding problems",
//             "Premium Sheets and Challenges",
//             "Personalized learning paths with AI",
//             "1:1 mentorship sessions",
//             "Unlimited AI discussion access",
//             "Advanced Progress tracking and analytics"
//         ],
//         isCurrent: false,
//         prices: true

//     }
// ];

// const Pricing = () => {
//     return (
//         <div className="min-h-screen flex flex-col bg-white text-black">
//             <Navbar />

//             <div className="bg-yellow-400 text-center py-2 mt-20 font-semibold">
//                 {/* 🚨 LeetLabs is in Beta! Join now for lifetime access to new problems, roadmaps, and premium features. */}
//             </div>

//             <main className="py-16 px-4 max-w-6xl mx-auto mb-80 text-center">
//                 <h1 className="text-4xl font-bold font-changa mb-4">Unlock Your Coding Potential</h1>
//                 <p className="text-lg text-gray-700 mb-12">
//                     Choose a plan that fits your goals. Get lifetime access to LeetLabs resources with no recurring fees.
//                 </p>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {plans.map((plan) => (
//                         <div
//                             key={plan.name}
//                             className={`rounded-2xl p-6 shadow-lg text-left transition-transform hover:scale-[1.03] ${plan.color}`}
//                         >
//                             <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
//                             <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
//                             <p className="text-3xl font-extrabold mb-2">{plan.price}</p>
//                             <p className="text-xs mb-6 text-gray-600">{plan.prices ? "one-time paymentplus GST" : "No Payment. Free Lifetime access."}</p>
//                             <button
//                                 className={`w-full py-2 px-4 rounded-md font-semibold ${plan.isCurrent ? "bg-black text-white" : "bg-yellow-400 hover:bg-yellow-500"
//                                     }`}
//                             >
//                                 {plan.button}
//                             </button>

//                             <ul className="mt-6 space-y-3 text-sm">
//                                 {plan.features.map((feature) => (
//                                     <li key={feature} className="flex items-start gap-2">
//                                         <CheckCircle className="w-4 h-4 text-green-600 mt-[2px]" />
//                                         <span>{feature}</span>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     ))}
//                 </div>
//             </main>

//             <Footer />
//         </div>
//     );
// };

// export default Pricing;


// Pricing.jsx (Updated with Flip Card Design)
"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { CheckCircle } from "lucide-react";
import "../Pricing.css";
import { AuroraText } from "@/components/magicui/aurora-text";

const plans = [
    {
        name: "Freemium",
        price: "\u20B90",
        description: "Perfect for beginners starting their coding journey",
        button: "Current Plan",
        color: "bg-green-50",
        features: [
            "Access to 100+ coding problems",
            "Community sheets and challenges",
            "Basic Platform roadmaps",
            "Limited 1 month of AI discussion access",
            "Basic Progress tracking and analytics",
        ],
        isCurrent: true,
        prices: false,
        symbol: "⃣",
    },
    {
        name: "Pro",
        price: "\u20B92100",
        description: "For serious coders and job seekers aiming to excel",
        button: "Unlock Pro",
        color: "bg-yellow-50",
        features: [
            "Access to 500+ coding problems",
            "Premium Sheets and Challenges",
            "Personalized learning paths with AI",
            "Priority support",
            "Limited 6 months of AI discussion access",
            "Advanced Progress tracking and analytics",
        ],
        isCurrent: false,
        prices: true,
        symbol: "⃤",
    },
    {
        name: "Premium",
        price: "\u20B95100",
        description:
            "For the elite coders and tech enthusiasts and ready to dominate.",
        button: "Go Premium",
        color: "bg-yellow-100",
        features: [
            "Unlimited access to all coding problems",
            "Premium Sheets and Challenges",
            "Personalized learning paths with AI",
            "1:1 mentorship sessions",
            "Unlimited AI discussion access",
            "Advanced Progress tracking and analytics",
        ],
        isCurrent: false,
        prices: true,
        symbol: "〇",
    },
];

const Pricing = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white text-black">
            <Navbar />

            <div className="bg-yellow-400 text-center py-2 mt-20 font-semibold">
                {/* 🚨 LeetLabs is in Beta! Join now for lifetime access to new problems, roadmaps, and premium features. */}
            </div>

            <main className="py-16 px-4 max-w-6xl mx-auto mb-[40vh] text-center">
                <h1 className="text-4xl font-bold font-changa mb-4">
                    Unlock Your Coding Potential with <AuroraText className="italic">Codehunter</AuroraText>
                </h1>
                <p className="text-lg text-gray-700 mb-12">
                    No monthly charges, no hidden costs — just lifetime access to everything you need to master coding
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
                    {plans.map((plan) => (
                        <div key={plan.name} className="container group w-[350px] h-[520px] mx-auto">
                            <div className="P_card">

                                {/* FRONT SIDE */}
                                <div className="card_front h-80 w-52 flex items-center justify-center">
                                    {/* <h1 className="card-symbol text-white text-[8rem] font-cantata">{plan.symbol}</h1> */}
                                </div>

                                {/* BACK SIDE */}
                                <div className={`card_back  text-left`}>
                                    <div className={`absolute inset-0 ${plan.color} bg-opacity-70 mix-blend-multiply`}></div>
                                    <div className="relative z-10 p-6">

                                        <h2 className="text-4xl font-bold mb-2 font-aladin">{plan.name}</h2>
                                        <p className="text-sm font-changa text-gray-600 mb-4">
                                            {plan.description}
                                        </p>
                                        <p className="text-3xl font-extrabold mb-2">{plan.price}</p>
                                        <p className="text-xs mb-6 text-gray-600">
                                            {plan.prices
                                                ? "one-time payment plus GST"
                                                : "No Payment. Free Lifetime access."}
                                        </p>
                                        <button
                                            className={`w-full py-2 px-4 rounded-md font-semibold ${plan.isCurrent
                                                ? "bg-black text-white"
                                                : "bg-yellow-400 hover:bg-yellow-500"
                                                }`}
                                        >
                                            {plan.button}
                                        </button>

                                        <ul className="mt-6 space-y-3 text-sm">
                                            {plan.features.map((feature) => (
                                                <li key={feature} className="flex items-start gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-600 mt-[2px]" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                {/*  */}

                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Pricing;
