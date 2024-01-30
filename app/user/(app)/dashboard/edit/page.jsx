import React from 'react'
import EditCharts from './EditCharts'
import { cookies } from 'next/headers'

export default async function editDashboard() {
    async function getMetrics() {
        "use server"

        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            headers: { Cookie: cookies().toString() },
            body: JSON.stringify({
                "type": "getMetrics",
            }),
            cache: 'no-store',
        })
        res = await res.json()
        res = res.data
        return res
    }

    async function getCharts() {
        "use server"

        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            headers: { Cookie: cookies().toString() },
            body: JSON.stringify({
                "type": "getCharts",
            }),
            cache: 'no-store',
        })
        res = await res.json()
        if (res.data) {

            res = res.data
            return res.map(chart => ({ ...chart, metric_ids: chart.metric_ids ? chart.metric_ids.split(",") : [] }))
        }
        return []
    }

    let metrics = await getMetrics()
    let charts = await getCharts()

    return (
        <div className="flex flex-col items-center justify-start">
            <div className="max-w-[500px] w-full">
                <h1>Edit your Dashboard</h1>
                <EditCharts metrics={metrics} getCharts={getCharts} initialCharts={charts} />
            </div>
        </div>
    )
}
