import DatePicker from '@/components/DatePicker'
import RangePicker from '@/components/RangePicker'
import React from 'react'
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
import { headers, cookies } from 'next/headers'
import moment from "moment"

export default async function Dashboard() {

    let URL = "http://localhost:3000"
    async function fetchEntries() {
        "use server"
        let res = await fetch(URL + "/api", {
            method: "POST",
            headers: { Cookie: cookies().toString() },
            body: JSON.stringify({
                "type": "getEntriesByUserId",
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
        return groupedEntries
    }

    let entries = groupEntries(await fetchEntries());

    return (
        <section className="mx-4">
            <h1>Your Entries</h1>
            <div className="w-full flex flex-col items-center justify-between gap-4">
                <DatePicker />
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
                                        <>
                                            <Entry entry={entry} />
                                        </>
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
