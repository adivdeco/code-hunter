import { useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import useUserStats from '@/hooks/useUserStats';
import { useSelector } from 'react-redux';

// Mock user data - replace with actual API call
// const mockUser = {
//     _id: '123',
//     name: 'John Doe',
//     email: 'john@example.com',
//     role: 'user',
//     isPaidUser: true,
//     lastActive: new Date(),
//     createdAt: new Date('2023-01-15'),
//     problemSolved: Array(27).fill({}),
// };


export default function DashboardPage() {
    const { user } = useSelector((state) => state.auth);    // In a real app, you would use:


    return (
        <DashboardLayout userData={user} />
        // <h1>{user}</h1>
    );
}