

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, FileVideo2, Users, Code, Activity, FileEdit } from "lucide-react";
import { NavLink } from "react-router";
import CountUp from "react-countup";
import axiosClient from '@/utils/axiosClint';
import { toast } from 'react-hot-toast';
import AdminNavbar from "@/components/Navbar";
import ThreeRingLoader from "@/components/ThreeRingLoader";

const adminOptions = [
  {
    id: "create",
    title: "Create Problem",
    description: "Craft new coding challenges with test cases and solutions",
    icon: Plus,
    color: "from-emerald-400 to-teal-600",
    shadow: "shadow-emerald-500/60 hover:shadow-emerald-500/80",
    route: "/admin/create",
    accent: "bg-gradient-to-br from-emerald-500/10 to-green-500/60"
  },
  {
    id: "update",
    title: "Update Problem",
    description: "Refine existing problems and optimize test cases",
    icon: Edit,
    color: "from-amber-400 to-orange-600",
    shadow: "shadow-amber-500/30 hover:shadow-amber-500/50",
    route: "/admin/update/:id",
    accent: "bg-gradient-to-br from-amber-500/10 to-yellow-500/60"
  },
  {
    id: "delete",
    title: "Delete Problem",
    description: "Remove outdated or irrelevant coding challenges",
    icon: Trash2,
    color: "from-rose-400 to-pink-600",
    shadow: "shadow-rose-500/30 hover:shadow-rose-500/50",
    route: "/admin/delete",
    accent: "bg-gradient-to-br from-rose-500/10 to-red-500/60"
  },
  {
    id: "video",
    title: "Video Solutions",
    description: "Add visual explanations for complex problems",
    icon: FileVideo2,
    color: "from-blue-400 to-indigo-600",
    shadow: "shadow-blue-500/30 hover:shadow-blue-500/50",
    route: "/admin/video",
    accent: "bg-gradient-to-br from-blue-500/10 to-blue-500/60"
  },
  {
    id: "users",
    title: "Manage Users",
    description: "View and manage platform user accounts",
    icon: Users,
    color: "from-violet-400 to-purple-600",
    shadow: "shadow-violet-500/30 hover:shadow-violet-500/50",
    route: "/admin/allusers",
    accent: "bg-gradient-to-br from-violet-500/10 to-violet-500/60"
  },
  {
    id: "analytics",
    title: "Platform Analytics",
    description: "View engagement metrics and performance data",
    icon: Activity,
    color: "from-cyan-400 to-sky-600",
    shadow: "shadow-cyan-500/30 hover:shadow-cyan-500/50",
    route: "/admin/analytics",
    accent: "bg-gradient-to-br from-cyan-500/10 to-cyan-500"
  }
];

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    problems: 0,
    users: 0,
    submissions: 0,
    activeUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [problemsRes, usersRes, solnRes] = await Promise.all([
          axiosClient.get('/problem/allProblems'),
          axiosClient.get('/auth/alluser'),
          axiosClient.get('/problem/allsoln')
        ]);

        setStats({
          problems: problemsRes.data.allproblem?.length || 0,
          users: usersRes.data.alluser?.length || 0,
          submissions: solnRes.data.allsoln?.length || 0,
          activeUsers: Math.floor(usersRes.data.alluser?.length * 0.7) || 0 // Simulating 70% active
        });

      } catch (err) {
        setError('Failed to fetch dashboard data');
        console.error(err);
        toast.error('Failed to load dashboard data', {
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151'
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <ThreeRingLoader />;
  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center p-6 max-w-md bg-gray-800 rounded-xl border border-red-500/30">
        <div className="text-red-400 text-5xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold text-white mb-2">Dashboard Error</h3>
        <p className="text-gray-300 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <AdminNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Animated Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400  to-blue-500">
            Admin Dashboard
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Central hub for managing your coding platform's content and users
          </p>

        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {[
            {
              label: "Problems",
              value: stats.problems,
              icon: <Code className="w-6 h-6" />,
              change: "+12%",
              color: "bg-indigo-500"
            },
            {
              label: "Total Users",
              value: stats.users,
              icon: <Users className="w-6 h-6" />,
              change: "+5%",
              color: "bg-green-500"
            },
            {
              label: "Submissions",
              value: stats.submissions,
              icon: <FileEdit className="w-6 h-6" />,
              change: "+24%",
              color: "bg-amber-500"
            },
            {
              label: "Active Users",
              value: stats.activeUsers,
              icon: <Activity className="w-6 h-6" />,
              change: "+8%",
              color: "bg-cyan-500"
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-${stat.color} transition-all duration-300 hover:shadow-lg`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      separator=","
                    />
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.color} bg-opacity-60 text-${stat.color}`}>
                  {stat.icon}
                </div>

              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-xs px-2 py-1 rounded-full ${stat.color} bg-opacity-90 text-${stat.color}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-400 ml-2">vs last week</span>
              </div>
            </motion.div>
          ))}
        </motion.div>


        {/* Quick Actions Title */}
        <motion.h2
          className="text-2xl font-bold mb-8 flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 mr-3 rounded-full"></span>
          Quick Actions
        </motion.h2>


        {/* Admin Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {adminOptions.map((option, idx) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: idx * 0.15, type: "spring", stiffness: 100 }}
                whileHover={{ y: -5 }}
                className={`group relative overflow-hidden rounded-2xl p-6 ${option.shadow} transition-all duration-500 border border-gray-700/50`}
              >
                {/* Gradient background overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon with gradient background */}
                  <div className={`w-14 h-14 rounded-full mb-6 flex items-center justify-center ${option.accent} shadow-md`}>
                    <option.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Text content */}
                  <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                  <p className="text-gray-400 text-sm mb-6">{option.description}</p>

                  {/* Animated button */}
                  <NavLink
                    to={option.route}
                    className={`inline-flex items-center px-4 py-2 rounded-lg ${option.accent} bg-opacity-20 text-${option.accent.split('-')[1]}-400 hover:bg-opacity-30 transition-all duration-300 group-hover:translate-x-1`}
                  >
                    <span>Access</span>
                    <svg
                      className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </NavLink>
                </div>

                {/* Decorative elements */}
                <div className={`absolute -right-10 -top-10 w-20 h-20 rounded-full ${option.accent} opacity-5 group-hover:opacity-90 transition-opacity duration-500`}></div>
                <div className={`absolute -left-5 -bottom-5 w-16 h-16 rounded-full ${option.accent} opacity-5 group-hover:opacity-70 transition-opacity duration-500`}></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Recent Activity Section */}
        <motion.div
          className="mt-16 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-amber-400 to-orange-500 mr-3 rounded-full"></span>
              Recent Activity
            </h2>
            <button className="text-sm text-gray-400 hover:text-white transition-colors">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {[
              { action: "Created new problem", user: "adiv", time: "2 mins ago", type: "create" },
              { action: "Updated test cases", user: "moderator", time: "15 mins ago", type: "update" },
              { action: "Deleted outdated problem", user: "ruchi", time: "1 hour ago", type: "delete" },
              { action: "Added video solution", user: "Rupesh", time: "3 hours ago", type: "video" },
              { action: "Banned spam account", user: "rohit_negi", time: "5 hours ago", type: "users" }
            ].map((item, index) => (
              <div key={index} className="flex items-start py-3 border-b border-gray-700 last:border-0">
                <div className={`p-2 rounded-full ${item.type === 'create' ? 'bg-emerald-500/50 text-emerald-400' :
                  item.type === 'update' ? 'bg-amber-500/50 text-amber-400' :
                    item.type === 'delete' ? 'bg-rose-500/50 text-rose-400' :
                      item.type === 'video' ? 'bg-blue-500/50 text-blue-400' :
                        'bg-violet-500/50 text-violet-400'
                  } mr-4`}>
                  {item.type === 'create' ? <Plus className="w-4 h-4" /> :
                    item.type === 'update' ? <Edit className="w-4 h-4" /> :
                      item.type === 'delete' ? <Trash2 className="w-4 h-4" /> :
                        item.type === 'video' ? <FileVideo2 className="w-4 h-4" /> :
                          <Users className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.action}</p>
                  <p className="text-sm text-gray-400">by @{item.user} • {item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;