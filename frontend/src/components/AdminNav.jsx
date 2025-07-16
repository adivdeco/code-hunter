import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router';
import {
    Sun, Moon, ChevronLeft,
    ChevronLeftIcon
} from 'lucide-react';
import NavProfile from '@/components/NavProfile';



const AdminNavbar = ({ user }) => {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);
    const [isAdminPanel, setIsAdminPanel] = useState(false);

    useEffect(() => {
        // Check if current route is admin route
        setIsAdminPanel(window.location.pathname.startsWith('/admin'));

        // Initialize dark mode from localStorage or system preference
        const savedMode = localStorage.getItem('darkMode');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(savedMode ? JSON.parse(savedMode) : systemPrefersDark);
    }, []);

    useEffect(() => {
        // Apply dark mode class to document
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    const adminOptions = [
        {
            id: "admin",
            title: "Admin Dashbord",
            route: "/admin",
        },
        {
            id: "create",
            title: "Create Problem",
            route: "/admin/create",
        },
        {
            id: "update",
            title: "Update Problem",
            route: "/admin/update",
        },
        {
            id: "video",
            title: "Video Solutions",
            route: "/admin/video",
        },
        {
            id: "users",
            title: "Manage Users",
            route: "/admin/allusers",
        },
        {
            id: "analytics",
            title: "Platform Analytics",
            route: "/admin/analytics",
        }
    ];

    return (
        <>
            <nav className="h-12 w-screen bg-gray-600 dark:bg-gray-900 px-3 flex items-center justify-between text-white shadow-sm">
                {/* Left section */}
                <div className="flex items-center gap-3">
                    {isAdminPanel && (
                        <button
                            onClick={() => navigate('/admin')}
                            className="mr-2 text-gray-400 hover:text-yellow-400 transition"
                        >
                            <ChevronLeftIcon size={20} />
                        </button>
                    )}

                    <span className="text-lg font-bold font-changa text-white flex items-center">
                        Code
                        <span className="ml-1 bg-yellow-400 text-black px-0.5 rounded-sm">Hunter</span>
                    </span>

                    <span className="text-sm text-gray-400 font-changa hidden sm:inline">
                        {isAdminPanel ? null : 'Practice. Learn. Repeat.'}
                    </span>
                </div>

                {/* Center section */}
                <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
                    {!isAdminPanel ? (
                        <>
                            <NavLink to="/practice">
                                <button className="hover:text-yellow-400 transition">Practice</button>
                            </NavLink>
                            <button className="hover:text-yellow-400 transition">Leaderboard</button>
                            <button className="hover:text-yellow-400 transition">Discuss</button>
                            <button className="hover:text-yellow-400 transition">Contests</button>
                        </>
                    ) : (
                        <div className="flex gap-4">
                            {adminOptions.map(option => (
                                <NavLink
                                    key={option.id}
                                    to={option.route}
                                    className={({ isActive }) =>
                                        `px-3 py-1 rounded-full text-xs font-medium transition-all ${isActive
                                            ? 'bg-yellow-500/20 text-yellow-400'
                                            : 'hover:bg-gray-700/50 text-gray-300'
                                        }`
                                    }
                                >
                                    {option.title}
                                </NavLink>
                            ))}
                        </div>
                    )}
                </div>


                {/* Right section */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-1.5 rounded-full hover:bg-gray-700/50 transition"
                        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {!isAdminPanel && (
                        <h1 className="font-aladin text-xl relative inline-block mt-2">
                            Upgrade to
                            <span className="font-aladin bg-gradient-to-r from-yellow-500 to-orange-600 text-transparent bg-clip-text text-xl font-extrabold">Pro</span>
                        </h1>
                    )}

                    <NavProfile user={user} />
                </div>
            </nav>

            {/* Admin Cards Panel (shown only on /admin route) */}
            {/* {window.location.pathname === '/admin' && (
                <div className="p-6 bg-white dark:bg-gray-800 min-h-screen">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-2xl font-bold mb-6 dark:text-white">Admin Dashboard</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {adminOptions.map((option) => (
                                <div
                                    key={option.id}
                                    onClick={() => navigate(option.route)}
                                    className={`bg-white dark:bg-gray-700 p-6 rounded-xl cursor-pointer transition-all transform hover:scale-[1.02] group ${option.shadow} hover:${option.shadow}`}
                                >
                                    <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${option.accent}`}>
                                        <option.icon className={`w-6 h-6 bg-gradient-to-br ${option.color} bg-clip-text text-transparent`} />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 dark:text-white">{option.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">{option.description}</p>
                                    <div className={`mt-4 h-1 w-0 group-hover:w-full transition-all duration-300 bg-gradient-to-r ${option.color}`}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )} */}
        </>
    );
};

export default AdminNavbar;