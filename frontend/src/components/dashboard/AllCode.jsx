
import { useEffect, useState } from "react";
import axiosClient from "@/utils/axiosClint";
import CodeViewerModal from "./CodeViewerModal"; // Adjust path as needed
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import Navbar from "../Navbar";

export default function AllCode() {
    const [submissions, setSubmissions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    useEffect(() => {
        const fetchSolns = async () => {
            setIsLoading(true);
            try {
                const response = await axiosClient.get(`/problem/submissions`);
                const data = Array.isArray(response.data) ? response.data : [response.data];
                setSubmissions(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))); // Sort newest first
            } catch (error) {
                console.error("Error fetching submissions:", error);
                setSubmissions([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSolns();
    }, []);

    const handleViewCode = (submission) => {
        setSelectedSubmission(submission);
        setIsModalOpen(true);
    };

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-GB');

    const getStatusChip = (status) => {
        let colors = '';
        switch (status?.toLowerCase()) {
            case 'accepted':
                colors = 'bg-green-500/10 text-green-400 border border-green-500/30';
                break;
            case 'wrong_answer':
                colors = 'bg-red-500/10 text-red-400 border border-red-500/30';
                break;
            default: // Covers pending, error, etc.
                colors = 'bg-amber-500/10 text-amber-400 border border-amber-500/30';
                break;
        }
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors}`}>
                {status?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'N/A'}
            </span>
        );
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-purple-950 to-black text-white font-sans p-4 sm:p-6 lg:p-8">
                <nav className="text-white/80">
                    <Navbar />
                </nav>
                <div className="max-w-7xl mt-16 mx-auto">
                    {/* Header */}
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <h1 className="text-4xl font-bold font-chango bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                            My Submissions
                        </h1>
                        <p className="mt-2 text-gray-400 font-changa">A chronicle of your coding journey and problem-solving attempts.</p>
                    </motion.div>

                    {/* Main Table Container with decorative gradient border */}
                    <div className="mt-8 relative p-0.5 bg-gradient-to-br from-purple-500/30 via-indigo-500/30 to-black rounded-xl">
                        <div className="bg-gray-950/80 backdrop-blur-xl rounded-[10px] overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-800">
                                    <thead className="sticky top-0 bg-gray-950/50 backdrop-blur-lg z-10">
                                        <tr>
                                            {['Date', 'Problem', 'Status', 'Language', 'Action'].map(header => (
                                                <th key={header} scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800/50">
                                        {isLoading ? (
                                            <tr><td colSpan="5" className="text-center py-16 text-gray-500">Loading your submissions...</td></tr>
                                        ) : submissions.length === 0 ? (
                                            <tr><td colSpan="5" className="text-center py-16 text-gray-500">No submissions found.</td></tr>
                                        ) : (
                                            submissions.map((sub, i) => (
                                                <motion.tr
                                                    key={sub._id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className="hover:bg-purple-900/20 transition-colors duration-200"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{formatDate(sub.createdAt)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{sub.problemId?.title || 'N/A'}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{getStatusChip(sub.status)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{sub.language}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">

                                                        <button onClick={() => handleViewCode(sub)} className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors p-2 rounded-lg hover:bg-indigo-500/10">
                                                            <Code2 size={16} />
                                                            <span className="hidden sm:inline">View Code</span>
                                                        </button>
                                                    </td>
                                                </motion.tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CodeViewerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                submission={selectedSubmission}
            />
        </>
    );
}