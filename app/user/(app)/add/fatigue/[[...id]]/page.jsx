import React from 'react'

import AddForm from '@/components/AddForm'
import { headers, cookies } from 'next/headers'

export default async function AddFatigue({ params }) {
    async function fetchActivities() {
        "use server"
        // get activities
        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            // credentials: "include",
            // headers: {
            // "cookie": headers().get("cookie"),
            // },
            headers: { Cookie: cookies().toString() },
            body: JSON.stringify({
                "type": "getActivities",
            }),
            cache: 'no-store',
        })
        res = await res.json()
        return res.data
    }

    let activities = await fetchActivities();

    return (
        <section>
            <AddForm startActivities={activities} fetchActivities={fetchActivities} id={parseInt(params.id)} />
        </section>
    )
}
