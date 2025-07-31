

// import { useState, useRef, useEffect, useCallback } from 'react';
// import { Pause, Play, Volume2, Volume1, VolumeX, Maximize, Minimize, Loader2 } from 'lucide-react';

// // --- Helper: Format time from seconds to MM:SS ---
// const formatTime = (seconds) => {
//     if (isNaN(seconds) || seconds < 0) return '00:00';
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
// };

// // --- Main Player Component ---
// const EnhancedVideoPlayer = ({ secureUrl, thumbnailUrl, initialDuration }) => {
//     const videoRef = useRef(null);
//     const containerRef = useRef(null);
//     const controlsTimeoutRef = useRef(null);

//     const [isPlaying, setIsPlaying] = useState(false);
//     const [isMuted, setIsMuted] = useState(false);
//     const [volume, setVolume] = useState(1);
//     const [playbackState, setPlaybackState] = useState({
//         currentTime: 0,
//         duration: Number(initialDuration) || 0,
//         progress: 0,
//         buffered: 0,
//     });
//     const [isLoading, setIsLoading] = useState(true);
//     const [isHovering, setIsHovering] = useState(false);
//     const [isFullscreen, setIsFullscreen] = useState(false);

//     // --- Core Playback Controls ---
//     const togglePlay = useCallback(() => {
//         if (!videoRef.current) return;
//         videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
//         setIsPlaying(!videoRef.current.paused);
//     }, []);

//     // --- Event Handlers from Video Element ---
//     useEffect(() => {
//         const video = videoRef.current;
//         if (!video) return;

//         const handleTimeUpdate = () => {
//             setPlaybackState(prev => ({
//                 ...prev,
//                 currentTime: video.currentTime,
//                 progress: (video.currentTime / prev.duration) * 100
//             }));
//         };
//         const handleDurationChange = () => {
//             if (video.duration !== Infinity) {
//                 setPlaybackState(prev => ({ ...prev, duration: video.duration }));
//             }
//         };
//         const handleProgress = () => {
//             if (video.buffered.length > 0 && playbackState.duration > 0) {
//                 const bufferedEnd = video.buffered.end(video.buffered.length - 1);
//                 setPlaybackState(prev => ({ ...prev, buffered: (bufferedEnd / prev.duration) * 100 }));
//             }
//         };
//         const handleLoading = () => setIsLoading(true);
//         const handlePlaying = () => setIsLoading(false);
//         const handleEnded = () => setIsPlaying(false);
//         const handlePlayState = () => setIsPlaying(!video.paused);

//         video.addEventListener('timeupdate', handleTimeUpdate);
//         video.addEventListener('durationchange', handleDurationChange);
//         video.addEventListener('progress', handleProgress);
//         video.addEventListener('waiting', handleLoading);
//         video.addEventListener('playing', handlePlaying);
//         video.addEventListener('play', handlePlayState);
//         video.addEventListener('pause', handlePlayState);
//         video.addEventListener('ended', handleEnded);

//         return () => {
//             video.removeEventListener('timeupdate', handleTimeUpdate);
//             video.removeEventListener('durationchange', handleDurationChange);
//             video.removeEventListener('progress', handleProgress);
//             video.removeEventListener('waiting', handleLoading);
//             video.removeEventListener('playing', handlePlaying);
//             video.removeEventListener('play', handlePlayState);
//             video.removeEventListener('pause', handlePlayState);
//             video.removeEventListener('ended', handleEnded);
//         };
//     }, [playbackState.duration]);

//     // --- Volume & Mute Controls ---
//     const handleVolumeChange = (e) => {
//         const newVolume = parseFloat(e.target.value);
//         setVolume(newVolume);
//         setIsMuted(newVolume === 0);
//         if (videoRef.current) videoRef.current.volume = newVolume;
//     };
//     const toggleMute = () => {
//         const newMutedState = !isMuted;
//         setIsMuted(newMutedState);
//         if (videoRef.current) videoRef.current.muted = newMutedState;
//     };
//     const VolumeIcon = isMuted ? VolumeX : volume > 0.5 ? Volume2 : Volume1;

//     // --- Seeking ---
//     const handleSeek = (e) => {
//         if (!videoRef.current || !playbackState.duration) return;
//         const seekTime = (e.nativeEvent.offsetX / e.currentTarget.clientWidth) * playbackState.duration;
//         videoRef.current.currentTime = seekTime;
//     };
//     const handleSeekByInput = (e) => {
//         if (!videoRef.current || !playbackState.duration) return;
//         const seekTime = (parseFloat(e.target.value) / 100) * playbackState.duration;
//         videoRef.current.currentTime = seekTime;
//     };

//     // --- Fullscreen ---
//     const toggleFullscreen = useCallback(() => {
//         if (!containerRef.current) return;
//         if (!document.fullscreenElement) {
//             containerRef.current.requestFullscreen().catch(err => {
//                 console.error(`Error attempting to enable fullscreen: ${err.message} (${err.name})`);
//             });
//         } else {
//             document.exitFullscreen();
//         }
//     }, []);

//     useEffect(() => {
//         const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
//         document.addEventListener('fullscreenchange', handleFullscreenChange);
//         return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
//     }, []);


//     // --- Keyboard Shortcuts ---
//     useEffect(() => {
//         const handleKeyDown = (e) => {
//             if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
//             switch (e.code) {
//                 case 'Space':
//                     e.preventDefault();
//                     togglePlay();
//                     break;
//                 case 'KeyF':
//                     e.preventDefault();
//                     toggleFullscreen();
//                     break;
//                 case 'KeyM':
//                     e.preventDefault();
//                     toggleMute();
//                     break;
//                 case 'ArrowLeft':
//                     e.preventDefault();
//                     if (videoRef.current) videoRef.current.currentTime -= 5;
//                     break;
//                 case 'ArrowRight':
//                     e.preventDefault();
//                     if (videoRef.current) videoRef.current.currentTime += 5;
//                     break;
//             }
//         };
//         window.addEventListener('keydown', handleKeyDown);
//         return () => window.removeEventListener('keydown', handleKeyDown);
//     }, [togglePlay, toggleFullscreen]);

//     // --- Autohide Controls Logic ---
//     const handleActivity = () => {
//         setIsHovering(true);
//         if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
//         controlsTimeoutRef.current = setTimeout(() => {
//             setIsHovering(false);
//         }, 3000);
//     };

//     const shouldShowControls = !isPlaying || isHovering;

//     return (
//         <div
//             ref={containerRef}
//             className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-black group/player"
//             onMouseMove={handleActivity}
//             onMouseLeave={() => {
//                 if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
//                 setIsHovering(false);
//             }}
//         >
//             <video
//                 ref={videoRef}
//                 src={secureUrl}
//                 poster={thumbnailUrl}
//                 onClick={togglePlay}
//                 onLoadedData={() => setIsLoading(false)}
//                 className="w-full aspect-video cursor-pointer"
//             />

//             {/* --- Center Overlay: Loading / Play Button --- */}
//             <div
//                 className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none 
//                 ${isLoading ? 'bg-black/50 opacity-100' : 'bg-transparent opacity-0 group-hover/player:opacity-100'}`}
//             >
//                 {isLoading ? (
//                     <Loader2 className="w-16 h-16 text-white/80 animate-spin" />
//                 ) : !isPlaying && (
//                     <button
//                         onClick={togglePlay}
//                         className="p-4 bg-black/50 rounded-full backdrop-blur-sm pointer-events-auto
//                                    transform hover:scale-110 transition-transform duration-200"
//                         aria-label="Play"
//                     >
//                         <Play className="w-16 h-16 text-white" style={{ marginLeft: '0.5rem' }} />
//                     </button>
//                 )}
//             </div>

//             {/* --- Bottom Controls Bar --- */}
//             <div
//                 className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent 
//                 transition-opacity duration-300 p-4 ${shouldShowControls ? 'opacity-100' : 'opacity-0'}`}
//             >
//                 {/* Progress Bar */}
//                 <div className="relative w-full h-4 group/progress" onClick={handleSeek}>
//                     <div className="absolute w-full h-1.5 top-1/2 -translate-y-1/2 bg-white/20 rounded-full">
//                         <div style={{ width: `${playbackState.buffered}%` }} className="h-full bg-white/40 rounded-full"></div>
//                         <div style={{ width: `${playbackState.progress}%` }} className="absolute top-0 h-full bg-blue-500 rounded-full"></div>
//                     </div>
//                     <input
//                         type="range" min="0" max="100" value={playbackState.progress}
//                         onChange={handleSeekByInput}
//                         className="video-range absolute top-0 w-full h-full opacity-0"
//                     />
//                 </div>

//                 {/* Buttons and Time */}
//                 <div className="flex items-center justify-between mt-1 text-white">
//                     <div className="flex items-center gap-4">
//                         <button onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
//                             {isPlaying ? <Pause size={24} /> : <Play size={24} />}
//                         </button>

//                         <div className="flex items-center gap-2 group/volume">
//                             <button onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
//                                 <VolumeIcon size={24} />
//                             </button>

//                             <div className="w-0 group-hover/volume:w-20 transition-all duration-300">
//                                 <input
//                                     type="range" min="0" max="1" step="0.05"
//                                     value={volume} onChange={handleVolumeChange}
//                                     className="volume-slider w-full"
//                                 />
//                             </div>

//                         </div>
//                     </div>

//                     <div className="flex items-center gap-4">
//                         <span className="text-sm font-mono">
//                             {formatTime(playbackState.currentTime)} / {formatTime(playbackState.duration)}
//                         </span>
//                         <button onClick={toggleFullscreen} aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}>
//                             {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EnhancedVideoPlayer;






import { useState, useRef, useEffect, useCallback } from 'react';
import { Pause, Play, Volume2, Volume1, VolumeX, Maximize, Minimize, Loader2, Heart, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
// import { useSelect } from '@react-three/drei';
import { useSelector } from 'react-redux';
// import { useAuth } from "@/context/AuthContext";

// --- Helper: Format time from seconds to MM:SS ---
const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const Editorial = ({ secureUrl, thumbnailUrl, duration, videoId, likes, dislikes }) => {
    const { user } = useSelector((state) => state.auth);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes?.length || 0);
    const [dislikeCount, setDislikeCount] = useState(dislikes?.length || 0);

    useEffect(() => {
        if (user && likes?.includes(user._id)) {
            setIsLiked(true);
        }
        if (user && dislikes?.includes(user._id)) {
            setIsDisliked(true);
        }
    }, [user, likes, dislikes]);

    const handleLike = async () => {
        try {
            const response = await fetch(`https://code-hunter-backend.onrender.com/video/${videoId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setLikeCount(data.likes);
                setDislikeCount(data.dislikes);
                setIsLiked(!isLiked);
                if (isDisliked) setIsDisliked(false);
            }
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    const handleDislike = async () => {
        try {
            const response = await fetch(`https://code-hunter-backend.onrender.com/video/${videoId}/dislike`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setLikeCount(data.likes);
                setDislikeCount(data.dislikes);
                setIsDisliked(!isDisliked);
                if (isLiked) setIsLiked(false);
            }
        } catch (error) {
            console.error('Error toggling dislike:', error);
        }
    };

    return (
        <div className="w-full space-y-6">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/50 rounded-xl p-6 border border-gray-700 shadow-lg">
                <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                    Video Solution
                </h3>
                <EnhancedVideoPlayer
                    secureUrl={secureUrl}
                    thumbnailUrl={thumbnailUrl}
                    initialDuration={duration}
                />

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLike}
                            className={`flex items-center gap-2 ${isLiked ? 'text-red-500 hover:text-red-500' : 'text-gray-400 hover:text-white'}`}
                        >
                            <ThumbsUp className="w-5 h-5" />
                            <span>{likeCount}</span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleDislike}
                            className={`flex items-center gap-2 ${isDisliked ? 'text-blue-500 hover:text-blue-500' : 'text-gray-400 hover:text-white'}`}
                        >
                            <ThumbsDown className="w-5 h-5" />
                            <span>{dislikeCount}</span>
                        </Button>
                    </div>

                    <div className="text-sm text-gray-400">
                        {Number(duration / 100).toFixed(2)} min • {new Date().toLocaleDateString()}
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/50 rounded-xl p-6 border border-gray-700 shadow-lg">
                <h3 className="text-xl font-semibold mb-3 text-white">Written Explanation</h3>
                <div className="prose prose-invert max-w-none text-gray-300">
                    <p>This problem can be solved using a two-pointer approach that efficiently checks for the target sum by moving pointers based on the current sum comparison.</p>
                    <ul className="list-disc pl-5 space-y-2 mt-4">
                        <li>Initialize two pointers at the start and end of the sorted array</li>
                        <li>Calculate the sum of elements at these pointers</li>
                        <li>If sum equals target, return the indices</li>
                        <li>If sum is less than target, move left pointer right</li>
                        <li>If sum is greater than target, move right pointer left</li>
                    </ul>
                    <div className="mt-6 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <h4 className="text-sm font-semibold text-purple-300 mb-2">Time Complexity Analysis</h4>
                        <p className="text-sm">O(n) - We traverse the array at most once with the two pointers</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EnhancedVideoPlayer = ({ secureUrl, thumbnailUrl, initialDuration }) => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const controlsTimeoutRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.7);
    const [playbackState, setPlaybackState] = useState({
        currentTime: 0,
        duration: Number(initialDuration) || 0,
        progress: 0,
        buffered: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);

    // Core Playback Controls
    const togglePlay = useCallback(() => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play().catch(e => console.error("Playback failed:", e));
        } else {
            videoRef.current.pause();
        }
    }, []);

    // Event Handlers
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            setPlaybackState(prev => ({
                ...prev,
                currentTime: video.currentTime,
                progress: (video.currentTime / prev.duration) * 100
            }));
        };

        const handleDurationChange = () => {
            if (video.duration !== Infinity) {
                setPlaybackState(prev => ({ ...prev, duration: video.duration }));
            }
        };

        const handleProgress = () => {
            if (video.buffered.length > 0 && playbackState.duration > 0) {
                const bufferedEnd = video.buffered.end(video.buffered.length - 1);
                setPlaybackState(prev => ({ ...prev, buffered: (bufferedEnd / prev.duration) * 100 }));
            }
        };

        const handlePlayState = () => setIsPlaying(!video.paused);

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('durationchange', handleDurationChange);
        video.addEventListener('progress', handleProgress);
        video.addEventListener('play', handlePlayState);
        video.addEventListener('pause', handlePlayState);
        video.addEventListener('waiting', () => setIsLoading(true));
        video.addEventListener('playing', () => setIsLoading(false));
        video.addEventListener('ended', () => setIsPlaying(false));

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('durationchange', handleDurationChange);
            video.removeEventListener('progress', handleProgress);
            video.removeEventListener('play', handlePlayState);
            video.removeEventListener('pause', handlePlayState);
            video.removeEventListener('waiting', () => setIsLoading(true));
            video.removeEventListener('playing', () => setIsLoading(false));
            video.removeEventListener('ended', () => setIsPlaying(false));
        };
    }, [playbackState.duration]);

    // Volume Controls
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
        if (videoRef.current) videoRef.current.volume = newVolume;
    };

    const toggleMute = () => {
        const newMutedState = !isMuted;
        setIsMuted(newMutedState);
        if (videoRef.current) {
            videoRef.current.muted = newMutedState;
            if (!newMutedState && volume === 0) {
                setVolume(0.7);
                videoRef.current.volume = 0.7;
            }
        }
    };

    const VolumeIcon = isMuted ? VolumeX : volume > 0.5 ? Volume2 : Volume1;

    // Seeking
    const handleSeek = (e) => {
        if (!videoRef.current || !playbackState.duration) return;
        const seekTime = (e.nativeEvent.offsetX / e.currentTarget.clientWidth) * playbackState.duration;
        videoRef.current.currentTime = seekTime;
    };

    // Fullscreen
    const toggleFullscreen = useCallback(() => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(err => {
                console.error(`Fullscreen error: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            switch (e.code) {
                case 'Space':
                    e.preventDefault();
                    togglePlay();
                    break;
                case 'KeyF':
                    toggleFullscreen();
                    break;
                case 'KeyM':
                    toggleMute();
                    break;
                case 'ArrowLeft':
                    if (videoRef.current) videoRef.current.currentTime -= 5;
                    break;
                case 'ArrowRight':
                    if (videoRef.current) videoRef.current.currentTime += 5;
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [togglePlay, toggleFullscreen]);

    // Autohide Controls
    const handleActivity = () => {
        setIsHovering(true);
        clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = setTimeout(() => setIsHovering(false), 3000);
    };

    const shouldShowControls = !isPlaying || isHovering;

    return (
        <div
            ref={containerRef}
            className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-black group/player"
            onMouseMove={handleActivity}
            onMouseLeave={() => {
                clearTimeout(controlsTimeoutRef.current);
                setIsHovering(false);
                setShowVolumeSlider(false);
            }}
        >
            <video
                ref={videoRef}
                src={secureUrl}
                poster={thumbnailUrl}
                onClick={togglePlay}
                onDoubleClick={toggleFullscreen}
                onLoadedData={() => setIsLoading(false)}
                className="w-full aspect-video cursor-pointer"
                preload="metadata"
            />

            {/* Loading/Play Overlay */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none 
                ${isLoading ? 'bg-black/50 opacity-100' : 'bg-transparent opacity-0 group-hover/player:opacity-100'}`}>
                {isLoading ? (
                    <div className="p-3 bg-black/70 rounded-full backdrop-blur-sm">
                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                    </div>
                ) : !isPlaying && (
                    <button
                        onClick={togglePlay}
                        className="p-4 bg-black/60 rounded-full backdrop-blur-sm pointer-events-auto
                        transform hover:scale-110 transition-transform duration-200 shadow-lg"
                        aria-label="Play"
                    >
                        <Play className="w-12 h-12 text-white/90" strokeWidth={1.5} />
                    </button>
                )}
            </div>

            {/* Bottom Controls Bar */}
            <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent 
                transition-all duration-300 p-3 ${shouldShowControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>

                {/* Progress Bar */}
                <div className="relative w-full h-3 group/progress mb-2" onClick={handleSeek}>
                    <div className="absolute w-full h-1.5 top-1/2 -translate-y-1/2 bg-white/20 rounded-full overflow-hidden">
                        <div style={{ width: `${playbackState.buffered}%` }} className="h-full bg-white/30 absolute"></div>
                        <div style={{ width: `${playbackState.progress}%` }} className="h-full bg-gradient-to-r from-purple-500 to-pink-500 absolute rounded-full"></div>
                    </div>
                    <div
                        style={{ left: `${playbackState.progress}%` }}
                        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity"
                    ></div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={togglePlay}
                            className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                            {isPlaying ? (
                                <Pause className="w-5 h-5 text-white" />
                            ) : (
                                <Play className="w-5 h-5 text-white" />
                            )}
                        </button>

                        <div className="flex items-center relative">
                            <button
                                onClick={toggleMute}
                                onMouseEnter={() => setShowVolumeSlider(true)}
                                onMouseLeave={() => setShowVolumeSlider(false)}
                                className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                                aria-label={isMuted ? 'Unmute' : 'Mute'}
                            >
                                <VolumeIcon className="w-5 h-5 text-white" />
                            </button>

                            {showVolumeSlider && (
                                <div className="absolute bottom-full left-0 mb-3 px-2 py-1.5 bg-black/80 rounded-lg backdrop-blur-sm">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.05"
                                        value={isMuted ? 0 : volume}
                                        onChange={handleVolumeChange}
                                        className="volume-slider w-24 h-1.5 appearance-none bg-gradient-to-r from-gray-400 to-white rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="text-sm font-mono text-white/90">
                            {formatTime(playbackState.currentTime)} / {formatTime(playbackState.duration)}
                        </div>
                    </div>

                    <button
                        onClick={toggleFullscreen}
                        className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                        aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                    >
                        {isFullscreen ? (
                            <Minimize className="w-5 h-5 text-white" />
                        ) : (
                            <Maximize className="w-5 h-5 text-white" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Editorial;