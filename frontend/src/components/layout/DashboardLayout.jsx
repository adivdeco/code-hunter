import { useState } from 'react'
import Sidebar from './Sidebar'
import ProfileCard from '../dashboard/ProfileCard'
import ProgressTracker from '../dashboard/ProgressTracker'
import CodingActivity from '../dashboard/CodingActivity'
import SubmissionHistory from '../dashboard/SubmissionHistory'
import QuickActions from '../dashboard/QuickActions'
import RaderChat from "../dashboard/RaderChat"
import LineChart from "../dashboard/LineChart"
import Navbar from '../Navbar'

export default function DashboardLayout({ userData }) {
    const [darkMode, setDarkMode] = useState(true)

    return (
        <div className={`min-h-screen ${darkMode ? 'dark bg-gray-950' : 'bg-gray-50'}`}>
            <nav className='text-white'>
                <Navbar />
            </nav>

            <div className="flex ">
                <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} user={userData} />

                <main className="flex-1 p-6 mt-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2  space-y-6">
                            <ProfileCard user={userData} />
                            <CodingActivity />
                            <SubmissionHistory />

                        </div>
                        <div className="space-y-5">
                            <ProgressTracker />
                            <QuickActions />
                            <RaderChat />
                        </div>

                    </div>
                    <div className='mt-4'>
                        <LineChart />

                    </div>
                </main>


            </div>
        </div>
    )
}