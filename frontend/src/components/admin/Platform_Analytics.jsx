import React from 'react';
import {
    FiUsers,
    FiActivity,
    FiTrendingUp,
    FiClock,
    FiAward,
    FiThumbsUp,
    FiAlertTriangle,
    FiBarChart2,
    FiCheckCircle,
    FiXCircle
} from 'react-icons/fi';
import AdminNavbar from '../admin/AdminNav';
import { useSelector } from 'react-redux';

const AnalyticsDashboard = ({ users }) => {

    // Dummy data - replace with real API calls
    const analyticsData = {
        userMetrics: {
            totalUsers: 12,
            activeUsers: 5,
            newRegistrations: 5,
            avgSession: '18m 43s'
        },
        problemMetrics: {
            totalProblems: 43,
            mostPopular: 'Two Sum',
            leastPopular: 'N-Queens II',
            highestSuccess: 'Reverse String (92%)',
            lowestSuccess: 'Median of Two Sorted Arrays (23%)'
        },
        contentMetrics: {
            totalVideoSolutions: 87,
            mostWatched: 'Binary Tree Inorder Traversal',
            avgWatchTime: '8m 12s',
            completionRate: '68%'
        },
        activityData: {
            dailySubmissions: [65, 59, 80, 81, 56, 55, 40],
            weeklyActive: [215, 190, 234, 278, 245, 256, 301],
            popularCategories: ['Array', 'String', 'Hash Table', 'Tree', 'Graph']
        }
    };
    const { user } = useSelector((state) => state.auth);
    return (
        <div className="min-h-screen bg-gray-50">
            <nav>
                <AdminNavbar user={user} />
            </nav>

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Platform Analytics</h1>
                    <p className="text-gray-600">Monitor platform performance and user engagement</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500">Total Users</p>
                                <h3 className="text-2xl font-bold">{analyticsData.userMetrics.totalUsers}</h3>
                            </div>
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                <FiUsers className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm text-green-600">
                            <FiTrendingUp className="mr-1" />
                            <span>12.5% from last month</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500">Active Users</p>
                                <h3 className="text-2xl font-bold">{analyticsData.userMetrics.activeUsers}</h3>
                            </div>
                            <div className="p-3 rounded-full bg-green-100 text-green-600">
                                <FiActivity className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm text-green-600">
                            <FiTrendingUp className="mr-1" />
                            <span>8.3% from last week</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500">Problems Solved</p>
                                <h3 className="text-2xl font-bold">24</h3>
                            </div>
                            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                                <FiCheckCircle className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm text-green-600">
                            <FiTrendingUp className="mr-1" />
                            <span>22.1% from last month</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500">Avg. Session</p>
                                <h3 className="text-2xl font-bold">{analyticsData.userMetrics.avgSession}</h3>
                            </div>
                            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                                <FiClock className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm text-red-600">
                            <FiTrendingUp className="mr-1" />
                            <span>2.3% from last week</span>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Daily Submissions</h3>
                        <div className="h-64 flex items-end space-x-2">
                            {analyticsData.activityData.dailySubmissions.map((count, index) => (
                                <div key={index} className="flex-1 flex flex-col items-center">
                                    <div
                                        className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
                                        style={{ height: `${count}px` }}
                                        title={`${count} submissions`}
                                    ></div>
                                    <span className="text-xs mt-1 text-gray-500">
                                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Weekly Active Users</h3>
                        <div className="h-64">
                            <div className="flex h-full items-end space-x-2">
                                {analyticsData.activityData.weeklyActive.map((count, index) => (
                                    <div key={index} className="flex-1 flex flex-col items-center">
                                        <div
                                            className="w-full bg-green-500 rounded-t hover:bg-green-600 transition-colors"
                                            style={{ height: `${count / 5}px` }}
                                            title={`${count} users`}
                                        ></div>
                                        <span className="text-xs mt-1 text-gray-500">
                                            {['Week 1', 'Week 2', 'Week 3', 'Week 4'][index % 4]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Problem Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                            <FiAward className="mr-2 text-yellow-500" />
                            Problem Statistics
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-gray-500">Total Problems</p>
                                <p className="font-medium">{analyticsData.problemMetrics.totalProblems}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Most Popular</p>
                                <p className="font-medium">{analyticsData.problemMetrics.mostPopular}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Least Popular</p>
                                <p className="font-medium">{analyticsData.problemMetrics.leastPopular}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                            <FiBarChart2 className="mr-2 text-blue-500" />
                            Success Rates
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-gray-500">Highest Success Rate</p>
                                <p className="font-medium">{analyticsData.problemMetrics.highestSuccess}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Lowest Success Rate</p>
                                <p className="font-medium">{analyticsData.problemMetrics.lowestSuccess}</p>
                            </div>
                            <div className="pt-2">
                                <div className="h-2 w-full bg-gray-200 rounded-full">
                                    <div
                                        className="h-2 bg-green-500 rounded-full"
                                        style={{ width: '92%' }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>Easy Problems</span>
                                    <span>92%</span>
                                </div>
                            </div>
                            <div>
                                <div className="h-2 w-full bg-gray-200 rounded-full">
                                    <div
                                        className="h-2 bg-yellow-500 rounded-full"
                                        style={{ width: '64%' }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>Medium Problems</span>
                                    <span>64%</span>
                                </div>
                            </div>
                            <div>
                                <div className="h-2 w-full bg-gray-200 rounded-full">
                                    <div
                                        className="h-2 bg-red-500 rounded-full"
                                        style={{ width: '28%' }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>Hard Problems</span>
                                    <span>28%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                            <FiThumbsUp className="mr-2 text-purple-500" />
                            Content Engagement
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-gray-500">Video Solutions</p>
                                <p className="font-medium">{analyticsData.contentMetrics.totalVideoSolutions}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Most Watched</p>
                                <p className="font-medium">{analyticsData.contentMetrics.mostWatched}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Avg. Watch Time</p>
                                <p className="font-medium">{analyticsData.contentMetrics.avgWatchTime}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Completion Rate</p>
                                <p className="font-medium">{analyticsData.contentMetrics.completionRate}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Problem Categories */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Popular Problem Categories</h3>
                    <div className="flex flex-wrap gap-2">
                        {analyticsData.activityData.popularCategories.map((category, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                                {category}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Attention Needed Section */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                            <FiAlertTriangle className="mr-2 text-red-500" />
                            Attention Needed
                        </h3>
                    </div>
                    <div className="divide-y">
                        <div className="p-4 hover:bg-gray-50 flex justify-between items-center">
                            <div>
                                <p className="font-medium">"Regular Expression Matching"</p>
                                <p className="text-sm text-gray-500">Success rate below 20% - consider adding hints</p>
                            </div>
                            <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm">
                                Review
                            </button>
                        </div>
                        <div className="p-4 hover:bg-gray-50 flex justify-between items-center">
                            <div>
                                <p className="font-medium">15 Problems without solutions</p>
                                <p className="text-sm text-gray-500">Users are requesting video explanations</p>
                            </div>
                            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                                View List
                            </button>
                        </div>
                        <div className="p-4 hover:bg-gray-50 flex justify-between items-center">
                            <div>
                                <p className="font-medium">"Binary Search" video solution</p>
                                <p className="text-sm text-gray-500">Low completion rate (32%) - may be too long</p>
                            </div>
                            <button className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm">
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;