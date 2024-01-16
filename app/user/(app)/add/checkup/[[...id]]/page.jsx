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

    async function createNewSymptom(name) {
        "use server"
        console.log(name)
        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            headers: { Cookie: cookies().toString() },
            body: JSON.stringify({
                "type": "createSymptom",
                "name": name,
            }),
            cache: 'no-store',
        })
    }

    return (
        <section>
            <DailyCheckupForm createCheckupEntry={createCheckupEntry} createNewSymptom={createNewSymptom}/>
        </section>
    )
}
