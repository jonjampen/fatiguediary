"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import MetricsInChartSelector from '@/components/MetricsInChartSelector'
import { Input } from "@/components/ui/input"

export default function EditCharts({ metrics, initialCharts, getCharts }) {
    const [charts, setCharts] = useState(initialCharts)

    async function editActivityInChart(chartId, metricId, checked) {
        console.log(chartId, metricId, checked)

        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            body: JSON.stringify({
                "type": "updateChartMetrics",
                "chart_id": chartId,
                "metric_id": metricId,
                "metric_state": checked,
            }),
            cache: 'no-store',
        })

        let newCharts = await getCharts()
        setCharts(newCharts)
    }
    return (
        <div className='flex flex-col items-center gap-4 mt-6 mb-4 mx-4'>
            {charts.map((chart) => {
                return (
                    <Card key={chart.chart_id} className="w-full">
                        <CardHeader className="pb-4">
                            <Input name="title" type="text" placeholder="Chart Title" defaultValue={chart.chart_name} />
                        </CardHeader>
                        <CardContent>
                            <ul className="flex flex-col gap-2">
                                {metrics.map(metric => {
                                    return <MetricsInChartSelector key={metric.id} chartId={chart.chart_id} metric={metric} checked={chart.metric_ids.includes(metric.id.toString())} onChange={editActivityInChart} />
                                })}
                            </ul>
                        </CardContent>
                    </Card>
                )
            })}
            <Button><Plus className="mr-2 h-4 w-4" /> Add Chart</Button>
        </div>
    )
}
