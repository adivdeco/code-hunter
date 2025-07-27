// import {
//     HomeIcon,
//     PuzzlePieceIcon,
//     TrophyIcon,
//     UsersIcon,
//     CogIcon,
//     MoonIcon,
//     SunIcon
// } from '@heroicons/react/24/outline'
// import { MdLeaderboard } from "react-icons/md";


// export default function Sidebar({ darkMode, setDarkMode, user }) {


//     return (
//         <div className="hidden md:flex md:flex-shrink-0">
//             <div className="flex flex-col w-14 hover:w-56 transition-all mt-3 duration-700 ease-in-out h-screen border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black group">
//                 {/* Logo - Creative Animated SVG */}

//                 <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-gray-800">


//                 </div>

//                 {/* Navigation - Using react-icons for elegant icons */}
//                 <div className="flex flex-col flex-grow p-2 overflow-y-auto">
//                     <nav className="flex-1 space-y-1">
//                         {[
//                             {
//                                 name: 'Home',
//                                 icon: <HomeIcon className="h-5 w-5" />,
//                                 active: false,
//                                 link: "/"
//                             },
//                             {
//                                 name: 'Problems',
//                                 icon: <PuzzlePieceIcon className="h-5 w-5" />,
//                                 active: false,
//                                 link: "/problems"
//                             },
//                             {
//                                 name: 'Contests',
//                                 icon: <TrophyIcon className="h-5 w-5" />,
//                                 active: false,
//                                 link: "/contest"
//                             },
//                             {
//                                 name: 'Discuss',
//                                 icon: <UsersIcon className="h-5 w-5" />,
//                                 active: false,
//                                 link: "/duscission"
//                             },
//                             {
//                                 name: 'Leaderboard',
//                                 icon: <MdLeaderboard className="h-5 w-5" />,
//                                 active: false,
//                                 link: "/leaderbord"
//                             },
//                             {
//                                 name: 'Settings',
//                                 icon: <CogIcon className="h-5 w-5" />,
//                                 active: false,
//                                 link: '/setting'
//                             },
//                         ].map((item) => (
//                             <a
//                                 key={item.name}
//                                 href={item?.link || "#"}
//                                 className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${item.active
//                                     ? 'bg-indigo-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400'
//                                     : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
//                                     }`}
//                             >
//                                 <span className="flex-shrink-0">{item.icon}</span>
//                                 <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
//                                     {item.name}
//                                 </span>
//                             </a>
//                         ))}
//                     </nav>

//                     {/* Bottom Section - Dark Mode Toggle & User Profile */}
//                     <div className="mt-auto space-y-2 pt-4">
//                         <div className='flex text-center justify-around'>
//                             <button
//                                 onClick={() => setDarkMode(!darkMode)}
//                                 className="flex  items-center w-full px-3 py-3 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors language-icon duration-200"
//                             >
//                                 {darkMode ? (
//                                     <SunIcon className="h-5 language-icon w-5" />
//                                 ) : (
//                                     <MoonIcon className="h-5 language-icon w-5" />
//                                 )}

//                             </button>
//                             <span className="absolute mr-8 mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white  duration-200 whitespace-nowrap ">
//                                 {darkMode ? 'Light Mode' : 'Dark Mode'}
//                             </span>
//                         </div>
//                         <div className="flex items-center px-3 py-3">
//                             <div className="relative opacity-0 group-hover:opacity-100">
//                                 <img
//                                     src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user.avatar}`}
//                                     alt={`${user.name}'s avatar`}
//                                     className="w-14 h-14  rounded-full "
//                                 />
//                                 <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-900"></span>
//                             </div>
//                             <div className="ml-3 overflow-hidden opacity-0 group-hover:opacity-100 font-changa transition-opacity duration-300">
//                                 <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.name || 0}</p>
//                                 <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Pro Member</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

import { NavLink } from 'react-router-dom'; // <-- STEP 1: Import NavLink for client-side routing
import {
    HomeIcon,
    PuzzlePieceIcon,
    TrophyIcon,
    UsersIcon,
    CogIcon,
    MoonIcon,
    SunIcon
} from '@heroicons/react/24/outline';
import { MdLeaderboard } from "react-icons/md";


export default function Sidebar({ darkMode, setDarkMode, user }) {

    // This function provides dynamic classes for the active link, it's cleaner than a ternary inside the JSX
    const getLinkClassName = ({ isActive }) => {
        const baseClasses = 'flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200';
        if (isActive) {
            return `${baseClasses} bg-indigo-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400`;
        }
        return `${baseClasses} text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white`;
    };

    return (
        <div className="hidden md:flex md:flex-shrink-0">
            <div className="flex flex-col w-14 hover:w-56 transition-all mt-3 duration-700 ease-in-out h-screen border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black group">
                {/* Logo Area */}
                <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-gray-800">
                    {/* Your Logo SVG or Component can go here */}
                </div>

                {/* Navigation Links - Now Hard-coded with NavLink */}
                <div className="flex flex-col flex-grow p-2 overflow-y-auto">
                    <nav className="flex-1 space-y-1">

                        {/* Home Link */}
                        <NavLink to="/" className={getLinkClassName}>
                            <span className="flex-shrink-0"><HomeIcon className="h-5 w-5" /></span>
                            <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                Home
                            </span>
                        </NavLink>

                        {/* Problems Link */}
                        <NavLink to="/problems" className={getLinkClassName}>
                            <span className="flex-shrink-0"><PuzzlePieceIcon className="h-5 w-5" /></span>
                            <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                Problems
                            </span>
                        </NavLink>

                        {/* Contests Link */}
                        <NavLink to="/contest" className={getLinkClassName}>
                            <span className="flex-shrink-0"><TrophyIcon className="h-5 w-5" /></span>
                            <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                Contests
                            </span>
                        </NavLink>

                        {/* Discuss Link (typo corrected) */}
                        <NavLink to="/discussion" className={getLinkClassName}>
                            <span className="flex-shrink-0"><UsersIcon className="h-5 w-5" /></span>
                            <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                Discuss
                            </span>
                        </NavLink>

                        {/* Leaderboard Link (typo corrected) */}
                        <NavLink to="/leaderboard" className={getLinkClassName}>
                            <span className="flex-shrink-0"><MdLeaderboard className="h-5 w-5" /></span>
                            <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                Leaderboard
                            </span>
                        </NavLink>

                        {/* Settings Link */}
                        <NavLink to="/setting" className={getLinkClassName}>
                            <span className="flex-shrink-0"><CogIcon className="h-5 w-5" /></span>
                            <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                Settings
                            </span>
                        </NavLink>

                    </nav>

                    {/* Bottom Section - Dark Mode Toggle & User Profile */}
                    <div className="mt-auto space-y-2 pt-4">
                        <div className="relative">
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="flex w-full items-center px-3 py-3 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                            >
                                {darkMode ? (
                                    <SunIcon className="h-5 w-5" />
                                ) : (
                                    <MoonIcon className="h-5 w-5" />
                                )}
                                <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                                </span>
                            </button>
                        </div>
                        <div className="flex items-center px-3 py-3 border-t border-gray-200 dark:border-gray-800">
                            <div className="flex-shrink-0">
                                <img
                                    src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user.avatar || 'default'}`}
                                    alt={`${user.name}'s avatar`}
                                    className="w-8 h-8 rounded-full"
                                />
                                <span className="absolute bottom-3 left-10 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-black"></span>
                            </div>
                            <div className="ml-3 overflow-hidden opacity-0 group-hover:opacity-100 font-changa transition-opacity duration-300">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.name || 'Guest'}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Pro Member</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}