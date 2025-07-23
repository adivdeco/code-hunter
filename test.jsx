// LeaderboardPage.js - MODIFIED

import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboard } from '@/redux/leaderboardSlice'; // <-- IMPORT THE THUNK
import Navbar from '@/components/Navbar';
// ... other imports

// Sub-components (PodiumCard, LeaderboardRow, MyRankBanner) remain UNCHANGED

const LeaderboardPage = () => {
    const dispatch = useDispatch();

    // Get all required state directly from the Redux store
    const { user: loggedInUser } = useSelector((state) => state.auth);
    const leaderboard = useSelector((state) => state.leaderboard.data);
    const leaderboardStatus = useSelector((state) => state.leaderboard.status);

    // Fetch data on component mount if it hasn't been fetched yet
    useEffect(() => {
        if (leaderboardStatus === 'idle') {
            dispatch(fetchLeaderboard());
        }
    }, [leaderboardStatus, dispatch]);

    // useMemo derivations are now based on Redux state
    const topThree = useMemo(() => leaderboard.slice(0, 3), [leaderboard]);
    const restOfLeaderboard = useMemo(() => leaderboard.slice(3), [leaderboard]);
    const currentUserData = useMemo(
        () => leaderboard.find(u => u._id === loggedInUser?._id),
        [leaderboard, loggedInUser]
    );

    const isLoading = leaderboardStatus === 'loading' || leaderboardStatus === 'idle';

    // ... The rest of your JSX remains almost identical, just use the `isLoading` variable
    // For example:
    // {isLoading ? (
    //      <div className="flex justify-center ..."><FaSpinner /></div>
    // ) : leaderboard.length > 0 ? ( ...
    // ...
    // The entire return statement of your original component is correct. No changes needed there.
};

export default LeaderboardPage;