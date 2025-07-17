import { useState } from 'react'
import { Badge } from '@mantine/core'

const submissionData = [
    {
        id: 1,
        date: '09/07/2025',
        problem: 'Container With Most Water',
        status: 'Accepted',
        language: 'JavaScript (Node.js 12.14.0)',
        runtime: '4.00ms',
        memory: '8.74MB'
    },
    {
        id: 2,
        date: '08/07/2025',
        problem: 'Two Sum',
        status: 'Accepted',
        language: 'Python 3.8',
        runtime: '3.50ms',
        memory: '7.33MB'
    },
    {
        id: 3,
        date: '07/07/2025',
        problem: 'Reverse Linked List',
        status: 'Rejected',
        language: 'Java 11',
        runtime: 'N/A',
        memory: 'N/A'
    }
]

export default function SubmissionHistory() {
    const [selectedStatus, setSelectedStatus] = useState('all')

    const filteredRecords = submissionData.filter(record => {
        if (selectedStatus === 'all') return true
        return record.status === selectedStatus
    })

    return (
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
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
                        onClick={() => setSelectedStatus('Accepted')}
                        className={`px-3 py-1 rounded-full text-xs ${selectedStatus === 'Accepted'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        Accepted
                    </button>
                    <button
                        onClick={() => setSelectedStatus('Rejected')}
                        className={`px-3 py-1 rounded-full text-xs ${selectedStatus === 'Rejected'
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        Rejected
                    </button>
                </div>
            </div>

            <div className="text-sm text-gray-400 mb-4">
                Average Runtime: 4.50ms • Average Memory: 8.04MB
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
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
                        {filteredRecords.map((record) => (
                            <tr
                                key={record.id}
                                className={`border-b border-gray-800 hover:bg-gray-800/50 transition ${record.status === 'Accepted'
                                        ? 'border-l-4 border-green-500'
                                        : 'border-l-4 border-red-500'
                                    }`}
                            >
                                <td className="py-4 px-4 text-white">{record.date}</td>
                                <td className="py-4 px-4 text-white">{record.problem}</td>
                                <td className="py-4 px-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${record.status === 'Accepted'
                                            ? 'bg-green-900 text-green-300'
                                            : 'bg-red-900 text-red-300'
                                        }`}>
                                        {record.status}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-gray-400">{record.language}</td>
                                <td className="py-4 px-4 text-gray-400">{record.runtime}</td>
                                <td className="py-4 px-4 text-gray-400">{record.memory}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}