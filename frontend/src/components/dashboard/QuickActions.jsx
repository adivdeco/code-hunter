// import { CodeBracketIcon as CodeIcon } from '@heroicons/react/24/outline'
// import {

//     CameraIcon,
//     ChatBubbleBottomCenterTextIcon,
//     ExclamationTriangleIcon
// } from '@heroicons/react/24/outline'

// const items = [
//     {
//         title: "Solve Problems",
//         description: "Continue your coding journey",
//         link: "/problems",
//         icon: <CodeIcon className="h-6 w-6 text-indigo-400" />
//     },
//     {
//         title: "My Shots",
//         description: "View your code snippets",
//         link: "/shots",
//         icon: <CameraIcon className="h-6 w-6 text-blue-400" />
//     },
//     {
//         title: "Feedback",
//         description: "Help us improve",
//         link: "/feedback",
//         icon: <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-green-400" />
//     },
//     {
//         title: "Report Issue",
//         description: "Found a bug? Let us know",
//         link: "/report",
//         icon: <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400" />
//     }
// ]

// export default function QuickActions() {
//     return (
//         <div className="bg-gradient-to-br from-black via-gray-950 to-purple-950  rounded-2xl p-4 border font-changa ">
//             <h3 className="text-lg font-medium text-white/90 font-chango mb-6">Quick Actions</h3>
//             <div className="grid grid-cols-1 gap-2">
//                 {items.map((item, index) => (
//                     <a
//                         key={index}
//                         href={item.link}
//                         className="group bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition border border-gray-700 hover:border-indigo-500"
//                     >
//                         <div className="flex items-center">
//                             <div className="p-2 mr-3 rounded-lg bg-gray-700 group-hover:bg-indigo-900/30 transition">
//                                 {item.icon}
//                             </div>
//                             <div>
//                                 <h4 className="font-medium text-white group-hover:text-indigo-400 transition">
//                                     {item.title}
//                                 </h4>
//                                 <p className="text-sm text-gray-400">{item.description}</p>
//                             </div>
//                         </div>
//                     </a>
//                 ))}
//             </div>
//         </div>
//     )
// }

import {
    CodeBracketIcon,
    CameraIcon,
    ChatBubbleBottomCenterTextIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'; // Make sure to import NavLink

export default function QuickActions() {
    return (
        <div className="bg-gradient-to-br from-black via-gray-950 to-purple-950 rounded-2xl p-4 border font-changa border-gray-800">
            <h3 className="text-lg font-medium text-white/90 font-chango mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-2">

                {/* --- Item 1: Solve Problems --- */}
                <NavLink
                    to="/problems"
                    className="group bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition border border-gray-700 hover:border-indigo-500"
                >
                    <div className="flex items-center">
                        <div className="p-2 mr-3 rounded-lg bg-gray-700 group-hover:bg-indigo-900/30 transition">
                            <CodeBracketIcon className="h-6 w-6 text-indigo-400" />
                        </div>
                        <div>
                            <h4 className="font-medium text-white group-hover:text-indigo-400 transition">
                                Solve Problems
                            </h4>
                            <p className="text-sm text-gray-400">Continue your coding journey</p>
                        </div>
                    </div>
                </NavLink>

                {/* --- Item 2: My Shots --- */}
                <NavLink
                    to="/shots"
                    className="group bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition border border-gray-700 hover:border-indigo-500"
                >
                    <div className="flex items-center">
                        <div className="p-2 mr-3 rounded-lg bg-gray-700 group-hover:bg-indigo-900/30 transition">
                            <CameraIcon className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                            <h4 className="font-medium text-white group-hover:text-indigo-400 transition">
                                My Shots
                            </h4>
                            <p className="text-sm text-gray-400">View your code snippets</p>
                        </div>
                    </div>
                </NavLink>

                {/* --- Item 3: Feedback --- */}
                <NavLink
                    to="/feedback"
                    className="group bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition border border-gray-700 hover:border-indigo-500"
                >
                    <div className="flex items-center">
                        <div className="p-2 mr-3 rounded-lg bg-gray-700 group-hover:bg-indigo-900/30 transition">
                            <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-green-400" />
                        </div>
                        <div>
                            <h4 className="font-medium text-white group-hover:text-indigo-400 transition">
                                Feedback
                            </h4>
                            <p className="text-sm text-gray-400">Help us improve</p>
                        </div>
                    </div>
                </NavLink>

                {/* --- Item 4: Report Issue --- */}
                <NavLink
                    to="/report"
                    className="group bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition border border-gray-700 hover:border-indigo-500"
                >
                    <div className="flex items-center">
                        <div className="p-2 mr-3 rounded-lg bg-gray-700 group-hover:bg-indigo-900/30 transition">
                            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400" />
                        </div>
                        <div>
                            <h4 className="font-medium text-white group-hover:text-indigo-400 transition">
                                Report Issue
                            </h4>
                            <p className="text-sm text-gray-400">Found a bug? Let us know</p>
                        </div>
                    </div>
                </NavLink>

            </div>
        </div>
    )
}