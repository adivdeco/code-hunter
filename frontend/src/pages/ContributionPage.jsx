import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import { FaPlusCircle, FaComments, FaFlask, FaPencilAlt, FaChevronRight } from 'react-icons/fa';
import { AuroraText } from '@/components/magicui/aurora-text';

// --- MOCK DATA FOR CONTRIBUTOR SHOWCASE ---
const topContributors = [
    { name: 'Nanshy😘', role: 'Legendary Problem Architect', avatar: '❤️‍🩹', contributions: 42 },
    { name: 'Adiv', role: 'Master Code Mentor', avatar: '😈', contributions: 310 },
    { name: 'Pyush', role: 'Elite Vanguard Tester', avatar: '💀', contributions: 78 },
];

// --- Sub-components for better structure ---

const RoleCard = ({ icon, title, description, ctaText, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: delay * 0.2 }}
            className="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-gray-800/80
                       hover:border-purple-500/60 hover:bg-purple-900/10 transition-all duration-300
                       flex flex-col h-full"
        >
            <div className="flex-grow">
                <div className="text-4xl text-cyan-400 mb-4">{icon}</div>
                <h3 className="text-2xl font-bold text-gray-100">{title}</h3>
                <p className="mt-2 text-gray-400 leading-relaxed">{description}</p>
            </div>
            <div className="mt-6">
                <button className="w-full flex items-center justify-center px-4 py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-500 transition-colors duration-300 group">
                    {ctaText}
                    <FaChevronRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
};

const ContributorProfile = ({ contributor, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: delay * 0.15, type: 'spring', stiffness: 100 }}
            className="flex flex-col items-center text-center p-4 bg-gray-900/40 rounded-lg"
        >
            <div className="text-5xl mb-3">{contributor.avatar}</div>
            <h4 className="font-bold text-white text-lg font-mono">{contributor.name}</h4>
            <p className="text-xs text-yellow-400">{contributor.role}</p>
            <p className="text-xs text-gray-400 mt-1">{contributor.contributions} Contributions</p>
        </motion.div>
    )
}

// --- MAIN PAGE COMPONENT ---
const ContributionPage = () => {

    const roles = [
        {
            icon: <FaPlusCircle />,
            title: "Problem Architect",
            description: "Design and build the next generation of coding challenges that will test the skills of thousands. Submit your unique problems and see them featured in contests.",
            ctaText: "Submit a Problem"
        },
        {
            icon: <FaComments />,
            title: "Code Mentor",
            description: "Guide fellow developers through complex topics. Answer questions in the discussion forums, share insights, and help cultivate a culture of learning and growth.",
            ctaText: "Go to Discuss"
        },
        {
            icon: <FaFlask />,
            title: "Vanguard Tester",
            description: "Be the first to experience new features. As a Vanguard Tester, you'll get early access, hunt for bugs, and provide critical feedback to shape the platform's future.",
            ctaText: "Join the Beta Program"
        },
        {
            icon: <FaPencilAlt />,
            title: "Content Evangelist",
            description: "Craft high-quality content that educates and inspires. Write problem editorials, algorithm tutorials, or blog posts to share your knowledge with the community.",
            ctaText: "Propose an Article"
        }
    ];

    return (
        <>
            <nav className='text-white'>
                <Navbar />
            </nav>

            <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-purple-950 text-white overflow-x-hidden pt-24 pb-20">
                <main className="max-w-7xl mb-[40vh] mx-auto px-4 sm:px-6 lg:px-8">
                    {/* --- Page Header --- */}
                    <motion.div
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                        className="text-center pt-12 pb-16"
                    >
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300">
                            Join the Vanguard
                        </h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-400">
                            <AuroraText className="text-3xl font-changa font-bold">CodeHunter</AuroraText> is built by the community, for the community. Your expertise can help us forge the future of competitive programming. Choose your assignment.
                        </p>
                    </motion.div>

                    {/* --- Contribution Roles Section --- */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {roles.map((role, index) => (
                            <RoleCard key={index} {...role} delay={index} />
                        ))}
                    </div>

                    {/* --- Contributor Showcase Section --- */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="mt-24 text-center"
                    >
                        <h2 className="text-3xl font-bold text-gray-200">Our Most Valuable Contributors</h2>
                        <div className="h-0.5 w-24 bg-purple-500 mx-auto mt-3 mb-10"></div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            {topContributors.map((contributor, index) => (
                                <ContributorProfile key={contributor.name} contributor={contributor} delay={index} />
                            ))}
                        </div>
                    </motion.div>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default ContributionPage;