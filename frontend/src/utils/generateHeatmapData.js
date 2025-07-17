// import { useSelector } from "react-redux"


// // user.provlemSolved.map((dt)=>dt.solvedAt)

// export function generateHeatmapData() {
//     const { user } = useSelector((state) => state.auth);
//     console.log(user);

//     const data = []
//     const now = new Date()
//     const startDate = new Date(new Date().setMonth(now.getMonth() - 9))

//     for (let d = new Date(startDate); d <= now; d.setDate(d.getDate() + 1)) {
//         const count = Math.floor(Math.random() * 5)
//         if (count > 0 || Math.random() > 0.7) {
//             data.push({
//                 date: new Date(d),
//                 count: count
//             })
//         }
//     }

//     return data
// }
// src/utils/generateHeatmapData.js
import { useSelector } from "react-redux";
import { useMemo } from "react";

// Custom hook to generate heatmap data
export function generateHeatmapData() {
    const { user } = useSelector((state) => state.auth);

    const values = useMemo(() => {
        if (!user || !user.problemSolved) return [];

        // Step 1: Count number of problems solved per date (YYYY-MM-DD)
        const countMap = {};

        user.problemSolved.forEach(({ solvedAt }) => {
            const dateKey = new Date(solvedAt).toISOString().split('T')[0]; // "YYYY-MM-DD"
            countMap[dateKey] = (countMap[dateKey] || 0) + 1;
        });

        // Step 2: Create continuous date range for heatmap (6 months)
        const now = new Date();
        const startDate = new Date(new Date().setMonth(now.getMonth() - 6));
        const data = [];

        for (let d = new Date(startDate); d <= now; d.setDate(d.getDate() + 1)) {
            const dateKey = d.toISOString().split('T')[0];
            data.push({
                date: dateKey,
                count: countMap[dateKey] || 0,
            });
        }

        return data;
    }, [user]);

    return values;
}
