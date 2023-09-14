import React from 'react'

import AddForm from '@/components/AddForm'

export default async function AddFatigue() {
    let URL = "http://localhost:3000"

    async function fetchActivities() {
        "use server"
        // get activities
        let res = await fetch(URL + "/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
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
            <AddForm startActivities={activities} fetchActivities={fetchActivities} />
        </section>
    )
}
