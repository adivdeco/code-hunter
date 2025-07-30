import { useState, useEffect, useMemo, useCallback } from 'react';
import axiosClient from '@/utils/axiosClint';

export const useAdminProblems = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'asc' });

    // Fetch initial data
    const fetchProblems = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get('/problem/allProblems');
            // Assuming the API returns { allproblem: [...] }
            setProblems(response.data.allproblem || []);
            setError(null);
        } catch (err) {
            setError(err.message || 'An unknown error occurred.');
            console.error("Failed to fetch problems:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProblems();
    }, [fetchProblems]);

    // Sorting logic
    const requestSort = useCallback((key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    }, [sortConfig]);

    // Filtering and Sorting Memoized Logic
    const filteredAndSortedProblems = useMemo(() => {
        let sortableItems = Array.isArray(problems) ? [...problems] : [];

        // Apply filtering
        sortableItems = sortableItems.filter(problem => {
            const problemTitle = (problem.title || '').toLowerCase();
            const problemDescription = (problem.description || '').toLowerCase();
            const search = searchTerm.toLowerCase();
            const problemDifficulty = (problem.difficulty || '').toLowerCase();

            const matchesSearch = problemTitle.includes(search) || problemDescription.includes(search);
            const matchesDifficulty = selectedDifficulty === 'all' || problemDifficulty === selectedDifficulty.toLowerCase();

            return matchesSearch && matchesDifficulty;
        });

        // Apply sorting
        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key] || '';
                const bValue = b[sortConfig.key] || '';
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return sortableItems;
    }, [problems, searchTerm, selectedDifficulty, sortConfig]);

    // Delete a problem
    const deleteProblem = useCallback(async (problemId) => {
        try {
            // Note: Use your correct delete endpoint. Your old code had /problem/:id
            await axiosClient.delete(`/problem/${problemId}`);
            setProblems(prev => prev.filter(p => p._id !== problemId));
            return true; // Indicate success
        } catch (err) {
            console.error("Failed to delete problem:", err);
            return false; // Indicate failure
        }
    }, []);

    // Update state after a successful video upload
    const handleVideoUploadSuccess = useCallback((problemId, updatedProblemData) => {
        setProblems(prevProblems =>
            prevProblems.map(p =>
                p._id === problemId
                    ? { ...p, ...updatedProblemData } // Merge in the new data
                    : p
            )
        );
    }, []);


    return {
        problems: filteredAndSortedProblems,
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
    };
};