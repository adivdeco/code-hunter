// import { useState, useRef, useEffect } from 'react';
// import { Pause, Play } from 'lucide-react';



// const Editorial = ({ secureUrl, thumbnailUrl, duration }) => {


//     const videoRef = useRef(null);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [currentTime, setCurrentTime] = useState(0);
//     const [isHovering, setIsHovering] = useState(false);

//     // Format seconds to MM:SS
//     const formatTime = (seconds) => {
//         const mins = Math.floor(seconds / 60);
//         const secs = Math.floor(seconds % 60);
//         return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//     };

//     const togglePlayPause = () => {
//         if (videoRef.current) {
//             if (isPlaying) {
//                 videoRef.current.pause();
//             } else {
//                 videoRef.current.play();
//             }
//             setIsPlaying(!isPlaying);
//         }
//     };

//     // Update current time during playback
//     useEffect(() => {
//         const video = videoRef.current;

//         const handleTimeUpdate = () => {
//             if (video) setCurrentTime(video.currentTime);
//         };

//         if (video) {
//             video.addEventListener('timeupdate', handleTimeUpdate);
//             return () => video.removeEventListener('timeupdate', handleTimeUpdate);
//         }
//     }, []);

//     return (
//         <div
//             className="relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg"
//             onMouseEnter={() => setIsHovering(true)}
//             onMouseLeave={() => setIsHovering(false)}
//         >
//             {/* Video Element */}
//             <video
//                 ref={videoRef}
//                 src={secureUrl}
//                 poster={thumbnailUrl}
//                 onClick={togglePlayPause}
//                 className="w-full aspect-video bg-black cursor-pointer"
//             />

//             {/* Video Controls Overlay */}
//             <div
//                 className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity ${isHovering || !isPlaying ? 'opacity-100' : 'opacity-0'
//                     }`}
//             >
//                 {/* Play/Pause Button */}
//                 <button
//                     onClick={togglePlayPause}
//                     className="btn btn-circle btn-primary mr-3"
//                     aria-label={isPlaying ? "Pause" : "Play"}
//                 >
//                     {isPlaying ? (
//                         <Pause />
//                     ) : (
//                         <Play />
//                     )}
//                 </button>

//                 {/* Progress Bar */}
//                 <div className="flex items-center w-full mt-2">
//                     <span className="text-white text-sm mr-2">
//                         {formatTime(currentTime)}
//                     </span>
//                     <input
//                         type="range"
//                         min="0"
//                         max={duration}
//                         value={currentTime}
//                         onChange={(e) => {
//                             if (videoRef.current) {
//                                 videoRef.current.currentTime = Number(e.target.value);
//                             }
//                         }}
//                         className="range range-primary range-xs flex-1"
//                     />
//                     <span className="text-white text-sm ml-2">
//                         {formatTime(duration)}
//                     </span>
//                 </div>
//             </div>
//         </div>
//     );
// };


// export default Editorial;

import { useState, useRef, useEffect, useCallback } from 'react';
import { Pause, Play, Volume2, Volume1, VolumeX, Maximize, Minimize, Loader2 } from 'lucide-react';

// --- Helper: Format time from seconds to MM:SS ---
const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

// --- Main Player Component ---
const EnhancedVideoPlayer = ({ secureUrl, thumbnailUrl, initialDuration }) => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const controlsTimeoutRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [playbackState, setPlaybackState] = useState({
        currentTime: 0,
        duration: Number(initialDuration) || 0,
        progress: 0,
        buffered: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // --- Core Playback Controls ---
    const togglePlay = useCallback(() => {
        if (!videoRef.current) return;
        videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
        setIsPlaying(!videoRef.current.paused);
    }, []);

    // --- Event Handlers from Video Element ---
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
        const handleLoading = () => setIsLoading(true);
        const handlePlaying = () => setIsLoading(false);
        const handleEnded = () => setIsPlaying(false);
        const handlePlayState = () => setIsPlaying(!video.paused);

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('durationchange', handleDurationChange);
        video.addEventListener('progress', handleProgress);
        video.addEventListener('waiting', handleLoading);
        video.addEventListener('playing', handlePlaying);
        video.addEventListener('play', handlePlayState);
        video.addEventListener('pause', handlePlayState);
        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('durationchange', handleDurationChange);
            video.removeEventListener('progress', handleProgress);
            video.removeEventListener('waiting', handleLoading);
            video.removeEventListener('playing', handlePlaying);
            video.removeEventListener('play', handlePlayState);
            video.removeEventListener('pause', handlePlayState);
            video.removeEventListener('ended', handleEnded);
        };
    }, [playbackState.duration]);

    // --- Volume & Mute Controls ---
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
        if (videoRef.current) videoRef.current.volume = newVolume;
    };
    const toggleMute = () => {
        const newMutedState = !isMuted;
        setIsMuted(newMutedState);
        if (videoRef.current) videoRef.current.muted = newMutedState;
    };
    const VolumeIcon = isMuted ? VolumeX : volume > 0.5 ? Volume2 : Volume1;

    // --- Seeking ---
    const handleSeek = (e) => {
        if (!videoRef.current || !playbackState.duration) return;
        const seekTime = (e.nativeEvent.offsetX / e.currentTarget.clientWidth) * playbackState.duration;
        videoRef.current.currentTime = seekTime;
    };
    const handleSeekByInput = (e) => {
        if (!videoRef.current || !playbackState.duration) return;
        const seekTime = (parseFloat(e.target.value) / 100) * playbackState.duration;
        videoRef.current.currentTime = seekTime;
    };

    // --- Fullscreen ---
    const toggleFullscreen = useCallback(() => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message} (${err.name})`);
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


    // --- Keyboard Shortcuts ---
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            switch (e.code) {
                case 'Space':
                    e.preventDefault();
                    togglePlay();
                    break;
                case 'KeyF':
                    e.preventDefault();
                    toggleFullscreen();
                    break;
                case 'KeyM':
                    e.preventDefault();
                    toggleMute();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    if (videoRef.current) videoRef.current.currentTime -= 5;
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    if (videoRef.current) videoRef.current.currentTime += 5;
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [togglePlay, toggleFullscreen]);

    // --- Autohide Controls Logic ---
    const handleActivity = () => {
        setIsHovering(true);
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = setTimeout(() => {
            setIsHovering(false);
        }, 3000);
    };

    const shouldShowControls = !isPlaying || isHovering;

    return (
        <div
            ref={containerRef}
            className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-black group/player"
            onMouseMove={handleActivity}
            onMouseLeave={() => {
                if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
                setIsHovering(false);
            }}
        >
            <video
                ref={videoRef}
                src={secureUrl}
                poster={thumbnailUrl}
                onClick={togglePlay}
                onLoadedData={() => setIsLoading(false)}
                className="w-full aspect-video cursor-pointer"
            />

            {/* --- Center Overlay: Loading / Play Button --- */}
            <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none 
                ${isLoading ? 'bg-black/50 opacity-100' : 'bg-transparent opacity-0 group-hover/player:opacity-100'}`}
            >
                {isLoading ? (
                    <Loader2 className="w-16 h-16 text-white/80 animate-spin" />
                ) : !isPlaying && (
                    <button
                        onClick={togglePlay}
                        className="p-4 bg-black/50 rounded-full backdrop-blur-sm pointer-events-auto
                                   transform hover:scale-110 transition-transform duration-200"
                        aria-label="Play"
                    >
                        <Play className="w-16 h-16 text-white" style={{ marginLeft: '0.5rem' }} />
                    </button>
                )}
            </div>

            {/* --- Bottom Controls Bar --- */}
            <div
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent 
                transition-opacity duration-300 p-4 ${shouldShowControls ? 'opacity-100' : 'opacity-0'}`}
            >
                {/* Progress Bar */}
                <div className="relative w-full h-4 group/progress" onClick={handleSeek}>
                    <div className="absolute w-full h-1.5 top-1/2 -translate-y-1/2 bg-white/20 rounded-full">
                        <div style={{ width: `${playbackState.buffered}%` }} className="h-full bg-white/40 rounded-full"></div>
                        <div style={{ width: `${playbackState.progress}%` }} className="absolute top-0 h-full bg-blue-500 rounded-full"></div>
                    </div>
                    <input
                        type="range" min="0" max="100" value={playbackState.progress}
                        onChange={handleSeekByInput}
                        className="video-range absolute top-0 w-full h-full opacity-0"
                    />
                </div>

                {/* Buttons and Time */}
                <div className="flex items-center justify-between mt-1 text-white">
                    <div className="flex items-center gap-4">
                        <button onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
                            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                        </button>

                        <div className="flex items-center gap-2 group/volume">
                            <button onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
                                <VolumeIcon size={24} />
                            </button>

                            <div className="w-0 group-hover/volume:w-20 transition-all duration-300">
                                <input
                                    type="range" min="0" max="1" step="0.05"
                                    value={volume} onChange={handleVolumeChange}
                                    className="volume-slider w-full"
                                />
                            </div>

                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm font-mono">
                            {formatTime(playbackState.currentTime)} / {formatTime(playbackState.duration)}
                        </span>
                        <button onClick={toggleFullscreen} aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}>
                            {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnhancedVideoPlayer;