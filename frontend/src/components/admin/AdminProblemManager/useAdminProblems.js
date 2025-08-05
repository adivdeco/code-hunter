

import { useState, useEffect, useMemo, useCallback } from 'react';
import axiosClient from '@/utils/axiosClint';
import toast from 'react-hot-toast';

export const useAdminProblems = () => {
    const [rawProblems, setRawProblems] = useState([]); // <-- Unfiltered/unsorted state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'asc' });

    const fetchProblems = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get('/problem/allProblems');
            setRawProblems(response.data.allproblem || []);

            setError(null);
        } catch (err) {
            setError(err.message || 'An unknown error occurred.');
            console.error("Failed to fetch problems:", err);
        } finally {
            setLoading(false);
        }
    }, []);
    // console.log(rawProblems);


    useEffect(() => {
        fetchProblems();
    }, [fetchProblems]);

    const requestSort = useCallback((key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
    }, [sortConfig]);

    // The problems array that gets rendered is derived from rawProblems
    const filteredAndSortedProblems = useMemo(() => {
        let processedProblems = [...rawProblems];

        // Filtering
        processedProblems = processedProblems.filter(problem => {
            const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
            return matchesSearch && matchesDifficulty;
        });

        // Sorting
        processedProblems.sort((a, b) => {
            const aValue = a[sortConfig.key] || '';
            const bValue = b[sortConfig.key] || '';
            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        return processedProblems;
    }, [rawProblems, searchTerm, selectedDifficulty, sortConfig]);

    const uploadNewVideo = useCallback(async (problemId, formData) => {
        try {
            const response = await axiosClient.post(
                `/video/upload/${problemId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            setRawProblems(prev =>
                prev.map(p =>
                    p._id === problemId
                        ? { ...p, videoSolutions: [...(p.videoSolutions || []), response.data.video] }
                        : p
                )
            );
            return { success: true };
        } catch (err) {
            console.error("Video upload failed:", err);
            toast.error(err.response?.data?.error || "Video upload failed.");
            return { success: false, error: err };
        }
    }, []);

    const deleteVideo = useCallback(async (problemId, videoId) => {
        try {
            await axiosClient.delete(`/video/${videoId}`);
            // Update state by removing the video from the specific problem
            setRawProblems(prev =>
                prev.map(p => {
                    if (p._id === problemId) {
                        const updatedSolutions = p.videoSolutions.filter(v => v._id !== videoId);
                        return { ...p, videoSolutions: updatedSolutions };
                    }
                    return p;
                })
            );
            return { success: true };
        } catch (err) {
            console.error("Video deletion failed:", err);
            return { success: false, error: err };
        }
    }, []);

    const deleteProblem = useCallback(async (problemId) => {
        try {
            await axiosClient.delete(`/problem/${problemId}`);
            setRawProblems(prev => prev.filter(p => p._id !== problemId));
            return true;
        } catch (err) {
            console.error("Failed to delete problem:", err);
            return false;
        }
    }, []);
    // console.log(rawProblems);


    return {
        problems: filteredAndSortedProblems, // For display
        rawProblems,                         // For modal
        loading, error, searchTerm, setSearchTerm,
        selectedDifficulty, setSelectedDifficulty,
        sortConfig, requestSort,
        deleteProblem, uploadNewVideo, deleteVideo
    };
};