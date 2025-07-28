// src/components/Discussion.jsx
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Send, MessageSquareDashed, UserCircle2 } from 'lucide-react';
import axiosClient from "@/utils/axiosClint"; // your configured axios
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import ThreeRingLoader from './ThreeRingLoader'; // Assuming you have this

// A helper to generate a placeholder avatar if no profile picture exists
const UserAvatar = ({ user }) => {
    if (user?.profilePicture) {
        return <img src={user.profilePicture} alt={user.name} className="w-10 h-10 rounded-full object-cover" />;
    }

    // Fallback avatar with initial
    const initial = user?.name ? user.name[0].toUpperCase() : <UserCircle2 />;
    const colors = ['bg-pink-500', 'bg-purple-500', 'bg-green-500', 'bg-yellow-500', 'bg-blue-500'];
    const color = colors[user?.name?.charCodeAt(0) % colors.length] || 'bg-gray-500';

    return (
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${color}`}>
            {initial}
        </div>
    );
};

const Discussion = ({ problemId }) => {
    const { user } = useSelector((state) => state.auth);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get(`/discussion/${problemId}`);
                setComments(response.data.data);
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
    }, [problemId]);

    const onSubmitComment = async (data) => {
        if (isSubmitting || !data.content.trim()) return;

        setIsSubmitting(true);
        try {
            const response = await axiosClient.post(`/discussion/${problemId}`, {
                content: data.content
            });
            // Add the new comment to the top of the list for an instant update
            setComments(prevComments => [response.data.data, ...prevComments]);
            reset();
        } catch (err) {
            console.error("Failed to post comment:", err);
            // Here you can set a temporary error message for the form
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-6 font-sans">
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-purple-500 pl-4">
                Community Discussion
            </h2>

            {/* Comment Submission Form */}
            {user && (
                <form onSubmit={handleSubmit(onSubmitComment)} className="flex items-start gap-4 mb-10">
                    <div className="flex-shrink-0">
                        <UserAvatar user={user} />
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
                        <motion.div
                            key={comment._id}
                            layout
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4, type: "spring" }}
                            className="flex items-start gap-4 p-4 bg-black/20 rounded-lg border border-white/10"
                        >
                            <div className="flex-shrink-0 mt-1">
                                <UserAvatar user={comment.user} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-white">{comment.user?.name || 'Anonymous'}</span>
                                    <span className="text-xs text-gray-500">
                                        • {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                    </span>
                                </div>
                                <p className="mt-2 text-gray-300 whitespace-pre-wrap">{comment.content}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Discussion;