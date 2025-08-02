// A nice SVG lock icon to use in our prompt. You can place this outside your component.
const LockIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3A5.25 5.25 0 0012 1.5zm-3.75 5.25v3a.75.75 0 001.5 0v-3a3.75 3.75 0 117.5 0v3a.75.75 0 001.5 0v-3A5.25 5.25 0 0012 1.5a5.25 5.25 0 00-5.25 5.25z" clipRule="evenodd" />
    </svg>
);


// Your main component's render part
<div className="flex-1 overflow-y-auto px-4 py-1 bg-[rgb(38,38,38)] w-full h-full">
    {problem && (
        <>
            {/* ============================= */}
            {/* ====== DESCRIPTION TAB ====== */}
            {/* ============================= */}
            {activeLeftTab === 'description' && (
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <h1 className="text-2xl font-bold text-gray-200 font-changa">{problem.title}</h1>
                        <div className={`badge badge-outline ${getDifficultyColor(problem.difficulty)}`}>
                            {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                        </div>
                        <div className="px-3 text-sm rounded-full bg-green-500/20 text-green-400 border border-green-400 shadow-md backdrop-blur-sm">
                            {problem.tags.charAt(0).toUpperCase() + problem.tags.slice(1)}
                        </div>
                    </div>
                    <div className="text-sm leading-relaxed font-medium space-y-2">
                        <pre className="whitespace-pre-wrap p-1 rounded-md text-gray-300 font-sans">
                            {problem.description}
                        </pre>
                    </div>
                    <div className="mt-14">
                        <div className="mb-16 text-gray-400">
                            {problem.visibleTestCases.map((example, index) => (
                                <div key={index} className="bg-base-200 p-4 rounded-lg mb-2">
                                    <h4 className="font-changa mb-2">Example {index + 1}:</h4>
                                    <div className="space-y-2 text-sm font-mono">
                                        <div><strong>Input:</strong> {example.input}</div>
                                        <div><strong>Output:</strong> {example.output}</div>
                                        <div><strong>Explanation:</strong> {example.explanation}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ========================== */}
            {/* ====== EDITORIAL TAB ====== */}
            {/* ========================== */}
            {activeLeftTab === 'editorial' && (
                // First, we check the tab. THEN we check if the user is a paid member.
                // This is much cleaner than nesting conditions inside the JSX.
                <>
                    {user?.isPaidUser ? (
                        // --- UI FOR PAID USERS ---
                        <div className="w-full text-white flex flex-col h-full">
                            <h2 className="text-xl font-bold mb-4">Video Solutions</h2>
                            {problem.videoSolutions?.length > 0 ? (
                                <div className="flex flex-col gap-y-6">
                                    {problem.videoSolutions.map((soln) => (
                                        <div
                                            key={soln._id}
                                            className="whitespace-pre-wrap text-sm leading-relaxed bg-gray-800/40 rounded-md border border-gray-700"
                                        >
                                            <Editorial
                                                secureUrl={soln.secureUrl}
                                                thumbnailUrl={soln.thumbnailUrl}
                                                duration={soln.duration}
                                                videoId={soln._id}
                                                likes={soln.likes}
                                                dislikes={soln.dislikes}
                                                description={soln.description}
                                                title={soln.title}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="whitespace-pre-wrap text-sm leading-relaxed bg-gray-800/40 p-4 rounded-md border border-gray-700">
                                    <p className="text-gray-400">No video solution available for this problem yet.</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        // --- UI FOR NON-PAID USERS (UPGRADE PROMPT) ---
                        <div className="w-full h-full relative">
                            {/* Blurred background content */}
                            <div className="w-full filter blur-md pointer-events-none">
                                <h2 className="text-xl font-bold mb-4 text-gray-500">Video Solutions</h2>
                                {/* Ghost element to represent a video */}
                                <div className="bg-gray-800/40 p-4 rounded-md border border-gray-700">
                                    <div className="w-full h-48 bg-gray-700/50 rounded-lg animate-pulse"></div>
                                    <div className="h-4 w-3/4 bg-gray-700/50 rounded mt-4 animate-pulse"></div>
                                    <div className="h-4 w-1/2 bg-gray-700/50 rounded mt-2 animate-pulse"></div>
                                </div>
                            </div>

                            {/* Foreground overlay with lock and CTA */}
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/30 rounded-lg text-center p-4">
                                <LockIcon className="w-16 h-16 text-yellow-400" />
                                <h3 className="text-2xl font-bold mt-4 text-white">Unlock Premium Content</h3>
                                <p className="text-gray-300 mt-2 max-w-sm">
                                    Subscribe to our Premium plan to access detailed video editorials for every problem.
                                </p>
                                <button
                                    // This should navigate to your subscription page
                                    onClick={() => console.log('Navigate to subscription page')}
                                    className="mt-6 bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
                                >
                                    Upgrade Now
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )}
</div>