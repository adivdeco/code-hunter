"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    // ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
import { useDashboardData } from "@/contexts/DashboardDataContext"
import { useState, useEffect } from "react"


// const chartData = [
//     { month: "Python", problemSolved: 4 },
//     { month: "Js", problemSolved: 7 },
//     { month: "Java", problemSolved: 3 },
//     { month: "C++", problemSolved: 3 },
//     { month: "GO", problemSolved: 2 },

// ]

const chartConfig = {
    problemSolved: {
        label: "problemSolved",
        color: "hsl(var(--chart-3))",
    },
}
// satisfies, ChartConfig

export default function Component() {
    const { submissions, loading, error, stats } = useDashboardData();
    // console.log('submissions', submissions);
    const [chartData, setChartData] = useState([])


    useEffect(() => {
        if (!Array.isArray(submissions)) return;
        const dataCounts = {}

        submissions.forEach(submissions => {
            const data = submissions.language;
            if (!dataCounts[data]) {
                dataCounts[data] = 0
            }
            dataCounts[data]++
        })
        // console.log(dataCounts);


        // Convert to array format and sort by date
        const processedData = Object.entries(dataCounts)
            .map(([month, problemSolved]) => ({
                month: String(month),
                problemSolved: Number(problemSolved)
            }))
        setChartData(processedData)
    }, [submissions])


    if (loading) return <div className="text-center py-8 text-gray-400">Loading chart data...</div>
    if (error) return <div className="text-center py-8 text-red-500">{error}</div>

    return (

        <Card className="bg-gradient-to-br from-black via-gray-950 to-purple-950 rounded-2xl  border border-gray-800">
            <CardHeader className="items-center pb-4">
                <CardTitle className="font-chango text-xl text-white/80 ">Language Proficiency</CardTitle>
                <CardDescription className="text-center font-changa">
                    Visual representation of the number of questions attempted across different programming languages.
                </CardDescription>
            </CardHeader>


            <CardContent className="pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadarChart data={chartData}>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <PolarGrid gridType="circle" />
                        <PolarAngleAxis dataKey="month" />
                        <Radar
                            dataKey="problemSolved"
                            fill="var(--color-problemSolved)"
                            fillOpacity={0.3}
                            dot={{
                                r: 4,
                                fillOpacity: 1,
                            }}
                            style={{
                                animation: 'none', // Disable the global animation
                                strokeDasharray: 'none', // Remove dash array
                                strokeDashoffset: '0', // Reset offset
                                stroke: 'var(--color-problemSolved)', // Use your chart color
                                strokeWidth: 1, // Set appropriate width
                                fill: "var(--color-problemSolved)"
                            }}

                        />
                    </RadarChart>
                </ChartContainer>
            </CardContent>

            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Multilingual coding activity grew by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>

            </CardFooter>
        </Card>
    )
}
