


import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAdminProblems } from './useAdminProblems';
import { ProblemFilterBar } from './ProblemFilterBar';
import { ProblemList } from './ProblemList';
import { VideoManagementModal } from './VideoManagementModal';
import { LoadingSkeleton } from './LoadingSkeleton';
import AdminNavbar from '@/components/admin/AdminNav';
import toast from 'react-hot-toast';

const AdminProblemManager = () => {
    const { user } = useSelector((state) => state.auth);

    const {
        problems, loading, error, searchTerm, setSearchTerm,
        selectedDifficulty, setSelectedDifficulty, sortConfig, requestSort,
        deleteProblem, uploadNewVideo, deleteVideo, rawProblems // <-- Use rawProblems for modal
    } = useAdminProblems();

    // Modal State
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentProblemId, setCurrentProblemId] = useState(null);

    // Modal Handlers
    const openManageVideosModal = (problem) => {
        setCurrentProblemId(problem._id);
        setModalIsOpen(true);
    };

    const closeManageVideosModal = () => {
        setCurrentProblemId(null);
        setModalIsOpen(false);
    };

    const handleDeleteProblem = (problemId) => {
        if (window.confirm('Are you sure you want to delete this ENTIRE problem and all its video solutions? This is permanent.')) {
            const toastId = toast.loading("Deleting problem...");
            deleteProblem(problemId).then(success => {
                if (success) {
                    toast.success("Problem deleted.", { id: toastId });
                } else {
                    toast.error("Failed to delete problem.", { id: toastId });
                }
            });
        }
    };

    // Find the currently selected problem from the original, unsorted/unfiltered list
    // This ensures the modal always has the correct, complete data
    const selectedProblemForModal = useMemo(() => {
        if (!currentProblemId) return null;
        return rawProblems.find(p => p._id === currentProblemId);
    }, [currentProblemId, rawProblems]);


    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white">
                <AdminNavbar user={user} />
                <LoadingSkeleton />
            </div>
        );
    }

    if (error) { /* ... error JSX remains the same ... */ }

    return (
        <div className="min-h-screen bg-gray-900 font-sans text-gray-200">
            <AdminNavbar user={user} />
            <main className="container mx-auto px-4 py-8 md:px-6">
                <header className="mb-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white">Problem Dashboard</h1>
                    <p className="mt-2 text-lg text-gray-400">Oversee, manage, and enhance problems with video solutions.</p>
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
                    onDeleteProblem={handleDeleteProblem}
                    onManageVideosClick={openManageVideosModal}
                />
            </main>

            {selectedProblemForModal && (
                <VideoManagementModal
                    isOpen={modalIsOpen}
                    onClose={closeManageVideosModal}
                    problem={selectedProblemForModal}
                    onUploadVideo={uploadNewVideo}
                    onDeleteVideo={deleteVideo}
                />
            )}
        </div>
    );
};

export default AdminProblemManager;