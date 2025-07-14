

// AdminDelete.jsx — Premium Enhanced Version
import { useEffect, useState } from 'react';
import axiosClient from '../utils/axiosClint';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  FiTrash2, FiAlertTriangle, FiLoader,
  FiCheckCircle, FiXCircle, FiFilter
} from 'react-icons/fi';
import { FaRegSadTear } from "react-icons/fa"
import ThreeRingLoader from './ThreeRingLoader';


const AdminDelete = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get('/problem/allProblems');
      setProblems(data.allproblem);

    } catch (err) {
      setError('Failed to fetch problems');
      console.error(err);
      toast.error('Failed to load problems', {
        icon: <FiXCircle className="language-icon text-red-500" />,
        style: {
          background: '#1f2937',
          color: '#fff',
          border: '1px solid #374151'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    confirmAlert({
      overlayClassName: "backdrop-blur-sm",
      customUI: ({ onClose }) => {
        return (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 max-w-md"
          >
            <div className="flex items-center gap-3 mb-4">
              <FiAlertTriangle className="language-icon text-yellow-400 text-2xl" />
              <h3 className="text-xl font-bold text-white">Confirm Deletion</h3>
            </div>
            <p className="text-gray-300 mb-6 font-changa ">
              Are you sure you want to delete this problem? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  onClose();
                  setIsDeleting(true);
                  try {
                    await axiosClient.delete(`/problem/delete/${id}`);
                    setProblems((prev) => prev.filter((p) => p._id !== id));
                    toast.success('Problem deleted successfully', {
                      icon: <FiCheckCircle className="language-icon text-green-400" />,
                      style: {
                        background: '#1f2937',
                        color: '#fff',
                        border: '1px solid #374151'
                      }
                    });
                  } catch (err) {
                    setError('Failed to delete problem');
                    console.error(err);
                    toast.error('Deletion failed', {
                      icon: <FiXCircle className="text-red-500" />,
                      style: {
                        background: '#1f2937',
                        color: '#fff',
                        border: '1px solid #374151'
                      }
                    });
                  } finally {
                    setIsDeleting(false);
                  }
                }}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-colors flex items-center gap-2"
              >
                {isDeleting ? (
                  <FiLoader className="language-icon animate-spin" />
                ) : (
                  <FiTrash2 />
                )}
                Delete
              </button>
            </div>
          </motion.div>
        );
      }
    });
  };

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'All' || problem.difficulty === difficultyFilter;

    return matchesSearch && matchesDifficulty;
  });

  if (loading) {
    return (
      <ThreeRingLoader />
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-md mx-auto my-10 p-6 bg-gradient-to-br from-red-900/50 to-gray-800 rounded-xl shadow-lg border border-red-800/50"
      >
        <div className="flex items-start gap-4">
          <div className="text-red-400 text-2xl">
            <FiAlertTriangle className='language-icon' />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Error Loading Problems</h3>
            <p className="text-gray-300">{error}</p>
            <button
              onClick={fetchProblems}
              className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors flex items-center gap-2"
            >
              <FiLoader className=" language-icon mr-2" />
              Retry
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Problem Management
            </h1>
            <p className="text-gray-400 mt-2">Manage and delete coding problems from the system</p>
          </div>
          <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg border border-gray-700">🔥
            <span className="text-sm font-medium text-gray-300">
              {problems.length} {problems.length === 1 ? 'Problem' : 'Problems'} Total
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700/50 overflow-hidden mb-8"
        >
          <div className="p-4 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search problems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <FiFilter className="text-gray-400" />
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              >
                <option value="All">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </motion.div>

        {filteredProblems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 bg-gray-800/30 rounded-xl border border-dashed border-gray-700"
          >
            <FaRegSadTear className="language-icon  text-5xl text-gray-500 mb-4" />
            <h3 className="text-xl font-medium text-gray-300 mb-2">No problems found</h3>
            <p className="text-gray-500 max-w-md text-center">
              {searchTerm || difficultyFilter !== 'All'
                ? 'Try adjusting your search or filter criteria'
                : 'There are currently no problems in the system'}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700/50 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">#</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Difficulty</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tags</th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  <AnimatePresence>
                    {filteredProblems.map((problem, index) => (
                      <motion.tr
                        key={problem._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-gray-700/20"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                          {problem.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${problem.difficulty === 'Easy'
                              ? 'bg-green-900/50 text-green-400'
                              : problem.difficulty === 'Medium'
                                ? 'bg-yellow-900/50 text-yellow-400'
                                : 'bg-red-900/50 text-red-400'
                              }`}
                          >
                            {problem.difficulty}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-2">
                            {problem.tags.split(',').map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-1  text-xs text-cyan-300 bg-cyan-900/30 rounded-full border border-cyan-700"
                              >
                                {tag.trim()}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(problem._id)}
                            className="text-red-400 hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-red-900/20"
                          >
                            <FiTrash2 className="text-lg" />
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminDelete;

