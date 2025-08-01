

import { Suspense, useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Crown } from 'lucide-react';
import { ErrorBoundary } from './ErrorBoundary'; // Assuming this file exists and is correct
import { CalendarDateRangeIcon } from '@heroicons/react/24/outline';
import { SiCounterstrike } from "react-icons/si";
import { FaFortAwesome, FaFortAwesomeAlt } from "react-icons/fa6";
import { GoGoal } from "react-icons/go";
import { useDashboardData } from "@/contexts/DashboardDataContext"
import { DatasetController } from 'chart.js';



export default function ProfileCard({ user, rank }) {
    // --- STATE FOR ROBUST TWO-STAGE RENDERING ---
    const [isCardAnimationComplete, setCardAnimationComplete] = useState(false);
    const avatarUrl = user?.avatar || '';

    // --usecontest wala code
    const { submissions, loading, error } = useDashboardData();
    const [strike, setStrike] = useState([])

    // console.log(submissions);
    useEffect(() => {


        if (!Array.isArray(submissions)) return;
        const dateCounts = {}

        submissions.forEach(submission => {
            const date = new Date(submission.createdAt).toISOString().split('T')[0]
            if (!dateCounts[date]) {
                dateCounts[date] = 0
            }
            dateCounts[date]++
            // console.log(dateCounts);
            // console.log(dateCounts.length);
            const processData = Object.entries(dateCounts)
                .map(([date, value]) => ({
                    date,
                    value: Number(value)
                }))
                .sort((a, b) => new Date(a.date) - new Date(b.date))
            setStrike(processData.length)
            // console.log(processData.length);

        })


    }, [submissions]);

    console.log(strike);

    // --- HOOKS, CALLED CORRECTLY AT THE TOP LEVEL OF THE COMPONENT ---
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // --- ANIMATION VARIANTS ---
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 15, stiffness: 100, staggerChildren: 0.2 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    function handleMouseMove({ clientX, clientY }) {
        if (!cardRef.current) return;
        const { left, top } = cardRef.current.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    function handleMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            onAnimationComplete={() => setCardAnimationComplete(true)}
            className="profile-card"
        >
            <motion.div
                className="absolute inset-0 z-0"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([newX, newY]) => newX && newY ? `radial-gradient(circle at ${newX}px ${newY}px, rgba(167, 139, 250, 0.3) 0%, transparent 50%)` : 'transparent'
                    )
                }}
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gradient-to-br from-indigo-900 via-purple-950 to-gray-900 rounded-2xl p-6 shadow-2xl"
            >
                <div className="flex items-center  space-x-6">
                    {/* logo */}

                    <div className="h-20 w-20 rounded-xl  ">


                        <div className="h-full font-aladin w-full rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium text-3xl border-4 border-white/20 shadow-md">

                            {avatarUrl ? (
                                <img
                                    src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user.avatar}`}
                                    alt={`${user.name}'s avatar`}
                                    className="h-full w-full  rounded-full object-cover border shadow-md"
                                />
                            ) : (
                                <div className="h-full font-aladin w-full rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium border-4 border-white/20 shadow-md">
                                    {firstInitial}
                                </div>
                            )}

                        </div>
                    </div>
                    {/*info */}
                    <div>
                        <h2 className="text-2xl  font-bold font-rocksalt text-white">{user?.name}</h2>
                        <h3 className="text-md text-white">{user?.email}</h3>

                        <div className="flex items-center mt-4">
                            <motion.div variants={itemVariants} className="mt-2 gap-2 flex items-center">
                                {user?.isPaidUser ? (
                                    <span className="inline-flex items-center px-3 py-1 font-changa rounded-full text-sm font-medium  bg-yellow-400/20 text-yellow-400">
                                        <Crown className=" h-4 w-4 mr-1" /> Pro Member
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-gray-300">
                                        Free Tier
                                    </span>
                                )}
                                <span className="inline-flex items-center px-3 py-1 font-changa  rounded-full text-sm font-medium bg-purple-600/60 text-yellow-400">
                                    🚀 Rank #{rank || "N/A"}
                                </span>
                            </motion.div>

                        </div>
                        {/* <motion.div variants={itemVariants} className="mt-5">
                            
                        </motion.div> */}

                    </div>


                </div>



                {/* </div> */}

                <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Member Since Box */}
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm flex items-center">
                        <div className="mr-4 p-2 bg-blue-600/30 rounded-lg">
                            <CalendarDateRangeIcon className="w-6 h-6  text-blue-500" />
                        </div>
                        <div>
                            <p className="text-white/70 text-sm mb-1">Member Since</p>
                            <p className="text-white font-medium text-lg">
                                {new Date(user?.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    {/* Current Streak Box */}
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm flex items-center">
                        <div className="mr-4 p-2 bg-orange-600/30 rounded-lg">
                            <SiCounterstrike className="w-6 h-6 language-icon text-orange-400" />
                        </div>
                        <div>
                            <p className="text-white/70 text-sm mb-1">Current Streak</p>
                            <div className="flex items-center gap-2">
                                <span className="text-yellow-400">🔥</span>
                                <p className="text-white font-medium text-lg">{strike} days</p>
                            </div>
                        </div>
                    </div>

                    {/* Problems Solved Box */}
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm flex items-center">
                        <div className="mr-4 p-2 bg-yellow-600/30 rounded-lg">
                            <FaFortAwesome className="w-6 h-6 language-icon  text-yellow-500" />
                        </div>
                        <div>
                            <p className="text-white/70 text-sm mb-1">Problems Solved</p>
                            <p className="text-white font-medium text-lg">{user?.problemSolved?.length || 7}</p>
                        </div>
                    </div>

                    {/* Growth Box */}
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm flex items-center">
                        <div className="mr-4 p-2 bg-green-600/30 rounded-lg">
                            <GoGoal className="w-6 h-6 language-icon text-green-500 " />
                        </div>
                        <div>
                            <p className="text-white/70 text-sm mb-1">Growth</p>
                            <p className="text-white font-medium text-lg">{user?.Growth || "100%"}</p>
                        </div>
                    </div>
                </div>
            </motion.div>


        </motion.div >

    );
}

