import React from 'react'
import { cookies } from 'next/headers'
import DailyCheckupForm from './form'


export default async function DailyCheckup() {
    async function createCheckupEntry({ date, metrics }) {
        "use server"
        console.log("D+M", date, metrics)
        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            headers: { Cookie: cookies().toString() },
            body: JSON.stringify({
                "type": "createCheckupEntry",
                "date": date,
                "metrics": metrics,
            }),
            cache: 'no-store',
        })

        return true
    }

    async function getEntryByDate(date) {
        "use server"
        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            headers: { Cookie: cookies().toString() },
            body: JSON.stringify({
                "type": "getDailyEntry",
                "date": date,
            }),
            cache: 'no-store',
        })
        res = await res.json()
        res = res.data
        return res
    }

    async function getCharts(date) {
        "use server"

        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            headers: { Cookie: cookies().toString() },
            body: JSON.stringify({
                "type": "getChartsOnly",
            }),
            cache: 'no-store',
        })
        res = await res.json()
        res = res.data
        return res
    }
    let charts = await getCharts();

    return (
        <section>
            <DailyCheckupForm createCheckupEntry={createCheckupEntry} getEntryByDate={getEntryByDate} charts={charts} />
        </section>
    )
}
