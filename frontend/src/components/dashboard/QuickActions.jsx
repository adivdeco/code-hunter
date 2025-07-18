import { CodeBracketIcon as CodeIcon } from '@heroicons/react/24/outline'
import {

    CameraIcon,
    ChatBubbleBottomCenterTextIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

const items = [
    {
        title: "Solve Problems",
        description: "Continue your coding journey",
        link: "/problems",
        icon: <CodeIcon className="h-6 w-6 text-indigo-400" />
    },
    {
        title: "My Shots",
        description: "View your code snippets",
        link: "/shots",
        icon: <CameraIcon className="h-6 w-6 text-blue-400" />
    },
    {
        title: "Feedback",
        description: "Help us improve",
        link: "/feedback",
        icon: <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-green-400" />
    },
    {
        title: "Report Issue",
        description: "Found a bug? Let us know",
        link: "/report",
        icon: <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400" />
    }
]

export default function QuickActions() {
    return (
        <div className="bg-gray-900 rounded-2xl p-6 border font-changa border-gray-800">
            <h3 className="text-lg font-medium text-white/90 font-chango mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-6">
                {items.map((item, index) => (
                    <a
                        key={index}
                        href={item.link}
                        className="group bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition border border-gray-700 hover:border-indigo-500"
                    >
                        <div className="flex items-center">
                            <div className="p-2 mr-3 rounded-lg bg-gray-700 group-hover:bg-indigo-900/30 transition">
                                {item.icon}
                            </div>
                            <div>
                                <h4 className="font-medium text-white group-hover:text-indigo-400 transition">
                                    {item.title}
                                </h4>
                                <p className="text-sm text-gray-400">{item.description}</p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}