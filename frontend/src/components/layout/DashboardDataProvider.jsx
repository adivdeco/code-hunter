// components/layout/DashboardDataProvider.jsx
import { useEffect, useState } from 'react';
import DashboardDataContext from '@/contexts/DashboardDataContext';
import axiosClient from '@/utils/axiosClint';

export default function DashboardDataProvider({ children }) {
    const [submissions, setSubmissions] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get(`/problem/submissions`);

                const data = Array.isArray(response.data) ? response.data : [response.data];
                setSubmissions(data);

                const acceptedSubs = data.filter((s) => s.status === 'accepted');
                const totalRuntime = acceptedSubs.reduce((sum, sub) => sum + (sub.runtime || 0), 0);
                const totalMemory = acceptedSubs.reduce((sum, sub) => sum + (sub.memory || 0), 0);

                setStats({
                    avgRuntime: acceptedSubs.length > 0 ? (totalRuntime / acceptedSubs.length).toFixed(4) : 0,
                    avgMemory: acceptedSubs.length > 0 ? (totalMemory / acceptedSubs.length / 1024).toFixed(2) : 0,
                });

            } catch (err) {
                console.error('Error fetching submissions:', err);
                setError(err.response?.data?.message || err.message || 'Failed to fetch submissions');
                setSubmissions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, []);

    return (
        <DashboardDataContext.Provider value={{ submissions, stats, loading, error }}>
            {children}
        </DashboardDataContext.Provider>
    );
}
