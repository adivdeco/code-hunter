

// components/NotePopup.jsx
import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClint";
// import { log } from "console";

const NotePopup = ({ problemId, onClose }) => {
    const [noteContent, setNoteContent] = useState('');
    const [loading, setLoading] = useState(false);




    useEffect(() => {


        const fetchNote = async () => {
            setLoading(true);
            try {

                const res = await axiosClient.get(`/note/getnote/${problemId}`);
                const noteContent = res.data.allnote[0]?.content || ''; // ✅ Safe fallback
                setNoteContent(noteContent);
                console.log(noteContent);


            } catch (err) {
                console.error('Error fetching note:', err);
                setNoteContent('');
            } finally {
                setLoading(false);
            }
        };

        if (problemId) {
            fetchNote();
        }


    }, [problemId]);





    const saveNote = async () => {
        try {
            const res = await axiosClient.get(`/note/getnote/${problemId}`, { content: noteContent });
            const existing = res.data.note?.content || '';

            await axiosClient.post(`/note/createnote/${problemId}`, {
                content: existing + '\n' + noteContent.trim()
            });

            alert("Note updated!");
            onClose();
        } catch (err) {
            console.error('Failed to save note:', err);
        }
    };

    if (!problemId) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm z-50">
            <div className="w-full max-w-xl bg-white/10 backdrop-blur-md 
                border border-white/20 p-6 rounded-2xl shadow-xl 
                transition-all duration-300">
                <h3 className="text-lg font-semibold text-white mb-2 font-changa">Your Note...</h3>

                {loading ? (
                    <p className="text-sm text-gray-500">Loading...</p>
                ) : (
                    <textarea
                        className="w-full border px-3 py-2 rounded h-40 border-none text-white"
                        value={noteContent}
                        placeholder="write your thoughts..."
                        maxLength={800}
                        onChange={(e) => setNoteContent(e.target.value)}
                    />
                )}

                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="text-white border px-4 py-1 rounded hover:bg-gray-100 hover:text-black"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={saveNote}
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotePopup;
