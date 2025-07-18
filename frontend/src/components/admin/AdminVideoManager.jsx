import React, { useState, useEffect, useMemo } from 'react';
import axiosClient from '@/utils/axiosClint';
import { FiPlay, FiPlus, FiTrash2, FiEdit, FiUpload, FiSearch, FiFilter } from 'react-icons/fi';
import AdminNavbar from '@/components/admin/AdminNav';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';

Modal.setAppElement('#root');

const AdminProblemManager = ({ userp }) => {
    const { user } = useSelector((state) => state.auth);

    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'asc' });

    // Video upload modal state
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentProblem, setCurrentProblem] = useState(null);
    const [videoData, setVideoData] = useState({
        title: '',
        description: '',
        videoFile: null,
        thumbnail: null,
        duration: ''
    });

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await axiosClient.get('/problem/allProblems');

                setProblems(response.data.allproblem);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProblems();
    }, []);

    const getDifficultyBadgeColor = useMemo(() => {
        return (difficulty) => {
            switch ((difficulty || '').toLowerCase()) {
                case 'easy':
                    return 'bg-green-500/10 text-green-400 border-green-400';
                case 'medium':
                    return 'bg-yellow-200/10 text-yellow-300 border-yellow-400';
                case 'hard':
                    return 'bg-red-500/10 text-red-400 border-red-500';
                default:
                    return 'bg-gray-600/10 text-gray-300 border-gray-500';
            }
        };
    }, []);

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedProblems = useMemo(() => {
        try {
            // Ensure problems is an array, default to empty array if not
            let sortableItems = Array.isArray(problems) ? [...problems] : [];

            if (sortConfig !== null && sortConfig.key) {
                sortableItems.sort((a, b) => {
                    // Handle cases where the sort key might not exist in all objects
                    const aValue = a[sortConfig.key] || '';
                    const bValue = b[sortConfig.key] || '';

                    if (aValue < bValue) {
                        return sortConfig.direction === 'asc' ? -1 : 1;
                    }
                    if (aValue > bValue) {
                        return sortConfig.direction === 'asc' ? 1 : -1;
                    }
                    return 0;
                });
            }
            return sortableItems;
        } catch (error) {
            console.error('Error sorting problems:', error);
            return Array.isArray(problems) ? [...problems] : [];
        }
    }, [problems, sortConfig]);


    const filteredProblems = useMemo(() => {
        return sortedProblems.filter(problem => {
            const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                problem.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDifficulty = selectedDifficulty === 'all' ||
                problem.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
            return matchesSearch && matchesDifficulty;
        });
    }, [sortedProblems, searchTerm, selectedDifficulty]);

    const openVideoUploadModal = (problem) => {
        setCurrentProblem(problem);
        setVideoData({
            title: `${problem.title} Solution`,
            description: `Video solution for ${problem.title}`,
            videoFile: null,
            thumbnail: null,
            duration: ''
        });
        setModalIsOpen(true);
    };

    const handleVideoUpload = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('problemId', currentProblem._id);
            formData.append('title', videoData.title);
            formData.append('description', videoData.description);
            formData.append('video', videoData.videoFile);
            formData.append('thumbnail', videoData.thumbnail);
            formData.append('duration', videoData.duration);

            // Replace with your actual API endpoint
            const response = await axiosClient.post('/problem/addVideoSolution', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Update the problem in state with the new video
            setProblems(prevProblems =>
                prevProblems.map(p =>
                    p._id === currentProblem._id
                        ? { ...p, videoSolution: response.data.video }
                        : p
                )
            );

            setModalIsOpen(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setVideoData(prev => ({
            ...prev,
            [name]: files[0]
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVideoData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const deleteProblem = async (problemId) => {
        if (window.confirm('Are you sure you want to delete this problem?')) {
            try {
                await axiosClient.delete(`/problem/${problemId}`);
                setProblems(prev => prev.filter(p => p._id !== problemId));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white">
                <nav>
                    <AdminNavbar user={user} />
                </nav>
                <div className="container mx-auto px-4 py-8 flex justify-center">
                    <div className="animate-pulse flex flex-col space-y-4 w-full max-w-6xl">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-24 bg-gray-800 rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 text-white">
                <nav>
                    <AdminNavbar user={user} />
                </nav>
                <div className="container mx-auto px-4 py-8 text-center">
                    <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 max-w-2xl mx-auto">
                        <h2 className="text-xl font-bold mb-2">Error Loading Problems</h2>
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <nav>
                <AdminNavbar user={user} />
            </nav>

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Problem Management</h1>
                    <p className="text-gray-400">Manage problems and add video solutions</p>
                </div>

                <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search problems..."
                            className="pl-10 pr-4 py-2 w-full bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center space-x-4 w-full md:w-auto">
                        <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-1">
                            <button
                                onClick={() => setSelectedDifficulty('all')}
                                className={`px-3 py-1 rounded-md text-sm ${selectedDifficulty === 'all' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setSelectedDifficulty('easy')}
                                className={`px-3 py-1 rounded-md text-sm ${selectedDifficulty === 'easy' ? 'bg-green-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                            >
                                Easy
                            </button>
                            <button
                                onClick={() => setSelectedDifficulty('medium')}
                                className={`px-3 py-1 rounded-md text-sm ${selectedDifficulty === 'medium' ? 'bg-yellow-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                            >
                                Medium
                            </button>
                            <button
                                onClick={() => setSelectedDifficulty('hard')}
                                className={`px-3 py-1 rounded-md text-sm ${selectedDifficulty === 'hard' ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                            >
                                Hard
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-12 bg-gray-700/50 border-b border-gray-700 p-4 font-medium">
                        <div
                            className="col-span-5 md:col-span-5 flex items-center cursor-pointer"
                            onClick={() => requestSort('title')}
                        >
                            <span>Problem</span>
                            {sortConfig.key === 'title' && (
                                <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                            )}
                        </div>
                        <div
                            className="col-span-3 md:col-span-2 flex items-center cursor-pointer"
                            onClick={() => requestSort('difficulty')}
                        >
                            <span>Difficulty</span>
                            {sortConfig.key === 'difficulty' && (
                                <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                            )}
                        </div>
                        <div className="col-span-2 md:col-span-2 flex items-center">
                            <span>Status</span>
                        </div>
                        <div className="col-span-2 md:col-span-3 text-right">Actions</div>
                    </div>

                    {filteredProblems.length === 0 ? (
                        <div className="p-8 text-center text-gray-400">
                            No problems found matching your criteria
                        </div>
                    ) : (
                        filteredProblems.map((problem) => (
                            <div key={problem._id} className="grid grid-cols-12 border-b border-gray-700 p-4 hover:bg-gray-750 transition-colors">
                                <div className="col-span-5 md:col-span-5">
                                    <h3 className="font-medium text-blue-400">{problem.title}</h3>
                                    <p className="text-sm text-gray-400 line-clamp-1">{problem.description}</p>
                                </div>
                                <div className="col-span-3 md:col-span-2 flex items-center">
                                    <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyBadgeColor(problem.difficulty)}`}>
                                        {problem.difficulty}
                                    </span>
                                </div>
                                <div className="col-span-2 md:col-span-2 flex items-center">
                                    {problem.videoSolution ? (
                                        <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-400">
                                            Video Added
                                        </span>
                                    ) : (
                                        <span className="text-xs px-2 py-1 rounded-full bg-gray-600/10 text-gray-300 border border-gray-500">
                                            No Video
                                        </span>
                                    )}
                                </div>
                                <div className="col-span-2 md:col-span-3 flex items-center justify-end space-x-2">
                                    {problem.videoSolution ? (
                                        <>
                                            <button
                                                onClick={() => openVideoUploadModal(problem)}
                                                className="p-2 text-yellow-400 hover:bg-gray-700 rounded-lg"
                                                title="Replace Video"
                                            >
                                                <FiEdit className="w-4 h-4" />
                                            </button>
                                            <a
                                                href={problem.videoSolution.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 text-green-400 hover:bg-gray-700 rounded-lg"
                                                title="View Video"
                                            >
                                                <FiPlay className="w-4 h-4" />
                                            </a>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => openVideoUploadModal(problem)}
                                            className="flex items-center space-x-1 px-3 py-1 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded-full transition-colors"
                                        >
                                            <FiPlus className="w-4 h-4" />
                                            <span>Add Video</span>
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteProblem(problem._id)}
                                        className="p-2 text-red-400 hover:bg-gray-700 rounded-lg"
                                        title="Delete Problem"
                                    >
                                        <FiTrash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Video Upload Modal */}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    className="modal bg-gray-800 rounded-lg p-6 max-w-md mx-auto mt-20 outline-none"
                    overlayClassName="fixed inset-0 bg-black/70 z-50"
                >
                    <h2 className="text-xl font-bold mb-4">
                        {currentProblem?.videoSolution ? 'Replace' : 'Add'} Video Solution for {currentProblem?.title}
                    </h2>

                    <form onSubmit={handleVideoUpload}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Video Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={videoData.title}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={videoData.description}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                                    rows="3"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Video File</label>
                                <div className="flex items-center space-x-2">
                                    <label className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-600">
                                        <FiUpload className="inline mr-2" />
                                        {videoData.videoFile ? videoData.videoFile.name : 'Choose file'}
                                        <input
                                            type="file"
                                            name="videoFile"
                                            accept="video/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            required
                                        />
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Thumbnail (Optional)</label>
                                <div className="flex items-center space-x-2">
                                    <label className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-600">
                                        <FiUpload className="inline mr-2" />
                                        {videoData.thumbnail ? videoData.thumbnail.name : 'Choose file'}
                                        <input
                                            type="file"
                                            name="thumbnail"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Duration (mm:ss)</label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={videoData.duration}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 15:30"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                type="button"
                                onClick={() => setModalIsOpen(false)}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                            >
                                {currentProblem?.videoSolution ? 'Update' : 'Upload'} Video
                            </button>
                        </div>
                    </form>
                </Modal>
            </div>
        </div>
    );
};

export default AdminProblemManager;