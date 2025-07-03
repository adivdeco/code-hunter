import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { LogOut } from "lucide-react"; // icon library
import clsx from "clsx"; // for conditional classes
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../authSlice'
import Admin from "@/pages/Admin";

function NavProfile({ user }) {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const toggleDropdown = () => setOpen(!open);
    const firstInitial = user?.name?.[0]?.toUpperCase() || "U";

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (

        <div className="relative inline-block text-left">
            {/* Avatar Circle */}
            <div
                onClick={toggleDropdown}
                className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center cursor-pointer font-semibold font-aladin hover:scale-105 transition"
            >
                {firstInitial}
            </div>


            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50">
                    <div className="px-4 py-3 border-b">
                        <p className="font-bold text-gray-800">{user?.name || "User Name"}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <div className="p-3 space-y-1">

                        {user && user?.role === 'admin' ?
                            <NavLink to={"/admin"}
                                className="block px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-3xl"
                            >
                                Admin
                            </NavLink> : null}

                        <NavLink
                            to="/problems"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-3xl"
                        >
                            Dashboard
                        </NavLink>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-between px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-3xl"
                        >
                            Log Out
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavProfile;
