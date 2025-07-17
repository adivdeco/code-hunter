
import { AuroraText } from "@/components/magicui/aurora-text";
import { Facebook, Github, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { FaDiscord, FaInstagram, FaYoutube, FaPhoneAlt, FaMailBulk, } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";


import { clsx } from "clsx";
import { href } from "react-router";

export default function Footer() {

    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / scrollTotal) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const socialLinks = [
        { icon: FaYoutube, color: "red-500", href: "#", label: "YouTube" },
        { icon: Facebook, color: "blue-600", href: "#", label: "Facebook" },
        { icon: Linkedin, color: "sky-500", href: "https://www.linkedin.com/in/adiv-singh-207233254/", label: "LinkedIn" },
        { icon: Twitter, color: "blue-400", href: "https://twitter.com/adivdeco", label: "Twitter" },
        { icon: Github, color: "gray-400", href: "https://github.com/adivdeco", label: "GitHub" },
        { icon: FaInstagram, color: "pink-700", href: "#", label: "Instagram" },
        { icon: FaDiscord, color: "blue-600", href: "#", label: "Discord" }
    ];

    const contactInfo = [
        { icon: FaMailBulk, color: "blue-500", text: "sadiv120@gmail.com" },
        { icon: FaPhoneAlt, color: "green-500", text: "+91-8409973038" },
        { icon: IoLocation, color: "yellow-500", text: "Pochanky Squard-House" }
    ];

    return (
        <footer className="relative bg-black text-white">
            {/* Parallax Animation Curtain */}
            <div className="absolute bottom-full left-0 h-[300px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://i.ibb.co/nQM4PGJ/arbres.png')] bg-repeat-x bg-bottom animate-parallax" style={{ animationDuration: '2000s' }} />
                <div className="absolute inset-0 bg-[url('https://i.ibb.co/J3TjC4W/second-plan.png')] bg-repeat-x bg-bottom animate-parallax" style={{ animationDuration: '2000s' }} />
                <div className="absolute inset-0 bg-[url('https://i.ibb.co/RQhDWbk/premierplanv3.png')] bg-repeat-x bg-bottom animate-parallax" style={{ animationDuration: '700s' }} />
                <div className="absolute bottom-[80px] left-1/2 -ml-[250px] h-[200px] w-[150px] bg-[url('https://i.ibb.co/JCGfFJd/moto-net.gif')] bg-no-repeat animate-moto" />
                <div className="absolute bottom-[10px] left-1/2 ml-[250px] h-[114px] w-[206px] bg-[url('https://i.ibb.co/0Qhp4DN/voiture-fumee.gif')] bg-no-repeat animate-voiture" />
            </div>

            {/* Footer Content */}
            {/* Main Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20">
                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 mb-16">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <AuroraText className="text-4xl font-bold font-rocksalt">
                            Code Hunter
                        </AuroraText>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Where logic meets ambition, and coders become champions — Crack
                            the toughest problems, climb the highest ranks, and launch your
                            journey with the CodeHunter community.
                        </p>

                        {/* Newsletter Subscription */}
                        <div className="mt-6">
                            <h4 className="text-sm uppercase tracking-wider mb-3 text-gray-400">Stay Updated</h4>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 bg-white/10 border border-white/20 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-r-lg font-medium hover:opacity-90 transition-opacity">
                                    Join
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h3 className="text-xl font-bold uppercase tracking-wider">Connect With Us</h3>
                        <ul className="space-y-3">
                            {socialLinks.map((item, index) => (
                                <motion.li
                                    key={index}
                                    whileHover={{ x: 5 }}
                                    className="flex items-center language-icon"
                                >
                                    <a
                                        href={item.href}
                                        className={`flex items-center gap-4 group text-gray-300 hover:text-${item.color} transition-colors`}
                                    >
                                        <item.icon className={`w-5 h-5 group-hover:scale-125 transition-transform group-hover:text-${item.color}`} />
                                        <span className="text-lg">{item.label}</span>
                                        <span className="flex-1 border-b border-dashed border-gray-600 group-hover:border-gray-400 mx-2"></span>
                                        <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h3 className="text-xl font-bold uppercase tracking-wider">Contact Info</h3>
                        <ul className="space-y-4">
                            {contactInfo.map((item, index) => (
                                <motion.li
                                    key={index}
                                    whileHover={{ x: 5 }}
                                    className="flex items-start gap-4 text-gray-300 language-icon"
                                >
                                    <item.icon className={`w-5 h-5 mt-1 flex-shrink-0 text-${item.color}`} />
                                    <span>{item.text}</span>
                                </motion.li>
                            ))}
                        </ul>

                        {/* Quick Links */}
                        <div className="mt-6">
                            <h4 className="text-sm uppercase tracking-wider mb-3 text-gray-400">Quick Links</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {['About', 'Problems', 'Leaderboard', 'Blog', 'Pricing', 'Contact'].map((item, index) => (
                                    <motion.a
                                        key={index}
                                        href="#"
                                        whileHover={{ scale: 1.05 }}
                                        className="text-gray-400 hover:text-white text-sm transition-colors"
                                    >
                                        {item}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Divider with Scroll Progress */}
                <div className="relative h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent my-10 overflow-visible">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-white"
                        style={{ width: `${scrollProgress}%` }}
                        initial={{ width: "0%" }}
                    />
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-gray-400 text-sm">
                        © 2025 <span className="font-bold text-white">CodeHunter</span>. All rights reserved.
                        Crafted by <a href="https://twitter.com/adivdeco" target="_blank" className="underline hover:text-blue-400">@adivdeco</a>
                    </div>

                    {/* Scroll to Top Button */}
                    <motion.button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="relative group"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        title="Back to top"
                    >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
                        <div className={cn(
                            "relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20",
                            "group-hover:bg-white/20 transition-all duration-300"
                        )}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-white"
                            >
                                <path d="M18 15l-6-6-6 6" />
                            </svg>
                        </div>
                    </motion.button>
                </div>
            </div>

        </footer >
    );
}
