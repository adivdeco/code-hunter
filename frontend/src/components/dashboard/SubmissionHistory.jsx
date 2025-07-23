"use client"

import { useState, useEffect } from 'react'
// import axiosClient from '@/utils/axiosClint';
import { useDashboardData } from "@/contexts/DashboardDataContext"


export default function SubmissionHistory() {
    // const dateCounts = {}
    const { submissions, loading, error, stats } = useDashboardData();
    const [selectedStatus, setSelectedStatus] = useState('all');

    // const a = submissions.map((x) => x.createdAt)
    // const b = a.map((c) => c.split('T')[0])
    // 1
    // const f = b.reduce((acc, date) => {
    //     const fond = acc.find(item => item.date === date);
    //     if (fond) {
    //         find.value += 1
    //     } else {
    //         acc.push({ date, value: 1 });
    //     }
    //     return acc;
    // }, []);

    // 2
    // for (let data of b) {
    //     dateCounts[data] = (dateCounts[data] ? +1 : 0)
    // }
    // const result = Object.entries(dateCounts).map(([date, value]) => ({
    //     date,
    //     value
    // }));

    // console.log(result);
    // console.log(b);


    const filteredSubmissions = Array.isArray(submissions) ?
        submissions.filter(sub => {
            if (selectedStatus === 'all') return true;
            if (selectedStatus === 'wrong_answer') {
                // Include both 'wrong_answer' and 'error' statuses
                return sub.status === 'wrong_answer' || sub.status === 'error';
            }
            return sub.status === selectedStatus;
        }) : [];

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-GB') // DD/MM/YYYY format
    }


    const getStatusColor = (status) => {
        const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium";

        const statusClasses = {
            accepted: `${baseClasses} bg-green-500/20 text-green-300 border border-green-500`,
            wrong_answer: `${baseClasses} bg-red-500/20 text-red-300 border border-red-500`,
            error: `${baseClasses} bg-amber-500/20 text-amber-300 border border-amber-500`,
            pending: `${baseClasses} bg-blue-500/20 text-blue-300 border border-blue-500`,
        };

        const classes = statusClasses[status?.toLowerCase()] ||
            `${baseClasses} bg-gray-50 text-gray-700 border border-gray-100`;

        const displayText = status ?
            status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ') :
            'Unknown';

        return <span className={classes}>{displayText}</span>;
    }

    const getLanguageName = (language) => {
        const languageMap = {
            'c++': 'C++',
            'java': 'Java',
            'javascript': 'JavaScript',
            'go': 'Go',
            'python': 'Python'
        }
        return languageMap[language] || language
    }

    if (loading) return <div className="text-center py-8 text-gray-400">Loading submissions...</div>
    if (error) return <div className="text-center py-8 text-red-500">{error}</div>

    return (
        <div className="bg-gradient-to-br from-purple-950 via-indigo-950 to-black rounded-2xl p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-white">Submission History</h3>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setSelectedStatus('all')}
                        className={`px-3 py-1 rounded-full text-xs ${selectedStatus === 'all'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setSelectedStatus('accepted')}
                        className={`px-3 py-1 rounded-full text-xs ${selectedStatus === 'accepted'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        Accepted
                    </button>
                    <button
                        onClick={() => setSelectedStatus('wrong_answer')}
                        className={`px-3 py-1 rounded-full text-xs ${selectedStatus === 'wrong_answer'
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        Rejected
                    </button>
                </div>
            </div>

            {submissions.length > 0 && (
                <div className="text-sm text-gray-400 mb-4">
                    Average Runtime: {stats.avgRuntime}ms • Average Memory: {stats.avgMemory}MB
                </div>
            )}

            <div className="overflow-auto h-64 ">
                {filteredSubmissions.length > 0 ? (
                    <table className="w-full ">
                        <thead>
                            <tr className="text-left text-gray-400 border-b border-gray-800">
                                <th className="pb-3 px-4">Date</th>
                                <th className="pb-3 px-4">Problem</th>
                                <th className="pb-3 px-4">Status</th>
                                <th className="pb-3 px-4">Language</th>
                                <th className="pb-3 px-4">Runtime</th>
                                <th className="pb-3 px-4">Memory</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSubmissions.map((submission) => (
                                <tr
                                    key={submission?._id}
                                    className={`border-b border-gray-800 hover:bg-purple-800/70 transition ${submission.status === 'accepted'
                                        ? 'border-l-4 border-green-500'
                                        : 'border-l-4 border-red-500'
                                        }`}
                                >
                                    <td className="py-4 px-4 text-white/80">
                                        {formatDate(submission.createdAt)}
                                    </td>
                                    <td className="py-4 px-4 text-white/80">
                                        {submission.problemId?.title || 'Unknown Problem'}
                                    </td>
                                    <td className="py-4 px-4">
                                        {getStatusColor(submission.status)}

                                    </td>
                                    <td className="py-4 px-4 text-gray-400">
                                        {getLanguageName(submission.language)}
                                    </td>
                                    <td className="py-4 px-4 text-gray-400">
                                        {submission.runtime}ms
                                    </td>
                                    <td className="py-4 px-4 text-gray-400">
                                        {(submission.memory / 1024).toFixed(2)}MB
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-8 text-gray-400">
                        No submissions found
                    </div>
                )}
            </div>
        </div>
    )
}