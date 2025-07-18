import { useState } from 'react'
import Sidebar from './Sidebar'
import ProfileCard from '../dashboard/ProfileCard'
import ProgressTracker from '../dashboard/ProgressTracker'
import CodingActivity from '../dashboard/CodingActivity'
import SubmissionHistory from '../dashboard/SubmissionHistory'
import QuickActions from '../dashboard/QuickActions'

export default function DashboardLayout({ userData }) {
    const [darkMode, setDarkMode] = useState(true)

    return (
        <div className={`min-h-screen ${darkMode ? 'dark bg-gray-950' : 'bg-gray-50'}`}>
            <div className="flex">
                <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

                <main className="flex-1 p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <ProfileCard user={userData} />

                            <CodingActivity />
                            <SubmissionHistory />
                        </div>

                        <div className="space-y-6">
                            <ProgressTracker />

                            <QuickActions />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}