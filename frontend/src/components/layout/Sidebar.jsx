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

import { Navigate, NavLink, useNavigate } from "react-router";

export default function Sidebar({ darkMode, setDarkMode, user }) {


    return (
        <div className="hidden md:flex md:flex-shrink-0">
            <div className="flex flex-col w-14 hover:w-56 transition-all duration-700 ease-in-out h-screen border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black group">
                {/* Logo - Creative Animated SVG */}
                <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-gray-800 overflow-hidden">
                    <NavLink to="/">
                        <div className="flex items-center">
                            <svg
                                className="h-8 w-8 group-hover:w-0 language-icon group-hover:opacity-0 transition-all duration-300"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 2L3 7L12 12L21 7L12 2Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-indigo-600 language-icon dark:text-indigo-400"
                                />
                                <path
                                    d="M3 12L12 17L21 12"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-indigo-600 language-icon dark:text-indigo-400"
                                />
                                <path
                                    d="M3 17L12 22L21 17"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-indigo-600 language-icon dark:text-indigo-400"
                                />
                            </svg>

                            <span className="ml-2 text-xl font-bold tracking-tight opacity-0 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 whitespace-nowrap text-gray-900 dark:text-white">
                                <span className="text-lg font-bold font-changa text-white flex items-center">
                                    Code
                                    <span className="ml-1 bg-yellow-400 text-black px-0.5 rounded-sm">Hunter</span>
                                </span>                            </span>
                        </div>
                    </NavLink>
                </div>

                {/* Navigation - Using react-icons for elegant icons */}
                <div className="flex flex-col flex-grow p-2 overflow-y-auto">
                    <nav className="flex-1 space-y-1">
                        {[
                            {
                                name: 'Dashboard',
                                icon: <HomeIcon className="h-5 w-5" />,
                                active: true
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
                                active: false
                            },
                            {
                                name: 'Discuss',
                                icon: <UsersIcon className="h-5 w-5" />,
                                active: false
                            },
                            {
                                name: 'Leaderboard',
                                icon: <MdLeaderboard className="h-5 w-5" />,
                                active: false
                            },
                            {
                                name: 'Settings',
                                icon: <CogIcon className="h-5 w-5" />,
                                active: false
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