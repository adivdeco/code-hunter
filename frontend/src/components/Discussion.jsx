
// // src/components/Discussion.jsx
// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { useSelector } from 'react-redux';
// import { Send, MessageSquareDashed, UserCircle2 } from 'lucide-react';
// import axiosClient from "@/utils/axiosClint"; // your configured axios
// import { formatDistanceToNow } from 'date-fns';
// import { motion, AnimatePresence } from 'framer-motion';
// import ThreeRingLoader from './ThreeRingLoader'; // Assuming you have this

// // A helper to generate a placeholder avatar if no profile picture exists
// const UserAvatar = ({ user }) => {
//     if (user?.avatar) {
//         return <img
//             src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user.avatar}`}
//             alt={user.name} className="w-10 h-10 rounded-full object-cover" />;
//     }

//     // Fallback avatar with initial
//     const initial = user?.name ? user.name[0].toUpperCase() : <UserCircle2 />;
//     const colors = ['bg-pink-500', 'bg-purple-500', 'bg-green-500', 'bg-yellow-500', 'bg-blue-500'];
//     const color = colors[user?.name?.charCodeAt(0) % colors.length] || 'bg-gray-500';

//     return (
//         <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${color}`}>
//             {initial}
//         </div>
//     );
// };

// const Discussion = ({ problemId }) => {
//     const { user } = useSelector((state) => state.auth);
//     const { register, handleSubmit, reset, formState: { errors } } = useForm();

//     const [comments, setComments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchComments = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axiosClient.get(`/api/discussion/getcom/${problemId}`);
//                 setComments(response.data.data);
//                 setError(null);
//             } catch (err) {
//                 console.error("Failed to fetch comments:", err);
//                 setError("Could not load the discussion. Please try again later.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (problemId) {
//             fetchComments();
//         }
//     }, [problemId]);

//     const onSubmitComment = async (data) => {
//         if (isSubmitting || !data.content.trim()) return;

//         setIsSubmitting(true);
//         try {
//             const response = await axiosClient.post(`/api/discussion/postcom/${problemId}`, {
//                 content: data.content
//             });
//             // Add the new comment to the top of the list for an instant update
//             setComments(prevComments => [response.data.data, ...prevComments]);
//             reset();
//         } catch (err) {
//             console.error("Failed to post comment:", err);
//             // Here you can set a temporary error message for the form
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="max-w-4xl mx-auto py-6 font-sans">
//             <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-purple-500 pl-4">
//                 Community Discussion
//             </h2>

//             {/* Comment Submission Form */}
//             {user && (
//                 <form onSubmit={handleSubmit(onSubmitComment)} className="flex items-start gap-4 mb-10">
//                     <div className="flex-shrink-0">
//                         <UserAvatar user={user} />
//                     </div>
//                     <div className="flex-1">
//                         <textarea
//                             {...register("content", { required: true, minLength: 5 })}
//                             placeholder="Share your thoughts, questions, or alternative solutions..."
//                             className="w-full bg-black/40 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 disabled:opacity-50"
//                             rows="3"
//                             disabled={isSubmitting}
//                         />
//                         <div className="flex justify-end items-center mt-2">
//                             {errors.content && <p className="text-red-400 text-sm mr-auto">Comment must be at least 5 characters.</p>}
//                             <button
//                                 type="submit"
//                                 disabled={isSubmitting}
//                                 className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:scale-105 transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
//                             >
//                                 {isSubmitting ? 'Posting...' : 'Post Comment'} <Send size={16} />
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//             )}

//             {/* Comments List */}
//             <div className="space-y-6">
//                 {loading && <ThreeRingLoader />}

//                 {error && <p className="text-center text-red-400">{error}</p>}

//                 {!loading && !error && comments.length === 0 && (
//                     <div className="text-center py-16 px-4 bg-black/20 border border-dashed border-gray-700 rounded-lg">
//                         <MessageSquareDashed className="mx-auto text-gray-600 mb-4" size={48} />
//                         <h3 className="text-xl font-semibold text-white">No discussion yet.</h3>
//                         <p className="text-gray-400 mt-2">Be the first one to start the conversation!</p>
//                     </div>
//                 )}

//                 <AnimatePresence>
//                     {!loading && comments.map((comment) => (
//                         <motion.div
//                             key={comment._id}
//                             layout
//                             initial={{ opacity: 0, y: 50, scale: 0.95 }}
//                             animate={{ opacity: 1, y: 0, scale: 1 }}
//                             exit={{ opacity: 0, scale: 0.95 }}
//                             transition={{ duration: 0.4, type: "spring" }}
//                             className="flex items-start gap-4 p-4 bg-black/20 rounded-lg border border-white/10"
//                         >
//                             <div className="flex-shrink-0 mt-1">
//                                 <UserAvatar user={comment.user} />
//                             </div>
//                             <div className="flex-1">
//                                 <div className="flex items-center gap-3">
//                                     <span className=" font-changa text-white">@{comment.user?.name || 'Anonymous'}</span>
//                                     <span className="text-xs text-gray-500">
//                                         • {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
//                                     </span>
//                                 </div>
//                                 <p className="mt-2 text-gray-300 whitespace-pre-wrap">{comment.content}</p>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// };

// export default Discussion;

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Send, MessageSquareDashed, UserCircle2, Heart, Reply, ChevronUp, Pin, Verified } from 'lucide-react';
import axiosClient from "@/utils/axiosClint";
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import ThreeRingLoader from './ThreeRingLoader';

// User Avatar Component with Admin Badge
const UserAvatar = ({ user, isAdmin }) => {
    if (user?.avatar) {
        return (
            <div className="relative">
                <img
                    src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user.avatar}`}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                />
                {isAdmin && (
                    <Verified className="absolute -bottom-1 -right-1 text-blue-500 bg-white rounded-full p-0.5" size={16} />
                )}
            </div>
        );
    }

    const initial = user?.name ? user.name[0].toUpperCase() : <UserCircle2 />;
    const colors = ['bg-pink-500', 'bg-purple-500', 'bg-green-500', 'bg-yellow-500', 'bg-blue-500'];
    const color = colors[user?.name?.charCodeAt(0) % colors.length] || 'bg-gray-500';

    return (
        <div className="relative">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${color}`}>
                {initial}
            </div>
            {isAdmin && (
                <Verified className="absolute -bottom-1 -right-1 text-blue-500 bg-white rounded-full p-0.5" size={16} />
            )}
        </div>
    );
};

// Comment Component with Replies
const CommentItem = ({
    comment,
    currentUser,
    onReply,
    onLike,
    onPin,
    isAdmin
}) => {
    const [showReplies, setShowReplies] = useState(false);
    const [replying, setReplying] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [isSubmittingReply, setIsSubmittingReply] = useState(false);

    const hasReplies = comment.replies && comment.replies.length > 0;
    const isLiked = comment.likes?.includes(currentUser?._id);
    const isPinned = comment.isPinned;

    const handleReplySubmit = async () => {
        if (!replyContent.trim() || isSubmittingReply) return;

        setIsSubmittingReply(true);
        try {
            await onReply(comment._id, replyContent);
            setReplyContent('');
            setReplying(false);
            setShowReplies(true);
        } finally {
            setIsSubmittingReply(false);
        }
    };

    return (
        <motion.div
            layout
            className={`relative flex items-start gap-4 p-4 rounded-lg border transition-all duration-300 ${isPinned
                    ? 'bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/50 shadow-lg shadow-purple-500/10'
                    : 'bg-black/20 border-white/10'
                }`}
        >
            {isPinned && (
                <Pin className="absolute top-2 right-2 text-purple-400" size={16} />
            )}

            <div className="flex-shrink-0 mt-1">
                <UserAvatar user={comment.user} isAdmin={comment.user?.role === 'admin'} />
            </div>

            <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-changa text-white flex items-center gap-1">
                        @{comment.user?.name || 'Anonymous'}
                        {comment.user?.role === 'admin' && (
                            <Verified className="text-blue-500" size={16} />
                        )}
                    </span>
                    <span className="text-xs text-gray-500">
                        • {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                </div>

                <p className="mt-2 text-gray-300 whitespace-pre-wrap">{comment.content}</p>

                <div className="flex items-center gap-4 mt-3 text-sm">
                    <button
                        onClick={() => onLike(comment._id)}
                        className={`flex items-center gap-1 ${isLiked ? 'text-pink-500' : 'text-gray-400'} hover:text-pink-500`}
                    >
                        <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                        <span>{comment.likes?.length || 0}</span>
                    </button>

                    <button
                        onClick={() => setReplying(!replying)}
                        className="flex items-center gap-1 text-gray-400 hover:text-blue-400"
                    >
                        <Reply size={16} />
                        <span>Reply</span>
                    </button>

                    {hasReplies && (
                        <button
                            onClick={() => setShowReplies(!showReplies)}
                            className="flex items-center gap-1 text-gray-400 hover:text-purple-400"
                        >
                            <ChevronUp size={16} className={`transition-transform ${showReplies ? '' : 'rotate-180'}`} />
                            <span>{showReplies ? 'Hide replies' : `Show replies (${comment.replies.length})`}</span>
                        </button>
                    )}

                    {isAdmin && (
                        <button
                            onClick={() => onPin(comment._id)}
                            className="flex items-center gap-1 text-gray-400 hover:text-yellow-400 ml-auto"
                        >
                            <Pin size={16} fill={isPinned ? 'currentColor' : 'none'} />
                            <span>{isPinned ? 'Unpin' : 'Pin'}</span>
                        </button>
                    )}
                </div>

                {replying && (
                    <div className="mt-3 flex gap-2">
                        <input
                            type="text"
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write your reply..."
                            className="flex-1 bg-black/40 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleReplySubmit}
                            disabled={!replyContent.trim() || isSubmittingReply}
                            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isSubmittingReply ? 'Sending...' : 'Send'}
                        </button>
                    </div>
                )}

                {showReplies && hasReplies && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-700 space-y-3">
                        {comment.replies.map(reply => (
                            <CommentItem
                                key={reply._id}
                                comment={reply}
                                currentUser={currentUser}
                                onReply={onReply}
                                onLike={onLike}
                                isAdmin={isAdmin}
                            />
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const Discussion = ({ problemId }) => {
    const { user } = useSelector((state) => state.auth);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'mostLiked'

    const isAdmin = user?.role === 'admin';

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get(`/api/discussion/getcom/${problemId}`);

                // Separate pinned comments and sort them
                const pinnedComments = response.data.data
                    .filter(c => c.isPinned)
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                // Sort remaining comments
                const sortedComments = response.data.data
                    .filter(c => !c.isPinned)
                    .sort((a, b) => {
                        if (sortBy === 'newest') {
                            return new Date(b.createdAt) - new Date(a.createdAt);
                        } else if (sortBy === 'oldest') {
                            return new Date(a.createdAt) - new Date(b.createdAt);
                        } else if (sortBy === 'mostLiked') {
                            return (b.likes?.length || 0) - (a.likes?.length || 0);
                        }
                        return 0;
                    });

                setComments([...pinnedComments, ...sortedComments]);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch comments:", err);
                setError("Could not load the discussion. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (problemId) {
            fetchComments();
        }
    }, [problemId, sortBy]);

    const onSubmitComment = async (data) => {
        if (isSubmitting || !data.content.trim()) return;

        setIsSubmitting(true);
        try {
            const response = await axiosClient.post(`/api/discussion/postcom/${problemId}`, {
                content: data.content
            });
            setComments(prevComments => [response.data.data, ...prevComments]);
            reset();
        } catch (err) {
            console.error("Failed to post comment:", err);
            setError("Failed to post comment. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLike = async (commentId) => {
        if (!user) return;

        try {
            const response = await axiosClient.post(`/api/discussion/like/${commentId}`);
            setComments(prev => prev.map(comment => {
                if (comment._id === commentId) {
                    return {
                        ...comment,
                        likes: response.data.likes
                    };
                }
                return comment;
            }));
        } catch (err) {
            console.error("Failed to like comment:", err);
        }
    };

    const handleReply = async (parentId, content) => {
        try {
            const response = await axiosClient.post(`/api/discussion/reply/${parentId}`, {
                content
            });

            setComments(prev => prev.map(comment => {
                if (comment._id === parentId) {
                    return {
                        ...comment,
                        replies: [...(comment.replies || []), response.data.data]
                    };
                }
                return comment;
            }));
        } catch (err) {
            console.error("Failed to post reply:", err);
            throw err;
        }
    };

    const handlePin = async (commentId) => {
        if (!isAdmin) return;

        try {
            const response = await axiosClient.patch(`/api/discussion/pin/${commentId}`);
            setComments(prev => prev.map(comment => {
                if (comment._id === commentId) {
                    return {
                        ...comment,
                        isPinned: response.data.isPinned
                    };
                }
                return comment;
            }));
        } catch (err) {
            console.error("Failed to pin comment:", err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-6 font-sans">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white border-l-4 border-purple-500 pl-4">
                    Community Discussion
                </h2>

                <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">Sort by:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-black/40 border border-gray-600 rounded-md px-3 py-1 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="mostLiked">Most Liked</option>
                    </select>
                </div>
            </div>

            {/* Comment Submission Form */}
            {user && (
                <form onSubmit={handleSubmit(onSubmitComment)} className="flex items-start gap-4 mb-10">
                    <div className="flex-shrink-0">
                        <UserAvatar user={user} isAdmin={isAdmin} />
                    </div>
                    <div className="flex-1">
                        <textarea
                            {...register("content", { required: true, minLength: 5 })}
                            placeholder="Share your thoughts, questions, or alternative solutions..."
                            className="w-full bg-black/40 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 disabled:opacity-50"
                            rows="3"
                            disabled={isSubmitting}
                        />
                        <div className="flex justify-end items-center mt-2">
                            {errors.content && <p className="text-red-400 text-sm mr-auto">Comment must be at least 5 characters.</p>}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:scale-105 transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Posting...' : 'Post Comment'} <Send size={16} />
                            </button>
                        </div>
                    </div>
                </form>
            )}

            {/* Comments List */}
            <div className="space-y-6">
                {loading && <ThreeRingLoader />}

                {error && <p className="text-center text-red-400">{error}</p>}

                {!loading && !error && comments.length === 0 && (
                    <div className="text-center py-16 px-4 bg-black/20 border border-dashed border-gray-700 rounded-lg">
                        <MessageSquareDashed className="mx-auto text-gray-600 mb-4" size={48} />
                        <h3 className="text-xl font-semibold text-white">No discussion yet.</h3>
                        <p className="text-gray-400 mt-2">Be the first one to start the conversation!</p>
                    </div>
                )}

                <AnimatePresence>
                    {!loading && comments.map((comment) => (
                        <CommentItem
                            key={comment._id}
                            comment={comment}
                            currentUser={user}
                            onReply={handleReply}
                            onLike={handleLike}
                            onPin={handlePin}
                            isAdmin={isAdmin}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Discussion;