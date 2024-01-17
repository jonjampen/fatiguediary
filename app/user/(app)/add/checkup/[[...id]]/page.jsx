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
    }

    async function createNewMetric(name, type) {
        "use server"
        console.log(name, type)
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

    return (
        <section>
            <DailyCheckupForm createCheckupEntry={createCheckupEntry} createNewMetric={createNewMetric} />
        </section>
    )
}
