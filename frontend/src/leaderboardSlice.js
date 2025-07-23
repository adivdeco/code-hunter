// @/redux/leaderboardSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '@/utils/axiosClint';

// 1. Create the async thunk for fetching and processing data
export const fetchLeaderboard = createAsyncThunk(
    'leaderboard/fetchLeaderboard',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosClient.get('/auth/alluser');
            const rawUsers = res.data.alluser;

            // --- DATA PROCESSING LOGIC (moved from the component) ---
            const usersWithScore = rawUsers.map(u => ({
                ...u,
                solved: u.problemSolved.length,
                score: u.problemSolved.length * 17, // Same scoring logic
            }));

            usersWithScore.sort((a, b) => b.score - a.score);

            const finalLeaderboard = usersWithScore.map((u, index) => ({
                ...u,
                rank: index + 1, // Assign rank
            }));

            return finalLeaderboard; // This will become the action.payload

        } catch (err) {
            console.error("Failed to fetch leaderboard data:", err);
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch leaderboard');
        }
    }
);

// 2. Define the initial state
const initialState = {
    data: [], // Will hold the array of ranked users
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// 3. Create the slice
const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {}, // No regular reducers needed for now
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeaderboard.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLeaderboard.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload; // Set state with our processed data
            })
            .addCase(fetchLeaderboard.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

// Optional: Create a memoized selector for better performance
import { createSelector } from 'reselect';

const selectLeaderboardData = state => state.leaderboard.data;
const selectLoggedInUserId = state => state.auth.user?._id;

export const selectCurrentUserRank = createSelector(
    [selectLeaderboardData, selectLoggedInUserId],
    (leaderboard, userId) => {
        if (!userId || !leaderboard.length) return null;
        const userInData = leaderboard.find(u => u._id === userId);
        return userInData ? userInData.rank : null;
    }
);


export default leaderboardSlice.reducer;