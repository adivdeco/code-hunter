
"use client"

import { useState, useEffect } from 'react'
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useDashboardData } from "@/contexts/DashboardDataContext"


const chartConfig = {
    value: {
        label: "Submissions",
        color: "hsl(var(--chart-3))",
    },
}

export default function SubmissionsChart() {

    const { submissions, loading, error } = useDashboardData();

    const [chartData, setChartData] = useState([])


    useEffect(() => {


        if (!Array.isArray(submissions)) return;
        // Process data to count submissions per date
        const dateCounts = {}

        submissions.forEach(submission => {
            const date = new Date(submission.createdAt).toISOString().split('T')[0]
            if (!dateCounts[date]) {
                dateCounts[date] = 0
            }
            dateCounts[date]++
            // console.log(dateCounts);

        })

        // Convert to array format and sort by date
        const processedData = Object.entries(dateCounts)
            .map(([date, value]) => ({
                date,
                value: Number(value) // Ensure value is a number
            }))
            .sort((a, b) => new Date(a.date) - new Date(b.date))

        // console.log('Processed chart data:', processedData) // Debug log
        setChartData(processedData)
    }, [submissions]);


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
                    >

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
                            strokeWidth={2}
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
