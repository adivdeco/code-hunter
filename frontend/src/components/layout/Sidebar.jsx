import {
    HomeIcon,
    PuzzlePieceIcon,
    TrophyIcon,
    UsersIcon,
    CogIcon,
    MoonIcon,
    SunIcon
} from '@heroicons/react/24/outline'
import { MdLeaderboard } from "react-icons/md";


export default function Sidebar({ darkMode, setDarkMode, user }) {


    return (
        <div className="hidden md:flex md:flex-shrink-0">
            <div className="flex flex-col w-14 hover:w-56 transition-all mt-3 duration-700 ease-in-out h-screen border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black group">
                {/* Logo - Creative Animated SVG */}

                <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-gray-800">


                </div>

                {/* Navigation - Using react-icons for elegant icons */}
                <div className="flex flex-col flex-grow p-2 overflow-y-auto">
                    <nav className="flex-1 space-y-1">
                        {[
                            {
                                name: 'Home',
                                icon: <HomeIcon className="h-5 w-5" />,
                                active: false,
                                link: "/"
                            },
                            {
                                name: 'Problems',
                                icon: <PuzzlePieceIcon className="h-5 w-5" />,
                                active: false,
                                link: "/problems"
                            },
                            {
                                name: 'Contests',
                                icon: <TrophyIcon className="h-5 w-5" />,
                                active: false,
                                link: "/contest"
                            },
                            {
                                name: 'Discuss',
                                icon: <UsersIcon className="h-5 w-5" />,
                                active: false
                            },
                            {
                                name: 'Leaderboard',
                                icon: <MdLeaderboard className="h-5 w-5" />,
                                active: false,
                                link: "/leaderbord"
                            },
                            {
                                name: 'Settings',
                                icon: <CogIcon className="h-5 w-5" />,
                                active: false,
                                link: '/setting'
                            },
                        ].map((item) => (
                            <a
                                key={item.name}
                                href={item?.link || "#"}
                                className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${item.active
                                    ? 'bg-indigo-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400'
                                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                <span className="flex-shrink-0">{item.icon}</span>
                                <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                    {item.name}
                                </span>
                            </a>
                        ))}
                    </nav>

                    {/* Bottom Section - Dark Mode Toggle & User Profile */}
                    <div className="mt-auto space-y-2 pt-4">
                        <div className='flex text-center justify-around'>
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="flex  items-center w-full px-3 py-3 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors language-icon duration-200"
                            >
                                {darkMode ? (
                                    <SunIcon className="h-5 language-icon w-5" />
                                ) : (
                                    <MoonIcon className="h-5 language-icon w-5" />
                                )}

                            </button>
                            <span className="absolute mr-8 mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white  duration-200 whitespace-nowrap ">
                                {darkMode ? 'Light Mode' : 'Dark Mode'}
                            </span>
                        </div>
                        <div className="flex items-center px-3 py-3">
                            <div className="relative opacity-0 group-hover:opacity-100">
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="User profile"
                                />
                                <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-900"></span>
                            </div>
                            <div className="ml-3 overflow-hidden opacity-0 group-hover:opacity-100 font-changa transition-opacity duration-300">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.name || 0}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Pro Member</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

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

// import { NavLink } from "react-router-dom"; // Use NavLink for internal links for better UX

// export default function Sidebar({ darkMode, setDarkMode, user }) {
//     // Re-usable class strings for navigation items to keep the mapping clean
//     const navLinkBaseClass = "flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200";
//     const navLinkInactiveClass = "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white";
//     const navLinkActiveClass = "bg-indigo-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400";


//     return (
//         <div className="hidden md:flex md:flex-shrink-0">
//             {/* 
//                 THE MAIN CONTAINER
//                 - Changed duration from 700ms to 500ms for a snappier feel.
//                 - The "group" class here orchestrates all child animations.
//             */}
//             <div className="flex flex-col w-14 hover:w-56 transition-all duration-500 ease-in-out h-screen border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black group overflow-hidden">

//                 {/* Logo Section (Your corrected code, it's already great) */}
//                 <div className="flex items-center justify-center h-16 flex-shrink-0 px-4 border-b border-gray-200 dark:border-gray-800">
//                     <NavLink to="/" className="group/logo"> {/* Using a named group to avoid conflict, optional but good practice */}
//                         <div className="relative flex items-center justify-center h-8 w-32"> {/* Increased width to fit "Code Hunter" */}
//                             <svg
//                                 className="absolute h-8 w-8 text-indigo-600 dark:text-indigo-400 group-hover/logo:opacity-0 group-hover/logo:scale-75 transition-all duration-300"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 xmlns="http://www.w3.org/2000/svg"
//                             >
//                                 <path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                                 <path d="M3 12L12 17L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                                 <path d="M3 17L12 22L21 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                             </svg>
//                             <span className="absolute whitespace-nowrap text-lg font-bold font-changa text-gray-900 dark:text-white opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300">
//                                 Code
//                                 <span className="ml-1 bg-yellow-400 text-black px-1 rounded-sm">Hunter</span>
//                             </span>
//                         </div>
//                     </NavLink>
//                 </div>

//                 {/* Navigation Links */}
//                 <div className="flex flex-col flex-grow p-2 overflow-y-auto">
//                     <nav className="flex-1 space-y-1">
//                         {[
//                             { name: 'Dashboard', icon: <HomeIcon className="h-6 w-6" />, active: true, link: "/" },
//                             { name: 'Problems', icon: <PuzzlePieceIcon className="h-6 w-6" />, link: "/problems" },
//                             { name: 'Contests', icon: <TrophyIcon className="h-6 w-6" />, link: "/contests" },
//                             { name: 'Discuss', icon: <UsersIcon className="h-6 w-6" />, link: "/discuss" },
//                             { name: 'Leaderboard', icon: <MdLeaderboard className="h-6 w-6" />, link: "/leaderboard" },
//                             { name: 'Settings', icon: <CogIcon className="h-6 w-6" />, link: "/settings" },
//                         ].map((item) => (
//                             <NavLink
//                                 key={item.name}
//                                 to={item.link || "#"}
//                                 className={({ isActive }) =>
//                                     `${navLinkBaseClass} ${isActive ? navLinkActiveClass : navLinkInactiveClass}`
//                                 }
//                             >
//                                 <span className="flex-shrink-0">{item.icon}</span>
//                                 {/* 
//                                     SMOOTH TEXT FADE
//                                     - The text now has a `delay-200`. This means it will start fading in 200ms
//                                       *after* the hover starts, making it appear as the sidebar is expanding.
//                                 */}
//                                 <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-200 whitespace-nowrap">
//                                     {item.name}
//                                 </span>
//                             </NavLink>
//                         ))}
//                     </nav>

//                     {/* Bottom Section - Dark Mode & User Profile */}
//                     <div className="mt-auto space-y-1 pt-4">

//                         {/* Dark Mode Toggle */}
//                         <div className="relative"> {/* (1) Added a relative container for robust positioning */}
//                             <button
//                                 onClick={() => setDarkMode(!darkMode)}
//                                 className="flex items-center w-full px-3 py-3 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
//                             >
//                                 {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}

//                                 {/* (2) The text is now positioned absolutely within the relative parent */}
//                                 <span className="absolute left-12 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-200">
//                                     {darkMode ? 'Light Mode' : 'Dark Mode'}
//                                 </span>
//                             </button>
//                         </div>

//                         {/* User Profile */}
//                         <a href="/profile" className={`${navLinkBaseClass} ${navLinkInactiveClass}`}>
//                             <div className="flex-shrink-0">
//                                 <img
//                                     className="h-8 w-8 rounded-full"
//                                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                                     alt="User profile"
//                                 />
//                             </div>
//                             <div className="ml-3 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 whitespace-nowrap">
//                                 <p className="font-medium text-gray-900 dark:text-white truncate">{user?.name || "Tom Cook"}</p>
//                                 <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Pro Member</p>
//                             </div>
//                         </a>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }