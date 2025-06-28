import {useEffect,useState} from 'react';
import {NavLink} from 'react-router';
import {useDispatch,useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClint'
import {logoutUser} from '../authSlice'
import {Bookmark,NotebookPen} from 'lucide-react'; 
// const AdminPanel = require("./AdminPanel")

function Homepage() {

  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.auth); // it bring data from store
  const [problems ,setProblems] = useState([]);
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
        // console.log(data);    // for debugging
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



 const handleLogout = () => {
    dispatch(logoutUser());
    setSolvedProblems([]); // Clear solved problems on logout
  };

    const filteredProblems = problems.filter(problem => {
    const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
    const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
    const statusMatch = filters.status === 'all' || 
                      solvedProblems.some(sp => sp._id === problem._id);
    return difficultyMatch && tagMatch && statusMatch;
  });

  // const onadmin = ()=>{
  //  navigate('/admin')
  // }



return (
    <div className="min-h-screen bg-base-200">
      {/* Navigation Bar */}

      <nav className="navbar bg-base-100 shadow-lg px-4">
        <div className="flex-1">
          <NavLink to="/" className="btn btn-ghost text-xl">LeetCode</NavLink>
        </div>

        <div className="flex-none gap-4">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost text-xl font-serif mask-radial-from-neutral-200 capitalize ">
              {user?.name}
            </div>
            <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li><button onClick={handleLogout}>Logout</button></li>
             {user&&user.role==='admin'? <li className='mt-1'><NavLink to="/admin" className=" ">admin</NavLink></li> : null }

              {/* <li className='mt-1'><button>admin</button></li> */}
            </ul>
          </div>
        </div>
      </nav>



      {/* Main Content */}
      <div className="container mx-auto p-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          {/* New Status Filter */}
          <select 
            className="select select-bordered"
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="all">All Problems</option>
            <option value="solved">Solved Problems</option>
          </select>

          <select 
            className="select select-bordered"
            value={filters.difficulty}
            onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select 
            className="select select-bordered"
            value={filters.tag}
            onChange={(e) => setFilters({...filters, tag: e.target.value})}
          >
            <option value="all">All Tags</option>
            <option value="array">Array</option>
            <option value="linkedList">Linked List</option>
            <option value="graph">Graph</option>
            <option value="dp">DP</option>
          </select>
        </div>

{/*  */}

       <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
  <table className="table">
    {/* Table Head */}
    <thead>
      <tr>
        <th>Problem</th>
        <th>Difficulty</th>
        <th>Tags</th>
        <th>Compaines</th>
        <th>Note</th>
        <th>Add to<br/>Sheet</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>
      {filteredProblems.map(problem => (
        <tr key={problem._id}>
          {/* Problem Title with NavLink */}
          <td>
            <NavLink to={`/problem/${problem._id}`} className="hover:text-primary font-medium">
              {problem.title}
            </NavLink>
          </td>

          {/* Difficulty Badge */}
          <td>
            <span className={`badge ${getDifficultyBadgeColor(problem.difficulty)}`}>
              {problem.difficulty}
            </span>
          </td>

          {/* Tags/Companies */}
          <td>
            <span className="badge badge-info">{problem.tags}</span>
          </td>
          {/* Compaines array*/}
          <td className="flex flex-wrap gap-1">
               {problem.companies.map((company, index) => (
                 <span key={index} className={`badge ${getCompanyBadgeColor(company)}`}>
                   {company}
                 </span>
               ))}
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
              <div className="badge badge-success gap-1">
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

)}

const getDifficultyBadgeColor = (difficulty) => {
  if (!difficulty) return 'badge-neutral';
  switch (difficulty.toLowerCase()) {
    case 'easy': return 'badge-success';
    case 'medium': return 'badge-warning';
    case 'hard': return 'badge-error';
    default: return 'badge-neutral';
  }
};

const getCompanyBadgeColor = (companies) => {
  if (!companies) return 'badge-neutral';

  switch (companies) {
    case 'Google':
      return 'badge-rainbow'; // custom class
    case 'Amazon':
      return 'badge-warning';
    case 'Microsoft':
      return 'bg-indigo-800';
    case 'Facebook':
      return 'badge-info';
    case 'Apple':
      return 'bg-gray-700';
    case 'Goldman sachs':
      return 'bg-yellow-500';
    case 'Flipkart':
      return 'badge-warning';
    default:
      return 'badge-ghost';
  }
};


export default Homepage;




