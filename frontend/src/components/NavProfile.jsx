


import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router";
import { LogOut, User, Settings, LayoutDashboard, Shield, ChevronDown } from "lucide-react";
import { FaHandsAslInterpreting } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../authSlice';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FaHome } from "react-icons/fa";

const NavProfile = ({ user, mobile = false }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const firstInitial = user?.name?.[0]?.toUpperCase() || "U";
    const avatarUrl = user?.avatar || '';

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/');
    };

    const menuItems = [
        ...(user?.role === 'admin' ? [{
            label: "Admin Panel",
            icon: <Shield className="w-4 h-4 " />,
            path: "/admin",
            color: "text-purple-600 hover:bg-purple-50"
        }] : []),
        {
            label: "Home",
            icon: <FaHome className=" language-icon w-5 h-5" />,
            path: "/",
            color: "text-orange-500 hover:bg-orange-50 font-changa"
        },
        {
            label: "Problems",
            icon: <FaHandsAslInterpreting className=" language-icon w-5 h-5" />,
            path: "/problems",
            color: "text-pink-600 hover:bg-blue-50"
        },
        {
            label: "Dashboard",
            icon: <LayoutDashboard className="w-4 h-4" />,
            path: "/dashbord",
            color: "text-blue-600 hover:bg-blue-50"
        },
        {
            label: "Profile Settings",
            icon: <Settings className="w-4 h-4" />,
            path: "/settings",
            color: "text-gray-600 hover:bg-gray-50"
        },
        {
            label: "Log Out",
            icon: <LogOut className="w-4 h-4" />,
            action: handleLogout,
            color: "text-red-600 hover:bg-red-50"
        }
    ];

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Custom Avatar Button */}
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(!open)}
                className={cn(
                    "flex items-center gap-2 p-1 rounded-full transition-all",
                    mobile ? "text-white" : "hover:bg-gray-300 dark:hover:bg-gray-800",
                    open && "bg-gray-300 dark:bg-gray-800"
                )}
                aria-label="User menu"
                aria-expanded={open}
            >
                <div className="relative h-9 w-9">
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt={user?.name}
                            className="h-full w-full rounded-full object-cover border-2 border-white/70 shadow-md"
                        />
                    ) : (
                        <div className="h-full font-aladin w-full rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium border-4 border-white/20 shadow-md">
                            {firstInitial}
                        </div>
                    )}
                </div>
                {!mobile && (
                    <motion.div
                        animate={open ? { rotate: 180 } : { rotate: 0 }}
                        transition={{ duration: 0.2 }}
                        className="hidden md:block"
                    >
                        <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </motion.div>
                )}
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, x: -30 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: -10, x: 30 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className={cn(
                            "absolute right-0 mt-2 w-64 origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none z-50",
                            mobile ? "top-12" : "top-full"
                        )}
                    >
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                {user?.name || "User"}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {user?.email}
                            </p>
                        </div>

                        {/* Menu Items */}
                        <div className="py-1">
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {item.path ? (
                                        <NavLink
                                            to={item.path}
                                            className={cn(
                                                "flex items-center px-4 py-2.5 text-sm w-full",
                                                item.color
                                            )}
                                        >
                                            <span className="mr-3">{item.icon}</span>
                                            {item.label}
                                        </NavLink>
                                    ) : (
                                        <button
                                            onClick={item.action}
                                            className={cn(
                                                "flex items-center px-4 py-2.5 text-sm w-full",
                                                item.color
                                            )}
                                        >
                                            <span className="mr-3">{item.icon}</span>
                                            {item.label}
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Upgrade Button */}
                        {user?.subscription !== 'premium' && (
                            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700">
                                <Button
                                    onClick={() => navigate('/pricing')}
                                    className="w-full  md:tracking-wide  bg-gradient-to-r font-aladin from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-purple-500/20"
                                >
                                    Upgrade to Pro
                                </Button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NavProfile;