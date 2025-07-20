import DashboardLayout from '../components/layout/DashboardLayout';
// import useUserStats from '@/hooks/useUserStats';
import { useSelector } from 'react-redux';
import DashboardDataProvider from "@/components/layout/DashboardDataProvider"



export default function DashboardPage() {
    const { user } = useSelector((state) => state.auth);    // In a real app, you would use:



    return (
        <DashboardDataProvider>

            <DashboardLayout userData={user} />

        </DashboardDataProvider>
    );
}