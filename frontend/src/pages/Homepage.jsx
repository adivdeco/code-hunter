import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClint'
import { Bookmark, NotebookPen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CompanyBadgeCell from '@/components/CompanyDropdown';
import NotePopUp from '@/components/NotePopUp'



function Homepage() {

  const [activeNoteProblemId, setActiveNoteProblemId] = useState(null);
  // const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // it bring data from store
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(1);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    tag: 'all',
    status: 'all',
    companies: 'all'
  });

  const [loading, setLoading] = useState(false);
  const [lastFetchedPage, setLastFetchedPage] = useState(0);

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      if (page === lastFetchedPage) return;

      try {
        const { data } = await axiosClient.get(`/problem/allProblems?page=${page}`);
        // setProblems(prev => [...prev, ...(data.allproblem || [])]);
        setProblems(prev => {
          const existingIds = new Set(prev.map(p => p._id));
          const newOnes = (data.allproblem || []).filter(p => !existingIds.has(p._id));
          return [...prev, ...newOnes];
        });

        setLastFetchedPage(page); // ✅ Mark this page as fetched
        console.log("Fetched page:", page, data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/allsolve');
        setSolvedProblems(data.problemSolved || []);

      } catch (error) {
        console.error('Error fetching solved problems:', error);
      }
    };

    fetchProblems();
    if (user) fetchSolvedProblems();
  }, [user, page]);





  const filteredProblems = problems.filter(problem => {
    const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
    const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
    const companies = filters.companies === 'all' || problem.companies.includes(filters.companies);
    const statusMatch = filters.status === 'all' ||
      solvedProblems.some(sp => sp._id === problem._id);
    return difficultyMatch && tagMatch && statusMatch && companies;
  });




  return (

    <div className="min-h-screen  bg-black pb-52">

      {/* Navigation Bar */}

      <nav className=' text-gray-400 h-20  '>
        <Navbar />
      </nav>


      {/* Main Content */}
      <div className="container mx-auto p-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          {/* New Status Filter */}

          <select
            className="select select-bordered text-gray-300 font-changa rounded-full"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="all">All Problems</option>
            <option value="solved">Solved Problems</option>
          </select>

          <select
            className="select select-bordered  text-gray-300 font-changa rounded-full"
            value={filters.difficulty}
            onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
          >
            <option value="all">Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select
            className="select select-bordered text-gray-300 font-changa rounded-full"
            value={filters.tag}
            onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
          >
            <option value="all">Tags</option>
            <option value="array">Array</option>
            <option value="linkedList">Linked List</option>
            <option value="graph">Graph</option>
            <option value="dp">DP</option>
          </select>

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

            {/* <option value=""></option>
            <option value=""></option>
            <option value=""></option> */}


          </select>

          <button
            className={`px-4 py-2 rounded-full border flex mt-1 font-changa transition 
              ${filters.tag === 'bookmark'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-500 text-gray-300 hover:bg-gray-700'}
              `}
            onClick={() => {
              setFilters({
                ...filters,
                tag: filters.tag === 'bookmark' ? 'all' : 'bookmark',
              });
            }}
          >
            {filters.tag === 'bookmark' ? 'Bookmark' : 'Bookmark'} <Bookmark />
          </button>


        </div>

        {/* mani data */}

        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-gray-900">
          <table className="table">
            {/* Table Head */}
            <thead className='font-aladin text-lg text-gray-300 bg-gray-800 '>
              <tr>
                <th>Problem</th>
                <th>Difficulty</th>
                <th>Tags</th>
                <th className='text-center'>Compaines</th>
                <th>Note</th>
                <th>Add to<br />Sheet</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredProblems.map(problem => (
                <tr key={problem._id}>
                  {/* Problem Title with NavLink */}
                  <td>
                    <NavLink to={`/problem/${problem._id}`} className="hover:text-white font-changa font-medium text-gray-300 ">
                      {problem.title}
                    </NavLink>
                  </td>

                  {/* Difficulty Badge */}
                  <td>
                    <span className={`badge ${getDifficultyBadgeColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                  </td>

                  {/* Tags */}
                  <td>
                    <span className="badge badge-info ">{problem.tags}</span>
                  </td>

                  {/* Companies */}
                  <td className="relative flex flex-wrap gap-1 justify-center">
                    <CompanyBadgeCell companies={problem.companies} />
                  </td>

                  {/* Notes */}
                  <td >
                    <button
                      className="text-sm text-blue-500 underline ml-2"
                      onClick={() => setActiveNoteProblemId(problem._id)}
                    >
                      <NotebookPen />
                    </button>

                  </td>

                  {/* Placeholder for Add to Sheet */}
                  <td>
                    <button className=" "><Bookmark /></button>
                  </td>

                  {/* Solved Status */}
                  <td>
                    {solvedProblems.some(sp => sp._id === problem._id) ? (
                      <div className="badge badge-success gap-1 ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Solved
                      </div>
                    ) : (
                      <span className="badge badge-ghost">Unsolved</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        <div className="flex justify-center mt-8">
          <button
            className="relative overflow-hidden px-6 py-3 rounded-full text-sm font-changa hover:font-chango tracking-wider text-white 
               bg-gradient-to-r from-gray-600  to-gray-400 
               shadow-[0_6px_25px_rgba(128,0,255,0.5)] 
               transition-all duration-700 ease-in-out 
               hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 
               hover:shadow-[0_6px_25px_rgba(255,100,200,0.6)] 
               hover:scale-105 active:scale-95"
            onClick={() => setPage(prev => prev + 1)}
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full inline-block" />
            ) : (
              "Load More"
            )}
          </button>
        </div>




      </div>
      {activeNoteProblemId && (
        <NotePopUp
          problemId={activeNoteProblemId}
          onClose={() => setActiveNoteProblemId(null)}
        />
      )}
    </div>

  )
}

const getDifficultyBadgeColor = (difficulty) => {
  if (!difficulty) return 'badge-soft badge-neutral';
  switch (difficulty.toLowerCase()) {
    case 'easy': return 'badge-soft badge-success';
    case 'medium': return 'badge-soft badge-warning';
    case 'hard': return 'badge-soft badge-error';
    default: return 'badge-soft badge-neutral';
  }
};






export default Homepage;




