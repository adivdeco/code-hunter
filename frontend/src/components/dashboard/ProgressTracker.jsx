
import { motion } from 'framer-motion'

const progressItems = [
    {
        problem: 'Container With Most Water',
        solved: true,
        date: '09/07/2025',
        language: 'JavaScript (Node.js 12.14.0)'
    },
    {
        problem: 'Two Sum',
        solved: true,
        date: '08/07/2025',
        language: 'Python 3.8'
    },
    {
        problem: 'Reverse Linked List',
        solved: false,
        date: '07/07/2025',
        language: 'Java 11'
    }
]

export default function ProgressTracker() {
    const options = {
        loop: true,
        autoplay: true,
        // animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    return (
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-white">30-Day Progress</h3>
                <div className="h-8 w-8">
                    {/* <Lottie animationData={animationData} loop={true} />   */}
                </div>
            </div>

            <div className="space-y-4">
                {progressItems.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                    >
                        <div className={`h-3 w-3 rounded-full mr-3 ${item.solved ? 'bg-green-500' : 'bg-red-500'}`} />
                        <div>
                            <p className="text-white font-medium">{item.problem}</p>
                            <p className="text-gray-400 text-sm">{item.date} • {item.language}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}