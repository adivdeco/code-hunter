import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Sparkles } from "lucide-react";

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

export default function FAQSection() {
    const [expandedItem, setExpandedItem] = useState(null);

    return (
        <section className="relative w-full py-20 overflow-hidden bg-white">
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

            {/* FAQ Animation */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
                className={cn(
                    "relative flex flex-col overflow-hidden mt-16 px-4 mx-auto max-w-5xl"
                )}
            >
                <Accordion
                    type="single"
                    collapsible
                    value={expandedItem}
                    onValueChange={setExpandedItem}
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
                            <AccordionItem
                                value={item.id}
                                className={cn(
                                    "rounded-2xl border overflow-hidden bg-gradient-to-br",
                                    item.gradient,
                                    expandedItem === item.id ? "shadow-lg" : "shadow-md"
                                )}
                            >
                                <AccordionTrigger className="font-changa text-2xl p-6 hover:no-underline">
                                    <div className="flex items-center gap-4">
                                        <span
                                            className="flex items-center justify-center w-10 h-10 rounded-full text-xl"
                                            style={{ backgroundColor: `${item.color}20`, color: item.color }}
                                        >
                                            {item.icon}
                                        </span>
                                        <span>{item.name}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="font-changa text-lg px-6 pb-6 pt-2">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="border-t border-gray-200 pt-4"
                                    >
                                        {item.description}
                                    </motion.div>
                                </AccordionContent>
                            </AccordionItem>
                        </motion.div>
                    ))}
                </Accordion>

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
                    <button className="px-8 py-3 bg-gradient-to-r font-changa from-purple-600 to-blue-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
                        Contact Our Support Team
                    </button>
                </motion.div>
            </motion.div>

            <style jsx>{`
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