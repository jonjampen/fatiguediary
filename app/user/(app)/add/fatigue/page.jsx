import React from 'react'

import AddForm from '@/components/AddForm'

export default async function AddFatigue() {
    let URL = "http://localhost:3000"

    // get activities
    let res = await fetch(URL + "/api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "type": "getActivities",
        }),
    })
    res = await res.json()
    let activities = res.data
    // add entry
    async function addEnergy(e) {
        "use server"
        console.log("test")
        e.preventDefault();
        res = await fetch(URL + "/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "type": "addEnergylevel",
                "energylevel": energyLevel[0],
                "notes": e.target.notes.value,
                "activities": selectedActivities,
            }),
        });
    }

    return (
        <section>
            <AddForm activities={activities} addEnergy={addEnergy} />
        </section>
    )
}
