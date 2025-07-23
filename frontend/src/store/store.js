import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../authSlice';
import leaderboardReducer from '@/leaderboardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    leaderboard: leaderboardReducer,
  }
});

