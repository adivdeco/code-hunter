import React, { useState, useEffect, useMemo } from 'react';
import axiosClient from '@/utils/axiosClint';
import { FiPlay, FiLock, FiShoppingCart, FiCheck, FiSearch, FiFilter } from 'react-icons/fi';
import Navbar from './Navbar';

const ProblemList = ({ user }) => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [purchasedVideos, setPurchasedVideos] = useState(new Set());
    const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'asc' });

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await axiosClient.get('/problem/allProblems');
                setProblems(response.data.allproblem);
                // console.log(response.data);

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProblems();

        // Load purchased videos from localStorage or API in a real app
        // const purchased = JSON.parse(localStorage.getItem('purchasedVideos') || [])
        // setPurchasedVideos(new Set(purchased))
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


    // const handlePurchase = (problemId) => {
    //     if (!Array.isArray(sortedProblems)) return [];
    //     return sortedProblems.filter(problem => {
    //         // ... rest of your filtering logic
    //         const newPurchased = new Set(purchasedVideos);
    //         newPurchased.add(problemId);
    //         setPurchasedVideos(newPurchased);
    //         // In a real app, you would call an API here to record the purchase
    //         localStorage.setItem('purchasedVideos', JSON.stringify(Array.from(newPurchased)));
    //     });

    // };

    const renderVideoAccess = (problemId) => {
        const price = (Math.random() * 6 + 1).toFixed(2);
        if (purchasedVideos.has(problemId)) {
            return (
                <button className="flex items-center space-x-1 px-3 py-1 bg-green-600/20 text-green-400 rounded-full">
                    <FiPlay className="w-4 h-4" />
                    <span>Watch Solution</span>
                </button>
            );
        }
        return (
            <button
                onClick={() => handlePurchase(problemId)}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded-full transition-colors"
            >
                <FiShoppingCart className="w-4 h-4" />
                <span>Buy Solution (${price})</span>
            </button>
        );
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
                <Navbar />
            </nav>

            <div className="container mx-auto  px-4 py-8">
                <div className="mb-8 mt-20">
                    <h1 className="text-3xl font-bold mb-2">Problem Bank</h1>
                    <p className="text-gray-400">Browse problems and purchase video solutions to enhance your learning</p>
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

                        <button className="flex items-center space-x-1 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                            <FiFilter className="w-4 h-4" />
                            <span>Sort</span>
                        </button>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-12 bg-gray-700/50 border-b border-gray-700 p-4 font-medium">
                        <div
                            className="col-span-5 md:col-span-6 flex items-center cursor-pointer"
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
                        <div
                            className="col-span-2 hidden md:flex items-center cursor-pointer"
                            onClick={() => requestSort('category')}
                        >
                            <span>Category</span>
                            {sortConfig.key === 'category' && (
                                <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                            )}
                        </div>

                        <div className="col-span-4 md:col-span-2 text-right">Solution</div>

                    </div>

                    {filteredProblems.length === 0 ? (
                        <div className="p-8 text-center text-gray-400">
                            No problems found matching your criteria
                        </div>
                    ) : (
                        filteredProblems.map((problem) => (
                            <div key={problem._id} className="grid grid-cols-12 border-b border-gray-700 p-4 hover:bg-gray-750 transition-colors">
                                <div className="col-span-5 md:col-span-6">
                                    <h3 className="font-medium text-blue-400">{problem.title}</h3>
                                    <p className="text-sm text-gray-400 line-clamp-1">{problem.description}</p>
                                </div>
                                <div className="col-span-3 md:col-span-2 flex items-center">
                                    <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyBadgeColor(problem.difficulty)}`}>
                                        {problem.difficulty}
                                    </span>
                                </div>
                                <div className="col-span-2 hidden md:flex items-center text-sm text-gray-400">
                                    {problem.category || 'Algorithm'}
                                </div>
                                <div className="col-span-4 md:col-span-2 flex items-center justify-end">
                                    {renderVideoAccess(problem._id)}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <h3 className="font-medium mb-2 flex items-center">
                        <FiCheck className="text-green-400 mr-2" />
                        Premium Video Solutions
                    </h3>
                    <p className="text-sm text-gray-400">
                        Each purchased video solution provides a detailed walkthrough of the problem,
                        explaining multiple approaches and optimizations to help you master the concept.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProblemList;