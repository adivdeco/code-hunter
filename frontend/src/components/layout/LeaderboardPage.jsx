
import React, { useEffect, useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import { FaCrown, FaSpinner } from 'react-icons/fa';
import ReactCountryFlag from "react-country-flag";
import { AuroraText } from '../magicui/aurora-text';
import axiosClient from '@/utils/axiosClint';
import { useSelector } from 'react-redux';
import { fetchLeaderboard } from '@/leaderboardSlice';
import { useDispatch } from 'react-redux';

// --- Sub-components (No changes needed here, but included for completeness) ---

const PodiumCard = ({ user, rank }) => {
    const podiumStyles = {
        1: { border: 'border-yellow-400/80', shadow: 'shadow-yellow-400/20', crown: 'text-yellow-400' },
        2: { border: 'border-slate-300/80', shadow: 'shadow-slate-300/20', crown: 'text-slate-300' },
        3: { border: 'border-amber-700/80', shadow: 'shadow-amber-700/20', crown: 'text-amber-600' },
    };
    const style = podiumStyles[rank];

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 * rank }}
            className={`flex flex-col items-center bg-gray-900/40 backdrop-blur-md p-6 rounded-2xl border ${style.border} shadow-lg ${style.shadow} ${rank === 1 ? 'md:scale-110' : ''}`}
        >
            <div className={`text-5xl ${rank === 1 ? 'mb-4' : 'mb-2'} ${style.crown}`}><FaCrown /></div>
            <div className="text-6xl mb-2">{user.avatar || '🧑‍💻'}</div>
            <h3 className="text-xl font-bold text-white font-mono">{user.name}</h3>
            <p className="text-sm text-gray-400">Score: <span className="font-bold text-gray-200">{user.score}</span></p>
        </motion.div>
    );
};

const LeaderboardRow = ({ user, isCurrentUser }) => {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring" } },
    };

    return (
        <motion.div
            variants={itemVariants}
            className={`flex items-center p-3 px-5 rounded-lg transition-all duration-300 ${isCurrentUser
                ? 'bg-purple-600/30 border-2 border-purple-500'
                : 'bg-black/20 hover:bg-purple-900/30'
                }`}
        >
            <div className="w-12 text-center text-xl font-bold text-gray-400">{user.rank}</div>
            <div className="flex-1 flex items-center ml-4">
                <div className="text-3xl mr-4">{user.avatar || '🧑‍💻'}</div>
                <div>
                    <span className="font-bold text-lg text-white">{user.name}</span>
                    <div className="flex items-center text-sm text-gray-400">
                        {user.country && <ReactCountryFlag countryCode={user.country} svg style={{ width: '1em', height: '1em' }} className="mr-1.5" />}
                        <span>Solved: {user.solved}</span>
                    </div>
                </div>
            </div>
            <div className="w-24 text-right font-mono text-xl text-cyan-300">{user.score}</div>
        </motion.div>
    );
};

const MyRankBanner = ({ user }) => {
    if (!user) return null;
    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 1 }}
            className="fixed bottom-0 left-0 right-0 z-40"
        >
            <div className="max-w-4xl mx-auto">
                <div className="m-4 bg-purple-900/50 backdrop-blur-xl border border-purple-500/50 rounded-xl shadow-2xl shadow-purple-900/50">
                    <LeaderboardRow user={user} isCurrentUser={true} />
                </div>
            </div>
        </motion.div>
    );
}

// --- MAIN PAGE COMPONENT ---
const LeaderboardPage = () => {
    const dispatch = useDispatch();
    const { user: loggedInUser } = useSelector((state) => state.auth);

    const leaderboard = useSelector((state) => state.leaderboard.data);

    const leaderboardStatus = useSelector((state) => state.leaderboard.status);


    // Fetch data on component mount if it hasn't been fetched yet
    useEffect(() => {
        if (leaderboardStatus === 'idle') {
            dispatch(fetchLeaderboard());
        }
    }, [leaderboardStatus, dispatch]);


    // useMemo derivations are now based on Redux state
    const topThree = useMemo(() => leaderboard.slice(0, 3), [leaderboard]);
    const restOfLeaderboard = useMemo(() => leaderboard.slice(3), [leaderboard]);
    const currentUserData = useMemo(
        () => leaderboard.find(u => u._id === loggedInUser?._id),
        [leaderboard, loggedInUser]
    );

    const isLoading = leaderboardStatus === 'loading' || leaderboardStatus === 'idle';



    // // State to hold the final, processed leaderboard data
    // const [leaderboard, setLeaderboard] = useState([]);
    // // State to manage loading UI
    // const [isLoading, setIsLoading] = useState(true);
    // // Get the currently logged-in user from Redux state
    // const { user: loggedInUser } = useSelector((state) => state.auth);

    // useEffect(() => {
    //     const fetchAndProcessLeaderboard = async () => {
    //         setIsLoading(true);
    //         try {
    //             const res = await axiosClient.get('/auth/alluser');
    //             const rawUsers = res.data.alluser;

    //             // --- 1. DATA TRANSFORMATION & SCORING ---
    //             // First, map over the raw user data to create a new array with calculated scores.
    //             // problemSolved.length gives the count of solved problems.
    //             const usersWithScore = rawUsers.map(u => ({
    //                 ...u, // Keep all original user data (_id, name, country, etc.)
    //                 solved: u.problemSolved.length,
    //                 score: u.problemSolved.length * 17 // The core scoring logic
    //             }));

    //             // --- 2. SORTING ---
    //             // Sort the new array in descending order based on the calculated score.
    //             // If scores are equal, they will maintain their relative order.
    //             usersWithScore.sort((a, b) => b.score - a.score);

    //             // --- 3. RANKING ---
    //             // Now that the array is sorted, map over it one more time to assign a rank.
    //             const finalLeaderboard = usersWithScore.map((u, index) => ({
    //                 ...u,
    //                 rank: index + 1 // Rank is the index + 1
    //             }));

    //             setLeaderboard(finalLeaderboard);
    //             // console.log(finalLeaderboard);


    //         } catch (err) {
    //             console.error("Failed to fetch leaderboard data:", err);
    //             // Handle error state if needed
    //         } finally {
    //             setIsLoading(false); // Stop loading, whether successful or failed
    //         }
    //     };
    //     fetchAndProcessLeaderboard();
    // }, []); // Empty dependency array means this runs once on component mount

    // // --- useMemo for Performance ---
    // // These values are derived from 'leaderboard' state.
    // // useMemo ensures they are only re-calculated when 'leaderboard' changes, not on every render.
    // const topThree = useMemo(() => leaderboard.slice(0, 3), [leaderboard]);
    // const restOfLeaderboard = useMemo(() => leaderboard.slice(3), [leaderboard]);
    // const currentUserData = useMemo(
    //     () => leaderboard.find(u => u._id === loggedInUser?._id),
    //     [leaderboard, loggedInUser]
    // );

    // Animation container for staggering list items
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.3 }
        }
    };

    return (
        <div className='bg-gradient-to-br from-black via-gray-950 to-purple-950'>
            <nav className='text-white'>
                <Navbar />
            </nav>

            <div className="min-h-screen mb-[45vh]  text-white overflow-x-hidden pt-24 pb-32">
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                        className="text-center py-12"
                    >
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300">
                            Global <AuroraText className="font-changa italic text-7xl ">Rankings</AuroraText>
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-lg font-changa text-gray-400">
                            Where legends are forged. See how you stack up against the best in the world.
                        </p>
                    </motion.div>

                    {/* --- Conditional Rendering for Loading/Empty State --- */}
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <FaSpinner className="animate-spin text-purple-400 text-5xl" />
                        </div>
                    ) : leaderboard.length > 0 ? (
                        <>
                            {/* --- Podium Section (only shows if there are enough users) --- */}
                            {topThree.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end mb-16">
                                    {/* Handle cases with 1 or 2 users gracefully */}
                                    {topThree[1] && <PodiumCard user={topThree[1]} rank={2} />}
                                    {topThree[0] && <PodiumCard user={topThree[0]} rank={1} />}
                                    {topThree[2] && <PodiumCard user={topThree[2]} rank={3} />}
                                </div>
                            )}

                            {/* --- Main Leaderboard List --- */}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="space-y-3"
                            >
                                {restOfLeaderboard.map(user => (
                                    <LeaderboardRow key={user._id} user={user} isCurrentUser={user._id === loggedInUser?._id} />
                                ))}
                            </motion.div>
                        </>
                    ) : (
                        <div className="text-center text-gray-500 py-16">
                            <p className="text-2xl">The Arena is Quiet...</p>
                            <p>No rankings available yet. Be the first to solve a problem!</p>
                        </div>
                    )}
                </main>
            </div>
            {/* MyRankBanner will only show if the current user is found in the leaderboard */}
            <MyRankBanner user={currentUserData} />
            <Footer />
        </div>
    );
};

export default LeaderboardPage;