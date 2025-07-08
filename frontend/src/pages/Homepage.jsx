
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClint';
import { Bookmark, NotebookPen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CompanyBadgeCell from '@/components/CompanyDropdown';
import NotePopUp from '@/components/NotePopUp';
import BookmarkButton from '@/components/BookmarkButton';


function Homepage() {
  const { user } = useSelector((state) => state.auth);

  const [activeNoteProblemId, setActiveNoteProblemId] = useState(null);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [bookmarkedProblems, setBookmarkedProblems] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [noteExistsMap, setNoteExistsMap] = useState({});


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

  // Fetch all problems (used when not in bookmark mode)
  const fetchProblems = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get(`/problem/allProblems?page=1`);
      setProblems(data.allproblem || []);
      setPage(1);
      setLastFetchedPage(1);
    } catch (error) {
      console.error('Error fetching problems:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch additional pages
  useEffect(() => {
    if (filters.tag === 'bookmark' || page === 1 || page === lastFetchedPage) return;
    const fetchMore = async () => {
      try {
        const { data } = await axiosClient.get(`/problem/allProblems?page=${page}`);
        setProblems(prev => {
          const seen = new Set(prev.map(p => p._id));
          const newOnes = (data.allproblem || []).filter(p => !seen.has(p._id));
          return [...prev, ...newOnes];
        });

        setLastFetchedPage(page);
      } catch (err) {
        console.error("Pagination fetch error:", err);
      }
    };
    fetchMore();
  }, [page]);
  console.log(problems);


  // Fetch solved problems
  const fetchSolvedProblems = async () => {
    try {
      const { data } = await axiosClient.get('/problem/allsolve');
      setSolvedProblems(data.problemSolved || []);
    } catch (err) {
      console.error('Solved problems fetch error:', err);
    }
  };

  // Fetch all bookmarked problems
  const fetchBookmarks = async () => {
    try {
      const { data } = await axiosClient.get('/book/getmark?populate=true');
      const probs = data.bookmarks.map(b => b.problemId);
      setBookmarkedProblems(probs);
      setBookmarkedIds(probs.map(p => p._id));
    } catch (err) {
      console.error('Bookmark fetch error:', err);
    }
  };

  // Refresh bookmark data (used on toggle)
  const handleBookmarkChange = async () => {
    await fetchBookmarks();
    if (isBookmarkFilterActive) setFilters(prev => ({ ...prev }));
  };

  // Watch for tag filter changes
  useEffect(() => {
    if (isBookmarkFilterActive) {
      fetchBookmarks();
      setProblems(bookmarkedProblems);
    } else {
      fetchProblems();
    }
    if (user) {
      fetchBookmarks();
      fetchSolvedProblems();
    }
  }, [user, filters.tag]);

  useEffect(() => {
    const fetchNotePresence = async () => {
      try {
        const res = await axiosClient.get('/note/allnotes');
        const notes = res.data.notes || [];

        const map = {};
        for (let note of notes) {
          map[note.problemId] = true;
        }

        setNoteExistsMap(map);
      } catch (err) {
        console.error("Failed to fetch note presence:", err);
      }
    };

    if (user) fetchNotePresence();
  }, [user]);

  // Filter logic
  const filteredProblems = isBookmarkFilterActive ? bookmarkedProblems : problems.filter(problem => {
    const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
    const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
    const companyMatch = filters.companies === 'all' || problem.companies.includes(filters.companies);
    const statusMatch = filters.status === 'all' || solvedProblems.some(sp => sp._id === problem._id);
    return difficultyMatch && tagMatch && companyMatch && statusMatch;
  });

  // Badge coloring utility
  const getDifficultyBadgeColor = (difficulty) => {
    switch ((difficulty || '').toLowerCase()) {
      case 'easy':
        return 'px-3 py-1 text-sm  rounded-full bg-green-500/10 text-green-400 border border-green-400 shadow-md backdrop-blur-sm';
      case 'medium':
        return 'px-3 py-1 text-sm  rounded-full bg-yellow-200/10 text-yellow-300 border border-yellow-400 shadow-md backdrop-blur-sm';
      case 'hard':
        return 'px-3 py-1 text-sm  rounded-full bg-red-500/10 text-red-400 border border-red-500 shadow-md backdrop-blur-sm';
      default:
        return 'px-3 py-1 text-sm  rounded-full bg-gray-600/10 text-gray-300 border border-gray-500 shadow-md backdrop-blur-sm';
    }
  };


  return (
    <div className="min-h-screen bg-black pb-52">
      <nav className='text-gray-400 h-20'>
        <Navbar />
      </nav>

      <div className="container mx-auto p-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Status Filter */}
          <select
            className="select select-bordered text-gray-300 font-changa rounded-full"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="all">All Problems</option>
            <option value="solved">Solved Problems</option>
          </select>

          {/* Difficulty Filter */}
          <select
            className="select select-bordered text-gray-300 font-changa rounded-full"
            value={filters.difficulty}
            onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
          >
            <option value="all">Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          {/* Tag Filter */}
          <select
            className="select select-bordered text-gray-300 font-changa rounded-full"
            value={filters.tag}
            onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
          >
            <option value="all">Tags</option>
            <option value="array">Array</option>
            <option value="linkedList">Linked List</option>
            <option value="graph">Graph</option>
            <option value="dynamic programming">DP</option>
            <option value="backtracking" >Backtracking</option>
            <option value="string">String</option>
          </select>

          {/* Company Filter */}
          <select
            className="select select-bordered text-gray-300 font-changa rounded-full"
            value={filters.companies}
            onChange={(e) => setFilters({ ...filters, companies: e.target.value })}
          >
            <option value="all">Companies</option>
            <option value="Google">Google</option>
            <option value="TCS">TCS</option>
            <option value="Microsoft">Microsoft</option>
            <option value="Facebook">Facebook</option>
            <option value="Apple">Apple</option>
            <option value="Netflix">Netflix</option>
            <option value="Goldman Sachs">Goldman Sachs</option>
          </select>

          {/* Bookmark Toggle */}
          <button
            className={`px-4 py-2 rounded-full border flex mt-1 font-changa transition ${isBookmarkFilterActive
              ? 'bg-blue-600 text-white border-blue-600'
              : 'border-gray-500 text-gray-300 hover:bg-gray-700'
              }`}
            onClick={() => {
              setFilters({ ...filters, tag: isBookmarkFilterActive ? 'all' : 'bookmark' });
            }}
          >
            {isBookmarkFilterActive ? 'Bookmarked' : 'Show Bookmarks'} <Bookmark />
          </button>
        </div>

        {/* Problem Table */}
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-gray-900">
          <table className="table">
            <thead className='font-aladin text-lg text-gray-300 bg-gray-800'>
              <tr>
                <th>Problem</th>
                <th>Difficulty</th>
                <th>Tags</th>
                <th className='text-center'>Companies</th>
                <th>Note</th>
                <th>Add to<br />Sheet</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredProblems.map(problem => (
                <tr key={problem._id}>
                  <td>
                    <NavLink to={`/problem/${problem._id}`} className="hover:text-yellow-500 font-changa text-lg text-gray-300">
                      {problem.title}
                    </NavLink>
                  </td>
                  <td><span className={`badge ${getDifficultyBadgeColor(problem.difficulty)}`}>{problem.difficulty}</span></td>

                  <td>
                    <span className="px-3 py-1 rounded-full text-sm tracking-wide 
                                     text-white bg-gradient-to-r from-purple-600/80 via-indigo-500/80 to-blue-500/80 
                                     border border-green-400/60 shadow-md">
                      {problem.tags}
                    </span>

                  </td>

                  <td className="flex flex-wrap gap-1 justify-center">
                    <CompanyBadgeCell companies={problem.companies} />
                  </td>

                  <td>
                    <button className="text-sm text-blue-500 underline ml-2" onClick={() => setActiveNoteProblemId(problem._id)}>
                      <NotebookPen
                        size={24}
                        strokeWidth={20}
                        className={noteExistsMap[problem._id] ? 'notebook-filled' : undefined} />
                    </button>
                  </td>

                  <td>
                    <BookmarkButton problemId={problem._id} user={user} onBookmarkChange={handleBookmarkChange} />
                  </td>

                  <td>
                    <NavLink to={`/problem/${problem._id}`}>
                      {solvedProblems.some(sp => sp._id === problem._id) ? (
                        <div className="badge badge-success gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Solved
                        </div>
                      ) : (
                        <span className="badge badge-ghost">Unsolved</span>
                      )}
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-8">
          <button
            className="relative overflow-hidden px-6 py-3 rounded-full text-sm font-changa tracking-wider text-white bg-gradient-to-r from-gray-600 to-gray-400 shadow-[0_6px_25px_rgba(128,0,255,0.5)] transition-all duration-700 hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:shadow-[0_6px_25px_rgba(255,100,200,0.6)] hover:scale-105 active:scale-95"
            onClick={() => setPage(prev => prev + 1)}
            disabled={loading}
          >
            {loading ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full inline-block" /> : "Load More"}
          </button>
        </div>
      </div>

      {/* Note Popup */}
      {activeNoteProblemId && (
        <NotePopUp problemId={activeNoteProblemId} onClose={() => setActiveNoteProblemId(null)} />
      )}
    </div>
  );
}

export default Homepage;
