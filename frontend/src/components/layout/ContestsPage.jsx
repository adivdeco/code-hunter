import React, { useState, useMemo } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegClock, FaUsers, FaTrophy, FaCodeBranch, FaCheckCircle, FaGift } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';
import { useCountdown } from '@/hooks/useCountdown';



// --- MOCK DATA ---
const contests = [
    { id: 1, title: 'Galactic Coding Showdown', status: 'Upcoming', startsIn: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), participants: 1250, prize: 'Galactic Trophy & $5000' },
    { id: 2, title: 'Starlight Algorithm Challenge', status: 'Upcoming', startsIn: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), participants: 880, prize: '$2000' },
    { id: 7, title: 'Re-Imagine leetcode website', status: 'Upcoming', startsIn: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), participants: 125, prize: 'MacBook & Meet-UP with Rohit-neggi' },
    { id: 3, title: 'Quantum Rift - Weekly 404', status: 'Live', endsIn: '1h 15m', participants: 4300, problems: 4 },
    { id: 4, title: 'Void Breaker Bi-Weekly 21', status: 'Ended', prize: 'jaan le lo aap', winner: 'Nanshy❤️‍🩹', participants: 6500 },
    { id: 5, title: 'Leetcode Clone', status: 'Ended', winner: 'ADIV😈', prize: 'MacBook & Meet-UP with Rohit-neggi', participants: 9800 },
    { id: 6, title: 'Cosmic Drift - Weekly 403', status: 'Ended', prize: ' Tajmahal', winner: 'JET🤦🏻‍♂️', participants: 3900 },
];


// --- Countdown Timer Sub-component ---
const CountdownTimer = ({ targetDate }) => {
    const { days, hours, minutes, seconds, isFinished } = useCountdown(targetDate);
    if (isFinished) {
        return <div className="text-emerald-400 font-bold">Starting now!</div>
    }
    return (
        <div className="flex space-x-3 text-center">
            <div><span className="text-2xl font-bold">{days}</span><span className="text-xs text-gray-400 block">Days</span></div>
            <div><span className="text-2xl font-bold">{hours}</span><span className="text-xs text-gray-400 block">Hrs</span></div>
            <div><span className="text-2xl font-bold">{minutes}</span><span className="text-xs text-gray-400 block">Mins</span></div>
            <div><span className="text-2xl font-bold">{seconds}</span><span className="text-xs text-gray-400 block">Secs</span></div>
        </div>
    );
};


// --- Contest Card Sub-component ---
const ContestCard = ({ contest, isRegistered, onRegister }) => {
    const statusColor = {
        Upcoming: 'border-cyan-400/50',
        Live: 'border-green-400/50',
        Ended: 'border-gray-600/50',
    };

    const statusBg = {
        Upcoming: 'bg-cyan-400/10 text-cyan-300',
        Live: 'bg-green-400/10 text-green-300',
        Ended: 'bg-gray-600/10 text-gray-400',
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.5, type: "spring" }}
            className={`bg-black/20 backdrop-blur-md rounded-xl p-6 border ${statusColor[contest.status]}
                       hover:bg-purple-900/40 hover:border-purple-500 transition-all duration-300 group`}
        >
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-100 group-hover:text-white">{contest.title}</h3>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusBg[contest.status]}`}>{contest.status}</span>
            </div>

            <div className="mt-4 text-gray-400 space-y-4">
                {contest.status === 'Upcoming' && (
                    <div>
                        <div className="flex items-center text-sm mb-2"><FaRegClock className="mr-2 text-purple-400" /> Starts in:</div>
                        <CountdownTimer targetDate={contest.startsIn} />
                        <div className="flex items-center gap-2 mt-3 text-sm mb-2"><FaTrophy className=" text-yellow-400" /> {contest.prize}</div>
                    </div>
                )}
                {contest.status === 'Live' && (
                    <p className="flex items-center text-sm"><FaCodeBranch className="mr-2 text-green-400" /> {contest.problems} Problems | Time Remaining: {contest.endsIn}</p>
                )}
                {contest.status === 'Ended' && (
                    <>
                        <p className="flex items-center text-sm"><FaTrophy className="mr-2 text-yellow-400" /> Winner: <span className="font-mono text-purple-300 ml-1">{contest.winner}</span></p>
                        <div className="flex items-center gap-2 mt-3 text-sm mb-2"><FaGift className=" text-blue-400" /> {contest?.prize}</div>
                    </>
                )}

                <div className="flex justify-between items-end pt-4 border-t border-gray-800/50">
                    <div className="flex items-center text-sm">
                        <FaUsers className="mr-2" /> {contest.participants.toLocaleString()} Participants
                    </div>
                    <div>
                        {contest.status === 'Upcoming' && (
                            <button
                                onClick={() => onRegister(contest.id, contest.title)}
                                disabled={isRegistered}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 w-28 ${isRegistered
                                    ? 'bg-green-600 text-white/90 cursor-not-allowed'
                                    : 'bg-purple-600 hover:bg-purple-500 text-white'
                                    }`}
                            >
                                {isRegistered && <FaCheckCircle />}
                                {isRegistered ? 'Registered' : 'Register'}
                            </button>
                        )}
                        {contest.status === 'Live' && (
                            <button className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 bg-green-600 hover:bg-green-500 text-white">
                                Join Contest
                            </button>
                        )}
                        {contest.status === 'Ended' && (
                            <button className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 bg-gray-700 hover:bg-gray-600 text-gray-200">
                                View Standings
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};


// --- The Main Page Component ---
export default function ContestsPage() {
    const [activeTab, setActiveTab] = useState('Upcoming');
    const [registeredContests, setRegisteredContests] = useState(new Set());
    const tabs = ['Upcoming', 'Live', 'Ended'];

    const filteredContests = useMemo(
        () => contests.filter(c => c.status === activeTab),
        [activeTab]
    );

    const handleRegister = (contestId, contestTitle) => {
        if (registeredContests.has(contestId)) return;
        setRegisteredContests(prevSet => new Set(prevSet).add(contestId));
        toast.success(`Registered for ${contestTitle}!`, {
            duration: 4000,
            position: 'top-center',
            icon: '🚀',
            style: {
                background: '#1a1a2e',
                color: '#e0e0e0',
                border: '1px solid #4a4a7f',
            },
        });
    };

    return (
        <>
            <Toaster />
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-purple-950 text-white overflow-x-hidden">
                <nav className='text-white fixed top-0 w-full z-50'>
                    <Navbar />
                </nav>
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                    <motion.div
                        initial={{ opacity: 0, y: -40, x: 40 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                        className="text-center py-12"
                    >
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300">
                            Contest Arena
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                            Test your skills, climb the ranks, and achieve greatness. The next challenge awaits.
                        </p>
                    </motion.div>
                    <div className="flex justify-center mb-10">
                        <div className="flex space-x-2 bg-black/20 p-2 rounded-xl border border-gray-800">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`${activeTab === tab ? '' : 'hover:bg-white/5'
                                        } relative rounded-lg px-6 py-2 text-sm font-medium text-white transition-colors duration-300`}
                                >
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="bubble"
                                            className="absolute inset-0 bg-purple-600"
                                            style={{ borderRadius: 8 }}
                                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{tab}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredContests.map(contest => (
                                <ContestCard
                                    key={contest.id}
                                    contest={contest}
                                    isRegistered={registeredContests.has(contest.id)}
                                    onRegister={handleRegister}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-24 text-center p-8 bg-black/10 backdrop-blur-sm border-dashed border-2 border-purple-800/40 rounded-xl"
                    >
                        <h2 className="text-3xl font-bold text-gray-200">More Features Incoming!</h2>
                        <p className="mt-2 text-gray-400 max-w-lg mx-auto">Our dev-squad is working around the clock to bring you new and exciting contest formats.</p>
                        <div className="mt-6 flex justify-center space-x-6 text-purple-400">
                            <div className="flex flex-col items-center">
                                <FaUsers className="h-8 w-8 text-blue-400" />
                                <span className="text-sm mt-2 text-gray-300">Team Contests</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <FaCodeBranch className="h-8 w-8 text-green-400" />
                                <span className="text-sm mt-2 text-gray-300">Custom Contests</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <FaTrophy className="h-8 w-8 text-yellow-400" />
                                <span className="text-sm mt-2 text-gray-300">Global Leaderboards</span>
                            </div>
                        </div>
                        <p className="mt-6 text-sm text-gray-500 font-mono">Status: IN_PROGRESS // ETA: SOON™</p>
                    </motion.div>
                </main>
                <div className="mt-[40vh]">
                    <Footer />
                </div>
            </div>
        </>
    );
}