// components/BookmarkButton.jsx
import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import axiosClient from "@/utils/axiosClint";

/**
 * Bookmark toggle button
 * @param {string} problemId - ID of the problem to bookmark
 * @param {object} user - Authenticated user object
 * @param {function} onBookmarkChange - Callback to notify parent of changes
 */
function BookmarkButton({ problemId, user, onBookmarkChange }) {
    const [isBookmarked, setIsBookmarked] = useState(false);

    // 🔁 Fetch current bookmark status
    useEffect(() => {
        const fetchBookmarkStatus = async () => {
            if (!user) return;
            try {
                const { data } = await axiosClient.get("/book/getmark");
                const bookmarkedIds = data.bookmarks.map(b => b.problemId._id);
                setIsBookmarked(bookmarkedIds.includes(problemId));
            } catch (err) {
                console.error("Error fetching bookmarks:", err);
            }
        };

        fetchBookmarkStatus();
    }, [problemId, user]);

    // ⭐ Toggle bookmark
    const toggleBookmark = async () => {
        try {
            if (isBookmarked) {
                await axiosClient.delete(`/book/delmark/${problemId}`);
                setIsBookmarked(false);
            } else {
                await axiosClient.post(`/book/createmark/${problemId}`);
                setIsBookmarked(true);
            }

            if (onBookmarkChange) {
                onBookmarkChange(); // Notify parent to re-fetch if needed
            }

        } catch (err) {
            console.error("Error toggling bookmark:", err);
        }
    };

    return (
        <button onClick={toggleBookmark} className="text-lg">
            <Bookmark
                size={25}
                strokeWidth={10}
                className={isBookmarked ? "bookmark-filled" : "text-white"}
            />
        </button>
    );
}

export default BookmarkButton;
