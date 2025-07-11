import React, { useState, useEffect } from 'react';
import { ChevronLeft, Pause, Play, RotateCcw, Timer } from 'lucide-react'; // Ensure these icons are installed via lucide-react

const TimerComponent = () => {
    const [showTimer, setShowTimer] = useState(false); // Toggle view
    const [isRunning, setIsRunning] = useState(false); // Timer running state
    const [seconds, setSeconds] = useState(0); // Timer seconds

    // Timer logic
    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    // Format seconds to mm:ss
    const formatTime = (secs) => {
        const minutes = String(Math.floor(secs / 60)).padStart(2, '0');
        const remainingSeconds = String(secs % 60).padStart(2, '0');
        return `${minutes}:${remainingSeconds}`;
    };

    // Toggle timer running state
    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    // Reset timer
    const resetTimer = () => {
        setIsRunning(false);
        setSeconds(0);
    };

    return (
        <div className="">
            {!showTimer ? (
                // Initial button
                <button
                    onClick={() => setShowTimer(true)}
                    className="px-3 py-1 text-sm  rounded-md bg-yellow-200/20 text-yellow-300 border border-yellow-400/60 shadow-md backdrop-blur-sm"
                >
                    <Timer />
                </button>
            ) : (
                // Timer UI
                <div className="flex items-center justify-center gap-4 bg-[#1a1a1a] text-white px-4 py-2 rounded-md shadow-inner w-fit mx-auto">
                    {/* Back Button */}
                    <button onClick={() => setShowTimer(false)} className="hover:text-yellow-400">
                        <ChevronLeft />
                    </button>

                    {/* Timer */}
                    <div className="flex items-center gap-2 border-x border-gray-700 px-4 py-1">
                        <button onClick={toggleTimer}>
                            {isRunning ? <Pause size={18} /> : <Play size={18} />}
                        </button>
                        <span className="font-mono text-sm tracking-widest">
                            {formatTime(seconds)}
                        </span>
                    </div>

                    {/* Reset */}
                    <button onClick={resetTimer} className="hover:text-yellow-400">
                        <RotateCcw size={18} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default TimerComponent;
