// "use client"
// import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
// const chartData = [
//     { date: "2024-01-01", value: 0 },
//     { date: "2024-01-02", value: 0 },
//     { date: "2024-01-03", value: 0 },
//     { date: "2024-01-04", value: 3 },
//     { date: "2024-01-05", value: 0 },
//     { date: "2024-01-06", value: 0 },
//     { date: "2024-01-07", value: 0 },
//     { date: "2024-01-08", value: 0 },
//     { date: "2024-01-09", value: 1 },
//     { date: "2024-01-10", value: 0 },
//     { date: "2024-01-11", value: 0 },
//     { date: "2024-01-12", value: 0 },
// ]

// const chartConfig = {
//     value: {
//         label: "Value",
//         color: "hsl(var(--chart-3))",
//     },
// }
// // satisfies ChartConfig

// export default function Component() {
//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>Line Chart - Simple</CardTitle>
//                 <CardDescription>Showing sample data over time</CardDescription>
//             </CardHeader>
//             <CardContent>
//                 <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
//                     <LineChart
//                         accessibilityLayer
//                         data={chartData}
//                         margin={{
//                             left: 12,
//                             right: 12,
//                         }}
//                     >
//                         <CartesianGrid vertical={false} />
//                         <XAxis
//                             dataKey="date"
//                             tickLine={false}
//                             axisLine={false}
//                             tickMargin={8}
//                             minTickGap={32}
//                             tickFormatter={(value) => {
//                                 const date = new Date(value)
//                                 return date.toLocaleDateString("en-US", {
//                                     month: "short",
//                                     day: "numeric",
//                                 })
//                             }}
//                         />
//                         <ChartTooltip
//                             content={
//                                 <ChartTooltipContent
//                                     className="w-[150px]"
//                                     labelFormatter={(value) => {
//                                         return new Date(value).toLocaleDateString("en-US", {
//                                             month: "short",
//                                             day: "numeric",
//                                             year: "numeric",
//                                         })
//                                     }}
//                                 />
//                             }
//                         />
//                         <Line dataKey="value" type="monotone" stroke="var(--color-value)" strokeWidth={2} dot={false} />
//                     </LineChart>
//                 </ChartContainer>
//             </CardContent>
//         </Card>
//     )
// }
"use client"

import { useState, useEffect } from 'react'
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import axiosClient from '@/utils/axiosClint'

const chartConfig = {
    value: {
        label: "Submissions",
        color: "hsl(var(--chart-3))",
    },
}

export default function SubmissionsChart() {
    const [chartData, setChartData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                setLoading(true)
                const response = await axiosClient.get('/problem/submissions')
                const submissions = Array.isArray(response.data) ? response.data : [response.data]

                // Process data to count submissions per date
                const dateCounts = {}

                submissions.forEach(submission => {
                    const date = new Date(submission.createdAt).toISOString().split('T')[0]
                    if (!dateCounts[date]) {
                        dateCounts[date] = 0
                    }
                    dateCounts[date]++
                })

                // Convert to array format and sort by date
                const processedData = Object.entries(dateCounts)
                    .map(([date, value]) => ({
                        date,
                        value: Number(value) // Ensure value is a number
                    }))
                    .sort((a, b) => new Date(a.date) - new Date(b.date))

                console.log('Processed chart data:', processedData) // Debug log
                setChartData(processedData)

            } catch (err) {
                console.error('Error fetching submissions:', err)
                setError(err.response?.data?.message || err.message || 'Failed to fetch submissions')
                setChartData([])
            } finally {
                setLoading(false)
            }
        }

        fetchSubmissions()
    }, [])

    if (loading) return <div className="text-center py-8 text-gray-400">Loading chart data...</div>
    if (error) return <div className="text-center py-8 text-red-500">{error}</div>

    return (
        <Card className="bg-gradient-to-br from-black via-gray-950 to-purple-950 rounded-2xl p-3 border border-gray-800">
            <CardHeader>
                <CardTitle>Daily Submissions</CardTitle>
                <CardDescription>Number of problems submitted per day</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                    <LineChart
                        data={chartData}
                        margin={{ left: 19, right: 15 }}

                        style={{
                            // Reset all SVG styles that might be inherited
                            '--svg-fill': 'none',
                            '--svg-stroke-width': '2',
                            '--svg-animation': 'none',
                            '--svg-stroke-dasharray': 'none',
                            '--svg-stroke-dashoffset': '0'
                        }}
                    >
                        {/* Add this reset style element */}
                        <style>{`
        .recharts-wrapper .recharts-surface svg {
            fill: var(--svg-fill) !important;
            stroke-width: var(--svg-stroke-width) !important;
            animation: var(--svg-animation) !important;
            stroke-dasharray: var(--svg-stroke-dasharray) !important;
            stroke-dashoffset: var(--svg-stroke-dashoffset) !important;
        }
        .recharts-line path {
            fill: none !important;
            stroke-dasharray: none !important;
            animation: none !important;
        }
    `}</style>

                        <CartesianGrid vertical={false} strokeOpacity={0.3} stroke="white" />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })
                                    }}
                                />
                            }
                        />
                        <Line
                            dataKey="value"
                            type="monotone"
                            stroke="var(--color-value)"
                            ill="var(--color-problemSolved)"
                            fillOpacity={1}
                            strokeWidth={7}
                            dot={{
                                r: 5,
                                fillOpacity: 1,
                            }}

                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}