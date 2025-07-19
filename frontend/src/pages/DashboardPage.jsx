import DashboardLayout from '../components/layout/DashboardLayout';
// import useUserStats from '@/hooks/useUserStats';
import { useSelector } from 'react-redux';




export default function DashboardPage() {
    const { user } = useSelector((state) => state.auth);    // In a real app, you would use:

    // console.log(user);

    return (
        <DashboardLayout userData={user} />
    );
}