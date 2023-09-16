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
    const [averages, setAverages] = useState({})
    let URL = "http://localhost:3000"

    async function fetchEntries(date) {

        let startDate = moment(date).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).subtract(6, "days").format("YYYY-MM-DD HH:mm:ss")
        let endDate = moment(date).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).add(1, "day").format("YYYY-MM-DD HH:mm:ss")

        let res = await fetch(URL + "/api", {
            method: "POST",
            body: JSON.stringify({
                "type": "getEntriesByUserId",
                "startDate": startDate,
                "endDate": endDate,
            }),
        })
        res = await res.json()
        return [res.data, startDate, endDate]
    }

    function groupEntries(ungroupedEntries, startDate, endDate) {
        let groupedEntries = {};
        for (let counter = moment(endDate).subtract(1, "day"); counter.isSameOrAfter(moment(startDate)); counter.subtract(1, "day").clone()) {
            let formattedDate = counter.format("YYYY-MM-DD")
            groupedEntries[formattedDate] = []
        }
        ungroupedEntries.map(entry => {
            let formattedDate = moment(entry.datetime).format("YYYY-MM-DD");
            if (groupedEntries[formattedDate]) {
                // groupedEntries[formattedDate] = []
                groupedEntries[formattedDate].push(entry);
            }
        })

        // reverse sub-array order (Asc day but Desc week)
        Object.entries(groupedEntries).map(([date, dayEntries]) => {
            groupEntries[date] = dayEntries.reverse()
        })

        return groupedEntries
    }

    async function updateEntries(date) {
        const [ungroupedEntries, startDate, endDate] = await fetchEntries(date);
        setEntries(groupEntries(ungroupedEntries, startDate, endDate));
    }

    useEffect(() => {
        updateEntries(moment().toDate())
    }, [])

    useEffect(() => {
        let averagesCopy = structuredClone(averages)
        Object.entries(entries).map(([iterationDate, dayEntries]) => {
            let counter = 0;
            let sum = 0;

            dayEntries.map(entry => {
                sum += entry.energylevel;
                counter++;
            })
            averagesCopy[iterationDate] = counter != 0 ? sum / counter : ""
        })
        setAverages(averagesCopy)
    }, [entries])

    return (
        <section className="mx-4">
            <h1>Your Entries</h1>
            <div className="w-full flex flex-col items-center justify-between gap-4">
                <DatePicker updateEntries={updateEntries} />
            </div>
            {Object.entries(entries).map(([date, dayEntries]) => {
                return (
                    <div key={date} className="w-full flex flex-col items-center justify-between gap-4 mt-6">
                        <BorderStyle avg={averages[date]} className="w-full">
                            <CardHeader className="">
                                <CardTitle className="flex justify-between items-center ">
                                    <p>{moment(date).format("ddd, DD.MM.YYYY")}</p>
                                    <EnergyValue avg={averages[date]}>
                                        <span>{averages[date]}</span>
                                    </EnergyValue>
                                </CardTitle>
                                {/* <CardDescription>Day Summary (TK)</CardDescription> */}
                            </CardHeader>
                            <CardContent className="">
                                {dayEntries.map(entry => {
                                    return (
                                        <Entry key={entry.id} entry={entry} />
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
