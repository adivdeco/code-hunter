// // In CodingActivity.jsx
// import CalendarHeatmap from 'react-calendar-heatmap';
// import '@/styles/heatmap.css'; // Make sure this import exists
// import { generateHeatmapData } from '../../utils/generateHeatmapData'

// export default function CodingActivity() {
//     const values = generateHeatmapData()

//     return (
//         <div className="bg-gradient-to-br from-black via-gray-950 to-purple-950 rounded-2xl p-6 border border-gray-800">
//             <h3 className="text-2xl font-medium font-chango text-white/80 mb-6">Coding Activity</h3>

//             <div className="overflow-x-auto">
//                 <CalendarHeatmap
//                     startDate={new Date(new Date().setMonth(new Date().getMonth() - 9))}
//                     endDate={new Date()}
//                     values={values}
//                     classForValue={(value) => {
//                         if (!value) return 'color-empty'
//                         return `color-scale-${value.count}`
//                     }}
//                     tooltipDataAttrs={(value) => ({
//                         // 'data-tip': `${value.date}: ${value.count} problems`
//                         'data-tip': value ? `${value.date}: ${value.count} problems` : 'No activity'

//                     })}
//                     // showWeekdayLabels
//                     showMonthLabels
//                     onClick={(value) => console.log('Clicked:', value)}
//                     gutterSize={7}
//                     transformDayElement={(rect, value, index) => (
//                         <circle
//                             cx={parseInt(rect.props.x) + parseInt(rect.props.width) / 2}
//                             cy={parseInt(rect.props.y) + parseInt(rect.props.height) / 2}
//                             r={Math.min(parseInt(rect.props.width), parseInt(rect.props.height)) / 2 * 1.1}
//                             className={rect.props.className}
//                             data-tip={value ? `${value.date}: ${value.count} problems` : undefined}
//                         />
//                     )}
//                     weekdayLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
//                     monthLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}


//                 />
//             </div>

//             <div className="flex justify-between mt-4 font-chango text-gray-400 text-sm">
//                 <span>Less</span>
//                 <div className="flex space-x-1">
//                     {[0, 1, 2, 3, 4].map((level) => (
//                         <div
//                             key={level}
//                             className={`h-3 w-3 rounded-sm ${level === 0 ? 'bg-gray-800' :
//                                 level === 1 ? 'bg-green-900' :
//                                     level === 2 ? 'bg-green-700' :
//                                         level === 3 ? 'bg-green-500' : 'bg-green-300'
//                                 }`}
//                         />
//                     ))}
//                 </div>
//                 <span>More</span>
//             </div>

//         </div>
//     )
// }
import CalendarHeatmap from 'react-calendar-heatmap';
import '@/styles/heatmap.css';
import { generateHeatmapData } from '../../utils/generateHeatmapData'

export default function CodingActivity() {
    const values = generateHeatmapData()

    return (
        <div className="bg-gradient-to-br from-black via-gray-950 to-purple-950 rounded-2xl p-6 border border-gray-800">
            <h3 className="text-2xl font-medium font-chango text-white/80 mb-6">Coding Activity</h3>

            <div className="overflow-x-auto">
                <CalendarHeatmap
                    startDate={new Date(new Date().setMonth(new Date().getMonth() - 9))}
                    endDate={new Date()}
                    values={values}
                    classForValue={(value) => {
                        if (!value) return 'color-empty'
                        return `color-scale-${value.count}`
                    }}
                    tooltipDataAttrs={(value) => ({
                        'data-tip': value ? `${value.date}: ${value.count} problems` : 'No activity'
                    })}
                    showMonthLabels
                    onClick={(value) => console.log('Clicked:', value)}
                    gutterSize={7}
                    transformDayElement={(rect, value, index) => (
                        <circle
                            key={`day-${index}`} // Add unique key here
                            cx={parseInt(rect.props.x) + parseInt(rect.props.width) / 2}
                            cy={parseInt(rect.props.y) + parseInt(rect.props.height) / 2}
                            r={Math.min(parseInt(rect.props.width), parseInt(rect.props.height)) / 2 * 1.1}
                            className={rect.props.className}
                            data-tip={value ? `${value.date}: ${value.count} problems` : undefined}
                        />
                    )}
                    weekdayLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
                    monthLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
                />
            </div>

            <div className="flex justify-between mt-4 font-chango text-gray-400 text-sm">
                <span>Less</span>
                <div className="flex space-x-1">
                    {[0, 1, 2, 3, 4].map((level) => (
                        <div
                            key={level}
                            className={`h-3 w-3 rounded-sm ${level === 0 ? 'bg-gray-800' :
                                level === 1 ? 'bg-green-900' :
                                    level === 2 ? 'bg-green-700' :
                                        level === 3 ? 'bg-green-500' : 'bg-green-300'
                                }`}
                        />
                    ))}
                </div>
                <span>More</span>
            </div>
        </div>
    )
}