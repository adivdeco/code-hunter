import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaGlobeAmericas, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import { countryList } from '@/utils/countries';
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';

// MOCK: Replace this with your actual user fetching logic (e.g., from a context or a hook)
const fetchUserData = async () => ({
    name: 'adiv',
    email: 'sadiv320@gmail.com',
    country: 'IN', // This would come from your DB
});

const ProfileSettingsPage = () => {
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [originalCountry, setOriginalCountry] = useState(''); // To check if changed

    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '...' }

    // Fetch user data on component mount
    useEffect(() => {
        setIsLoading(true);
        fetchUserData().then(data => {
            setName(data.name || '');
            setCountry(data.country || '');
            setOriginalCountry(data.country || '');
            setIsLoading(false);
        });
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage(null);

        // This is where you call your API
        // MOCK API CALL
        try {
            const token = "YOUR_JWT_TOKEN"; // Get this from your auth context/storage
            const response = await fetch('/api/users/profile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name, country }),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile.');
            }

            const updatedUser = await response.json();
            setOriginalCountry(updatedUser.country); // Update original country on success
            setMessage({ type: 'success', text: 'Profile updated successfully!' });

        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setIsSaving(false);
            // Hide success message after 3 seconds
            setTimeout(() => setMessage(null), 3000);
        }
    };

    return (
        <div className='bg-gradient-to-br from-black via-gray-950 to-purple-950'>
            <nav className='text-white'>
                <Navbar />
            </nav>

            <div className=" mb-[50vh]  text-white pt-24 pb-12">
                <motion.main
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto px-4"
                >
                    <h1 className="text-4xl font-bold text-center mt-8 mb-2">Profile Settings</h1>
                    <p className="text-gray-400 text-center mb-10">Manage your account details.</p>

                    <div className="bg-black/20 backdrop-blur-md rounded-xl p-8 border border-purple-500/20 shadow-lg">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-48">
                                <FaSpinner className="animate-spin text-purple-400 text-4xl" />
                            </div>
                        ) : (
                            <form onSubmit={handleSave} className="space-y-6">
                                {/* Name Input */}
                                <div className="relative">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none pt-7">
                                        <FaUser className="text-gray-500" />
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                                    />
                                </div>

                                {/* Country Select Dropdown */}
                                <div className="relative">
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-400 mb-1">Country</label>
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none pt-7">
                                        <FaGlobeAmericas className="text-gray-500" />
                                    </div>
                                    <select
                                        id="country"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition appearance-none"
                                    >
                                        <option value="">Select your country</option>
                                        {countryList.map(c => (
                                            <option key={c.code} value={c.code}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Save Button and Message */}
                                <div className="pt-4 flex items-center justify-between">
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex items-center justify-center w-32 px-4 py-2 bg-purple-600 rounded-lg font-semibold hover:bg-purple-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300"
                                    >
                                        {isSaving ? <FaSpinner className="animate-spin" /> : 'Save Changes'}
                                    </button>
                                    {message && (
                                        <div className={`flex items-center space-x-2 text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                            {message.type === 'success' && <FaCheckCircle />}
                                            <span>{message.text}</span>
                                        </div>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>
                </motion.main>
            </div>

            <Footer />
        </div>
    );
};

export default ProfileSettingsPage;