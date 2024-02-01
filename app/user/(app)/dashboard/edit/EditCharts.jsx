"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, Plus } from 'lucide-react'
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
import DeleteChartDialog from '@/components/DeleteChartDialog'

export default function EditCharts({ metrics, initialCharts, getCharts }) {
    const [charts, setCharts] = useState(initialCharts)

    async function editActivityInChart(chartId, metricId, checked) {
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

    async function updateChartName(chartId, name) {
        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            body: JSON.stringify({
                "type": "updateChartName",
                "chart_id": chartId,
                "name": name,
            }),
            cache: 'no-store',
        })
    }

    async function createNewChart() {
        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            body: JSON.stringify({
                "type": "createNewChart",
            }),
            cache: 'no-store',
        })
        let newCharts = await getCharts()
        setCharts(newCharts)
    }

    async function moveChart(id, pos, direction) {
        if ((pos === 0 && direction === "up") || (pos === charts.length - 1 && direction === "down")) return

        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            body: JSON.stringify({
                "type": "updateChartPos",
                "chart_id": id,
                "position": pos,
                "direction": direction,
            }),
            cache: 'no-store',
        })
        let newCharts = await getCharts()
        setCharts(newCharts)
    }

    return (
        <div className='flex flex-col items-center gap-4 mt-6 mb-4 mx-4'>
            {charts.map((chart, i) => {
                return (
                    <Card key={chart.chart_id} className="w-full">
                        <CardHeader className="pb-4 flex flex-row justify-between items-center gap-2 w-full">
                            <div className="flex flex-col">
                                <Button size="icon" variant="ghost" onClick={() => moveChart(chart.chart_id, chart.chart_order_index, "up")} className="h-4 w-4 hover:bg-transparent"><ChevronUp className={i === 0 ? "text-border cursor-default" : "text-foreground cursor-pointer"} /></Button>
                                <Button size="icon" variant="ghost" onClick={() => moveChart(chart.chart_id, chart.chart_order_index, "down")} className="h-4 w-4 hover:bg-transparent"><ChevronDown className={i === charts.length - 1 ? "text-border cursor-default" : "text-foreground cursor-pointer"} /></Button>
                            </div>
                            <Input name="title" type="text" placeholder="Chart Title" defaultValue={chart.chart_name} onChange={(e) => updateChartName(chart.chart_id, e.target.value)} />
                            <DeleteChartDialog className="inline-block flex-shrink-0" chart={chart} updateCharts={async () => {
                                let newCharts = await getCharts()
                                setCharts(newCharts)
                            }} />
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
            <Button onClick={createNewChart}><Plus className="mr-2 h-4 w-4" /> Add Chart</Button>
        </div>
    )
}
