import React from 'react'
import { headers, cookies } from 'next/headers'
import DailyCheckupForm from './form'


export default async function DailyCheckup({ params }) {
    async function createCheckupEntry(data) {
        "use server"
        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            // credentials: "include",
            // headers: {
            // "cookie": headers().get("cookie"),
            // },
            headers: { Cookie: cookies().toString() },
            body: JSON.stringify({
                "type": "createCheckupEntry",
                ...data,
            }),
            cache: 'no-store',
        })
    }

    return (
        <section>
            <DailyCheckupForm createCheckupEntry={createCheckupEntry}/>
        </section>
    )
}
