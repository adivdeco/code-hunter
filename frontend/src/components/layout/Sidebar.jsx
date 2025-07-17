import {
    HomeIcon,
    PuzzlePieceIcon,
    TrophyIcon,
    UsersIcon,
    CogIcon,
    MoonIcon,
    SunIcon
} from '@heroicons/react/24/outline'

export default function Sidebar({ darkMode, setDarkMode }) {
    return (
        <div className="hidden md:flex md:flex-shrink-0">
            <div className="flex flex-col w-64 h-screen border-r border-gray-800 bg-gray-900">
                <div className="flex items-center h-16 px-4 border-b border-gray-800">
                    <h1 className="text-xl font-bold text-indigo-400">LeetCode Pro</h1>
                </div>
                <div className="flex flex-col flex-grow p-4 overflow-y-auto">
                    <nav className="flex-1 space-y-1">
                        <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg bg-gray-800 text-indigo-400">
                            <HomeIcon className="h-5 w-5 mr-3" />
                            Dashboard
                        </a>
                        <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white">
                            <PuzzlePieceIcon className="h-5 w-5 mr-3" />
                            Problems
                        </a>
                        <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white">
                            <TrophyIcon className="h-5 w-5 mr-3" />
                            Contests
                        </a>
                        <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white">
                            <UsersIcon className="h-5 w-5 mr-3" />
                            Discuss
                        </a>
                        <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white">
                            <CogIcon className="h-5 w-5 mr-3" />
                            Settings
                        </a>
                    </nav>

                    <div className="mt-auto pt-4">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white"
                        >
                            {darkMode ? (
                                <>
                                    <SunIcon className="h-5 w-5 mr-3" />
                                    Light Mode
                                </>
                            ) : (
                                <>
                                    <MoonIcon className="h-5 w-5 mr-3" />
                                    Dark Mode
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}