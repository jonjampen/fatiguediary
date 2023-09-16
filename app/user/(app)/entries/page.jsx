"use client"
import DatePicker from '@/components/DatePicker'
import RangePicker from '@/components/RangePicker'
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Entry from '@/components/Entry'
import BorderStyle from '@/components/BorderStyle'
import EnergyValue from '@/components/EnergyValue'
import moment from "moment"

export default function Dashboard() {
    const [entries, setEntries] = useState({})
    let URL = "http://localhost:3000"

    async function fetchEntries(date = null) {
        date = date != null ? date : moment()
        let startDate = moment(date).subtract(6, "days").format("YYYY-MM-DD HH:mm:ss")
        let endDate = moment(date).add(1, "day").format("YYYY-MM-DD HH:mm:ss")

        let res = await fetch(URL + "/api", {
            method: "POST",
            body: JSON.stringify({
                "type": "getEntriesByUserId",
                "startDate": startDate,
                "endDate": endDate,
            }),
        })
        res = await res.json()
        return res.data
    }

    function groupEntries(entries) {
        let groupedEntries = {};
        entries.map(entry => {
            let formattedDate = moment(entry.datetime).format("YYYY-MM-DD");
            if (!groupedEntries[formattedDate]) {
                groupedEntries[formattedDate] = []
            }
            groupedEntries[formattedDate].push(entry);
        })

        // reverse sub-array order (Asc day but Desc week)
        Object.entries(groupedEntries).map(([date, dayEntries]) => {
            groupEntries[date] = dayEntries.reverse()
        })

        return groupedEntries
    }

    async function updateEntries(date = null) {
        setEntries(groupEntries(await fetchEntries(date)));
    }

    useEffect(() => {
        updateEntries()
    }, [])

    return (
        <section className="mx-4">
            <h1>Your Entries</h1>
            <div className="w-full flex flex-col items-center justify-between gap-4">
                <DatePicker updateEntries={updateEntries} />
            </div>
            {Object.entries(entries).map(([date, dayEntries]) => {
                return (
                    <div className="w-full flex flex-col items-center justify-between gap-4 mt-6">
                        <BorderStyle avg={8} className="w-full">
                            <CardHeader className="">
                                <CardTitle className="flex justify-between items-center ">
                                    <p>{moment(date).format("ddd, DD.MM.YYYY")}</p>
                                    <EnergyValue avg={8}>
                                        <span>8</span>
                                    </EnergyValue>
                                </CardTitle>
                                {/* <CardDescription>Day Summary (TK)</CardDescription> */}
                            </CardHeader>
                            <CardContent className="">
                                {dayEntries.map(entry => {
                                    return (
                                        <Entry entry={entry} />
                                    )
                                })}
                            </CardContent>
                        </BorderStyle >
                    </div >
                )
            })}
        </section >
    )
}
