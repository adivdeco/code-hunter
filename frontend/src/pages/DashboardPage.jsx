import DashboardLayout from '../components/layout/DashboardLayout';
import { useSelector, useDispatch } from 'react-redux';
import DashboardDataProvider from "@/components/layout/DashboardDataProvider"
// import ProfileCard from './ProfileCard';
import { useEffect } from 'react';
import { fetchLeaderboard, selectCurrentUserRank } from '@/leaderboardSlice';


export default function DashboardPage() {
    const { user } = useSelector((state) => state.auth);    // In a real app, you would use:

    // --- Get the rank using our new selector ---
    const rank = useSelector(selectCurrentUserRank);
    const leaderboardStatus = useSelector(state => state.leaderboard.status);
    const dispatch = useDispatch();

    // Ensure leaderboard data is fetched if not already available
    useEffect(() => {
        if (leaderboardStatus === 'idle') {
            dispatch(fetchLeaderboard());
        }
    }, [leaderboardStatus, dispatch]);


    return (
        <DashboardDataProvider>

            <DashboardLayout userData={user} rank={rank} />

        </DashboardDataProvider>
    );
}