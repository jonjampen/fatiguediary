import React from 'react'
import { headers, cookies } from 'next/headers'
import DailyCheckupForm from './form'


export default async function DailyCheckup({ params }) {
    async function createCheckupEntry(data) {
        "use server"
        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            headers: { Cookie: cookies().toString() },
            body: JSON.stringify({
                "type": "createCheckupEntry",
                ...data,
            }),
            cache: 'no-store',
        })

        return true
    }

    async function createNewMetric({ name, type }) {
        "use server"
        console.log("Hello")
        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            headers: { Cookie: cookies().toString() },
            body: JSON.stringify({
                "type": "createMetric",
                "name": name,
                "metricType": type,
            }),
            cache: 'no-store',
        })
        return true;
    }

    async function editMetricDb({ name, id }) {
        "use server"
        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            headers: { Cookie: cookies().toString() },
            body: JSON.stringify({
                "type": "editMetric",
                "name": name,
                "metricId": id,
            }),
            cache: 'no-store',
        })
        return true;
    }

    async function getEntryByDate(date) {
        "use server"
        console.log(date)
        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            headers: { Cookie: cookies().toString() },
            body: JSON.stringify({
                "type": "getdayilyEntry",
                "date": date,
            }),
            cache: 'no-store',
        })
        res = await res.json()
        res = res.data
        return res

    }

    return (
        <section>
            <DailyCheckupForm createCheckupEntry={createCheckupEntry} createNewMetric={createNewMetric} getEntryByDate={getEntryByDate} editMetricDb={editMetricDb} />
        </section>
    )
}
