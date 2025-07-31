
import { useEffect, useState, useMemo, useCallback } from 'react';
import { NavLink } from 'react-router';
import { useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClint';
import { Bookmark, NotebookPen, Filter, Loader2, CheckCircle, XCircle, Plus } from 'lucide-react';
import debounce from 'lodash.debounce';
import Navbar from '@/components/Navbar';
import CompanyBadgeCell from '@/components/CompanyDropdown';
import NotePopUp from '@/components/NotePopUp';
import BookmarkButton from '@/components/BookmarkButton';
import { motion, AnimatePresence } from 'framer-motion';

// Constants for filter options
const DIFFICULTY_OPTIONS = [
  { value: 'all', label: 'All Difficulties' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' }
];

const TAG_OPTIONS = [
  { value: 'all', label: 'All Tags' },
  { value: 'array', label: 'Array' },
  { value: 'linkedList', label: 'Linked List' },
  { value: 'graph', label: 'Graph' },
  { value: 'dynamic programming', label: 'DP' },
  { value: 'backtracking', label: 'Backtracking' },
  { value: 'string', label: 'String' }
];

const COMPANY_OPTIONS = [
  { value: 'all', label: 'All Companies' },
  { value: 'Google', label: 'Google' },
  { value: 'TCS', label: 'TCS' },
  { value: 'Microsoft', label: 'Microsoft' },
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Apple', label: 'Apple' },
  { value: 'Netflix', label: 'Netflix' },
  { value: 'Goldman Sachs', label: 'Goldman Sachs' }
];

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Problems' },
  { value: 'solved', label: 'Solved Problems' }
];

function Homepage() {
  const { user } = useSelector((state) => state.auth);
  const [activeNoteProblemId, setActiveNoteProblemId] = useState(null);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [bookmarkedProblems, setBookmarkedProblems] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [noteExistsMap, setNoteExistsMap] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [filters, setFilters] = useState({
    difficulty: 'all',
    tag: 'all',
    status: 'all',
    companies: 'all',
  });

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastFetchedPage, setLastFetchedPage] = useState(0);

  const isBookmarkFilterActive = filters.tag === 'bookmark';

  // Memoized difficulty badge colors
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

  // Debounced search handler
  const handleSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
    }, 300),
    []
  );

  // Fetch problems with pagination
  const fetchProblems = useCallback(async (pageNum = 1, reset = false) => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get(`/problem/allProblems?page=${pageNum}`);

      if (reset) {
        setProblems(data.allproblem || []);
        setPage(1);
      } else {
        setProblems(prev => {
          const newProblems = data.allproblem || [];
          if (newProblems.length === 0) {
            setHasMore(false);
            return prev;
          }
          const seen = new Set(prev.map(p => p._id));
          const filteredNew = newProblems.filter(p => !seen.has(p._id));
          return [...prev, ...filteredNew];
        });
      }

      setLastFetchedPage(pageNum);
    } catch (error) {
      console.error('Error fetching problems:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch solved problems
  const fetchSolvedProblems = useCallback(async () => {
    if (!user) return;
    try {
      const { data } = await axiosClient.get('/problem/allsolve');
      setSolvedProblems(data.problemSolved || []);
    } catch (err) {
      console.error('Solved problems fetch error:', err);
    }
  }, [user]);

  // Fetch bookmarked problems
  const fetchBookmarks = useCallback(async () => {
    if (!user) return;
    try {
      const { data } = await axiosClient.get('/book/getmark?populate=true');
      const probs = data.bookmarks.map(b => b.problemId);
      setBookmarkedProblems(probs);
      setBookmarkedIds(probs.map(p => p._id));
    } catch (err) {
      console.error('Bookmark fetch error:', err);
    }
  }, [user]);

  // Handle bookmark changes
  const handleBookmarkChange = useCallback(async () => {
    await fetchBookmarks();
    if (isBookmarkFilterActive) {
      setFilters(prev => ({ ...prev }));
    }
  }, [isBookmarkFilterActive, fetchBookmarks]);

  // Fetch note presence
  const fetchNotePresence = useCallback(async () => {
    if (!user) return;
    try {
      const res = await axiosClient.get('/note/allnotes');
      const notes = res.data.notes || [];
      const map = {};
      notes.forEach(note => { map[note.problemId] = true; });
      setNoteExistsMap(map);
    } catch (err) {
      console.error("Failed to fetch note presence:", err);
    }
  }, [user]);



  // Initial data load
  useEffect(() => {
    fetchProblems(1, true);
    if (user) {
      fetchSolvedProblems();
      fetchBookmarks();
      fetchNotePresence();
    }
  }, [user, fetchProblems, fetchSolvedProblems, fetchBookmarks, fetchNotePresence]);

  // Load more problems when page changes
  useEffect(() => {
    if (isBookmarkFilterActive || page === 1 || page === lastFetchedPage || !hasMore) return;
    fetchProblems(page);
  }, [page, isBookmarkFilterActive, lastFetchedPage, hasMore, fetchNotePresence, fetchProblems]);


  // Filter problems based on current filters and search query
  // const filteredProblems = useMemo(() => {
  //   let baseProblems = isBookmarkFilterActive ? bookmarkedProblems : problems;

  //   return baseProblems.filter(problem => {
  //     // Filter by search query
  //     if (searchQuery && !problem.title.toLowerCase().includes(searchQuery.toLowerCase())) {
  //       return false;
  //     }

  //     // Filter by difficulty
  //     if (filters.difficulty !== 'all' && problem.difficulty !== filters.difficulty) {
  //       return false;
  //     }

  //     // Filter by tag
  //     if (filters.tag !== 'all' && problem.tags !== filters.tag) {
  //       return false;
  //     }

  //     // Filter by company
  //     if (filters.companies !== 'all' && !problem.companies.includes(filters.companies)) {
  //       return false;
  //     }

  //     // Filter by status
  //     if (filters.status !== 'all' && !solvedProblems.some(sp => sp._id === problem._id)) {
  //       return false;
  //     }

  //     return true;
  //   });
  // }, [
  //   isBookmarkFilterActive,
  //   bookmarkedProblems,
  //   problems,
  //   filters,
  //   solvedProblems,
  //   searchQuery
  // ]);

  // Reset pagination when filters change
  // Filter logic
  const filteredProblems = isBookmarkFilterActive ? bookmarkedProblems : problems.filter(problem => {
    const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
    const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
    const companyMatch = filters.companies === 'all' || problem.companies.includes(filters.companies);
    const statusMatch = filters.status === 'all' || solvedProblems.some(sp => sp._id === problem._id);
    // if (searchQuery && !problem.title.toLowerCase().includes(searchQuery.toLowerCase())) {
    //   return false;
    // }
    const searchquery = problem.title.toLowerCase().includes(searchQuery.toLowerCase())
    return difficultyMatch && tagMatch && companyMatch && statusMatch && searchquery;
  });

  useEffect(() => {
    setPage(1);
    setLastFetchedPage(0);
    setHasMore(true);
  }, [filters, isBookmarkFilterActive]);

  // Table row animation variants
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -100 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pb-20 ">
      {/* Decorative elements */}
      {/* <div className="fixed top-0 left-0 w-full h-full overflow-hidden opacity-100 ">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600  rounded-full mix-blend-overlay blur-3xl filter  opacity-15 animate-blob"></div>
        <div className="absolute top-0 right-20 w-96 h-80 bg-cyan-600 rounded-full mix-blend-soft-light blur-3xl filter  opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 right-96 w-96 h-96 bg-blue-600 rounded-full mix-blend-overlay blur-3xl filter  opacity-20 animate-blob animation-delay-4000"></div>
      </div> */}

      <nav className='text-white'>
        <Navbar className="text-white" />

      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 z-50">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-stretch ">
          {/* Search Input */}
          <div className="relative flex-grow mt-20">
            <input
              type="text"
              placeholder="Search problems..."
              className="w-full px-6 py-3 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <div className="absolute right-3 top-3 text-gray-400">
              {loading ? <Loader2 className="animate-spin" /> : null}
            </div>
          </div>

          {/* Mobile Filter Button */}
          <button
            className="md:hidden px-4 py-3 rounded-full bg-gray-800 text-white flex items-center justify-center gap-2"
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
          >
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>

        {/* Filter Controls */}
        <div className={`${isFilterMenuOpen ? 'block' : 'hidden'} md:block mb-8 z-50`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Status Filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
              <select
                className="w-full px-4 py-2 rounded-full bg-gray-800 border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                {STATUS_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-1">Difficulty</label>
              <select
                className="w-full px-4 py-2 rounded-full bg-gray-800 border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                value={filters.difficulty}
                onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
              >
                {DIFFICULTY_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Tag Filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-1">Tag</label>
              <select
                className="w-full px-4 py-2 rounded-full bg-gray-800 border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                value={filters.tag}
                onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
              >
                {TAG_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Company Filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-1">Company</label>
              <select
                className="w-full px-4 py-2 rounded-full bg-gray-800 border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                value={filters.companies}
                onChange={(e) => setFilters({ ...filters, companies: e.target.value })}
              >
                {COMPANY_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Bookmark Toggle */}
            <div className="flex items-end">
              <button
                className={`w-full px-4 py-2 rounded-full border flex items-center justify-center gap-2 transition ${isBookmarkFilterActive
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-500 text-gray-300 hover:bg-gray-700'
                  }`}
                onClick={() => {
                  setFilters({ ...filters, tag: isBookmarkFilterActive ? 'all' : 'bookmark' });
                }}
              >
                <Bookmark size={18} />
                <span>{isBookmarkFilterActive ? 'Bookmarked' : 'Bookmarks'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Problem Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900 shadow-lg">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Problem</th>
                <th className="px-4 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Difficulty</th>
                <th className="px-4 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Tags</th>
                <th className="px-4 py-4 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">Companies</th>
                <th className="px-4 py-4 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">Note</th>
                <th className="px-4 py-4 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">Bookmark</th>
                <th className="px-4 py-4 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-800 z-50">
              <AnimatePresence>
                {filteredProblems.length > 0 ? (
                  filteredProblems.map((problem) => (
                    <motion.tr
                      key={problem._id}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      className="hover:bg-gray-800/50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <NavLink
                            to={`/problem/${problem._id}`}
                            className="text-gray-300 hover:text-blue-400 font-medium transition-colors"
                          >
                            {problem.title}
                          </NavLink>
                          {problem.Demo && (
                            <span class="
    inline-flex items-center 
    rounded-full 
    px-3 py-1 
    text-xs font-bold 
    bg-gradient-to-br from-purple-500 to-pink-600/80 
    text-white 
    ring-1 ring-inset ring-purple-500/20 
    shadow-[0_0_10px_theme(colors.purple.500)]
  ">
                              Demo
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyBadgeColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                          {problem.tags}
                        </span>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1 justify-center">
                          <CompanyBadgeCell companies={problem.companies} />
                        </div>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => setActiveNoteProblemId(problem._id)}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                          aria-label="Add note"
                        >
                          <NotebookPen
                            size={20}
                            className={noteExistsMap[problem._id] ? 'notebook-filled' : undefined}
                          />
                        </button>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <BookmarkButton
                          problemId={problem._id}
                          user={user}
                          onBookmarkChange={handleBookmarkChange}
                        />
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <NavLink to={`/problem/${problem._id}`}>
                          {solvedProblems.some(sp => sp._id === problem._id) ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-900/50 text-green-400">
                              <CheckCircle className="mr-1 h-4 w-4" />
                              Solved
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-700/50 text-gray-400">
                              <XCircle className="mr-1 h-4 w-4" />
                              Unsolved
                            </span>
                          )}
                        </NavLink>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-800/50"
                  >
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-400">
                      {loading ? (
                        <div className="flex justify-center">
                          <Loader2 className="animate-spin h-8 w-8 text-blue-400" />
                        </div>
                      ) : (
                        <div>
                          <p className="text-lg">No problems found matching your criteria</p>
                          <button
                            onClick={() => {
                              setFilters({
                                difficulty: 'all',
                                tag: 'all',
                                status: 'all',
                                companies: 'all',
                              });
                              setSearchQuery('');
                            }}
                            className="mt-4 px-4 py-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            Reset filters
                          </button>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Load More Button */}
        {filteredProblems.length > 0 && hasMore && !isBookmarkFilterActive && (
          <div className="flex justify-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPage(prev => prev + 1)}
              disabled={loading}
              className="relative overflow-hidden px-6 py-3 rounded-full font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg transition-all"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin h-5 w-5" />
                  Loading...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Plus size={18} />
                  Load More Problems
                </span>
              )}
              <motion.span
                className="absolute inset-0 bg-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: loading ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        )}
      </div>

      {/* Note Popup */}
      <AnimatePresence>
        {activeNoteProblemId && (
          <NotePopUp
            problemId={activeNoteProblemId}
            onClose={() => setActiveNoteProblemId(null)}
            onNoteSaved={() => {
              fetchNotePresence();
              setActiveNoteProblemId(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Homepage;
