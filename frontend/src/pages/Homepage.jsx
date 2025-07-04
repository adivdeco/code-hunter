import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClint'
// import { logoutUser } from '../authSlice'
import { Bookmark, NotebookPen } from 'lucide-react';
import Navbar from '@/components/Navbar';
// const AdminPanel = require("./AdminPanel")
// import CompanyDropdown from '@/components/CompanyDropdown';
import CompanyBadgeCell from '@/components/CompanyDropdown';


function Homepage() {

  // const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // it bring data from store
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    tag: 'all',
    status: 'all'
  });

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/allProblems');
        setProblems(Array.isArray(data) ? data : data.allproblem || []);
        // setProblems(data)
        console.log(data);    // for debugging
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/allsolve');
        setSolvedProblems(data.problemSolved || []);
        // setSolvedProblems(data)
      } catch (error) {
        console.error('Error fetching solved problems:', error);
      }
    };

    fetchProblems();  // can be call in all condition 
    if (user) fetchSolvedProblems();   // only when user is prnst
  }, [user]);



  // const handleLogout = () => {
  //   dispatch(logoutUser());
  //   setSolvedProblems([]); // Clear solved problems on logout
  // };

  const filteredProblems = problems.filter(problem => {
    const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
    const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
    const statusMatch = filters.status === 'all' ||
      solvedProblems.some(sp => sp._id === problem._id);
    return difficultyMatch && tagMatch && statusMatch;
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
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select
            className="select select-bordered text-gray-300 font-changa rounded-full"
            value={filters.tag}
            onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
          >
            <option value="all">All Tags</option>
            <option value="array">Array</option>
            <option value="linkedList">Linked List</option>
            <option value="graph">Graph</option>
            <option value="dp">DP</option>
          </select>
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

                  {/* Placeholder for Notes */}
                  <td>
                    <NotebookPen />
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
      </div>
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




