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

    let entries = await fetchEntries();
    console.log(entries)

    return (
        <section className="mx-4">
            <h1>Your Entries</h1>
            <div className="w-full flex flex-col items-center justify-between gap-4">
                <DatePicker />
            </div>
            <div className="w-full flex flex-col items-center justify-between gap-4 mt-6">
                <BorderStyle avg={8} className="w-full">
                    <CardHeader className="">
                        <CardTitle className="flex justify-between items-center ">
                            <p>Sun, 27.08.2023</p>
                            <EnergyValue avg={8}>
                                <span>8</span>
                            </EnergyValue>
                        </CardTitle>
                        {/* <CardDescription>Day Summary (TK)</CardDescription> */}
                    </CardHeader>
                    <CardContent className="">
                        {entries.map(entry => {
                            return (
                                <Entry entry={entry} />
                            )
                        })}
                    </CardContent>
                </BorderStyle>
            </div>
        </section>
    )
}
