import React from 'react'
import { cookies } from 'next/headers'
import DailyCheckupForm from './form'


export default async function DailyCheckup() {
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

    async function getEntryByDate(date) {
        "use server"
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
            <DailyCheckupForm createCheckupEntry={createCheckupEntry} getEntryByDate={getEntryByDate} />
        </section>
    )
}
