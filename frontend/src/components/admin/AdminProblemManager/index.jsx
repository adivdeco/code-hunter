import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FiAlertTriangle } from 'react-icons/fi';
import toast from 'react-hot-toast';

import AdminNavbar from '@/components/admin/AdminNav';
import { useAdminProblems } from './useAdminProblems'; // <-- Custom Hook
import { ProblemFilterBar } from './ProblemFilterBar';
import { ProblemList } from './ProblemList';
import { VideoUploadModal } from './VideoUploadModal';
import { LoadingSkeleton } from './LoadingSkeleton';

// Main Component
const AdminProblemManager = () => {
    const { user } = useSelector((state) => state.auth);

    const {
        problems,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        selectedDifficulty,
        setSelectedDifficulty,
        sortConfig,
        requestSort,
        deleteProblem,
        handleVideoUploadSuccess,
    } = useAdminProblems(); // Using the custom hook to get all logic and state

    // Modal State
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentProblem, setCurrentProblem] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    // Modal Handlers
    const openVideoModal = (problem) => {
        setCurrentProblem(problem);
        setModalIsOpen(true);
    };

    const closeVideoModal = () => {
        setCurrentProblem(null);
        setModalIsOpen(false);
    };

    // Delete Handler with Toast Notifications
    const handleDeleteProblem = async (problemId) => {
        if (window.confirm('Are you sure you want to delete this problem and its associated videos?')) {
            const toastId = toast.loading('Deleting problem...');
            const success = await deleteProblem(problemId);
            if (success) {
                toast.success('Problem deleted successfully!', { id: toastId });
            } else {
                toast.error('Failed to delete problem.', { id: toastId });
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white">
                <AdminNavbar user={user} />
                <LoadingSkeleton />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 text-white">
                <AdminNavbar user={user} />
                <div className="container mx-auto mt-10 flex flex-col items-center justify-center p-4">
                    <div className="flex w-full max-w-lg flex-col items-center rounded-lg border border-red-500/30 bg-red-500/10 p-6 text-center">
                        <FiAlertTriangle className="mb-4 h-12 w-12 text-red-400" />
                        <h2 className="text-2xl font-bold text-red-400">An Error Occurred</h2>
                        <p className="mt-2 text-gray-300">Could not load problem data. Please try again later.</p>
                        <p className="mt-2 text-sm font-mono text-red-500">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 font-sans text-gray-200">
            <AdminNavbar user={user} />
            <main className="container mx-auto px-4 py-8 md:px-6">
                <header className="mb-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white">
                        Problem Dashboard
                    </h1>
                    <p className="mt-2 text-lg text-gray-400">
                        Oversee, manage, and enhance problems with video solutions.
                    </p>
                </header>

                <ProblemFilterBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedDifficulty={selectedDifficulty}
                    setSelectedDifficulty={setSelectedDifficulty}
                />

                <ProblemList
                    problems={problems}
                    sortConfig={sortConfig}
                    requestSort={requestSort}
                    onDelete={handleDeleteProblem}
                    onUploadClick={openVideoModal}
                />
            </main>

            {currentProblem && (
                <VideoUploadModal
                    isOpen={modalIsOpen}
                    onClose={closeVideoModal}
                    problem={currentProblem}
                    onUploadSuccess={handleVideoUploadSuccess}
                    isUploading={isUploading}
                    setIsUploading={setIsUploading}
                />
            )}
        </div>
    );
};

export default AdminProblemManager;
