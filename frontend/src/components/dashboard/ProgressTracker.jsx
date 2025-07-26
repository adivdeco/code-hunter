import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import axiosClient from '@/utils/axiosClint';

/**
 * A helper function to select 3 deterministic "daily" problems from the FULL list.
 * This ensures every user sees the same 3 problems on any given day.
 * @param {Array} allProblems - The full list of problems from the API.
 * @returns {Array} - An array of 3 problem objects for the current day.
 */
const getDailyProblems = (allProblems) => {
    if (!allProblems || allProblems.length === 0) {
        return [];
    }
    // This logic ensures the problems change once per day, but are the same for all users.
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const totalProblems = allProblems.length;

    const startIndex = (dayOfYear * 3) % totalProblems;

    const dailyProblems = [];
    for (let i = 0; i < Math.min(3, totalProblems); i++) {
        const problemIndex = (startIndex + i) % totalProblems;
        dailyProblems.push(allProblems[problemIndex]);
    }
    return dailyProblems;
};




export default function ProgressTracker() {
    const [dailyProblems, setDailyProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('Loading challenges...');

    const { user } = useSelector((state) => state.auth);

    // useMemo creates a Set of solved problem IDs. It will update whenever the user's solved list changes.
    // This is what makes the green dot appear instantly when a problem is solved.
    const solvedProblemIds = useMemo(() => {
        return new Set((user?.problemSolved || []).map(p => p._id));
    }, [user]);

    // This useEffect hook fetches the list of problems ONCE and sets the daily challenges.
    // It does not depend on the user, so the list of problems won't change when a user logs in or solves a problem.
    useEffect(() => {
        const fetchAndSetDailyProblems = async () => {
            try {
                setLoading(true);
                const { data } = await axiosClient.get('/problem/allProblems');
                const allProblems = data?.allproblem || [];

                if (allProblems.length === 0) {
                    setMessage("No problems found.");
                    setDailyProblems([]);
                    return;
                }

                // Get the daily problems from the ENTIRE list.
                const problemsForToday = getDailyProblems(allProblems);
                setDailyProblems(problemsForToday);

            } catch (error) {
                console.error("Failed to fetch problems:", error);
                setMessage('Could not load challenges.');
            } finally {
                setLoading(false);
            }
        };

        fetchAndSetDailyProblems();
    }, []); // Empty dependency array [] means this runs ONLY ONCE when the component mounts.

    const capitalize = (s = '') => (s && typeof s === 'string' && s.charAt(0).toUpperCase() + s.slice(1)) || '';

    const getDifficultyBadgeColor = useMemo(() => {
        return (difficulty) => {
            switch ((difficulty || '').toLowerCase()) {
                case 'easy':
                    return 'bg-green-500/30 text-green-400 border-green-400';
                case 'medium':
                    return 'bg-yellow-200/20 text-yellow-300 border-yellow-400';
                case 'hard':
                    return 'bg-red-500/30 text-red-400 border-red-500';
                default:
                    return 'bg-gray-600/10 text-gray-300 border-gray-500';
            }
        };
    }, []);

    return (
        <div className="bg-gradient-to-br  from-black via-gray-950 to-purple-950 rounded-2xl p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-medium font-chango text-white/70">Daily Challenges</h3>
            </div>

            <div className="space-y-2 ">
                {loading ? (
                    <p className="text-gray-400 text-center py-4">{message}</p>
                ) : dailyProblems.length === 0 ? (
                    <p className="text-gray-400 text-center py-4">{message || 'No challenges for today.'}</p>
                ) : (
                    dailyProblems.map((problem, i) => {
                        // THE KEY LOGIC: For each daily problem, we check if its ID is in our reactive `solvedProblemIds` Set.
                        // This `isSolved` value will be up-to-date even though the list of problems is static for the day.
                        const isSolved = solvedProblemIds.has(problem._id);

                        return (
                            <NavLink key={problem._id} to={`/problem/${problem._id}`}>
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex mt-2 border items-center  p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                                >
                                    {/* The dot's color is now correctly and dynamically set based on the `isSolved` status */}
                                    <div
                                        className={`h-3 w-3 rounded-full mr-4 flex-shrink-0 ${isSolved ? 'bg-green-500' : 'bg-red-500'
                                            }`}
                                    />
                                    <div className="w-full ">
                                        <p className="text-white/60  font-medium transition-colors">
                                            {problem.title}
                                        </p>
                                        <div className="flex justify-between items-center mt-1">
                                            <p className="px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                                                {problem?.tags}
                                            </p>
                                            <p className={`text-sm px-2 rounded-lg  ${getDifficultyBadgeColor(problem.difficulty)}`}>
                                                {problem.difficulty}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </NavLink>
                        );
                    })
                )}
            </div>
        </div>
    );
}                   