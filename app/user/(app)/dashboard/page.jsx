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
import { useSession } from 'next-auth/react';
import moment from "moment"
import DayChart from "@/components/charts/DayChart"
import WeekChart from "@/components/charts/WeekChart"
import MonthChart from "@/components/charts/MonthChart"
import YearChart from "@/components/charts/YearChart"
import RatedActivities from '@/components/RatedActivities'

export default function Dashboard() {
    const { data: session, status } = useSession()
    const [entries, setEntries] = useState([])
    const [startDate, setStartDate] = useState(moment().startOf('day').format("YYYY-MM-DD HH:mm:ss"))
    const [endDate, setEndDate] = useState(moment().endOf("day").format("YYYY-MM-DD HH:mm:ss"))
    const [selectedDate, setSelectedDate] = useState(moment().startOf("day").toDate())
    const [range, setRange] = useState("day")
    const [activities, setActivities] = useState({})

    async function fetchEntries() {
        let res = await fetch(process.env.URL + "/api", {
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

    async function getActivities() {
        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            body: JSON.stringify({
                "type": "getActivitiesById",
                "startDate": startDate,
                "endDate": endDate,
            }),
        })
        res = await res.json()
        return res.data
    }

    async function updateEntries() {
        setEntries(await fetchEntries());
        setActivities(await getActivities());
    }

    function updateDate(date) {
        setStartDate(moment(date).startOf(range).format("YYYY-MM-DD HH:mm:ss"))
        setEndDate(moment(date).endOf(range).format("YYYY-MM-DD HH:mm:ss"))
    }

    useEffect(() => {
        updateEntries()
    }, [startDate, endDate])

    useEffect(() => {
        updateDate(selectedDate)
    }, [selectedDate, range])

    return (
        <section className="mx-4">
            <div className="w-full flex flex-col justify-start text-left mb-4">
                <h5 className="text-gray-600">Hi, {session ? session.user.name : ""}</h5>
                <h1 className="text-left text-2xl">Your Dashboard</h1>
            </div>
            <div className="w-full flex flex-col items-center justify-between gap-4">
                <DatePicker updateValues={setSelectedDate} />
                <RangePicker setRange={setRange} />
            </div>
            <div className="w-full flex flex-col items-center justify-between gap-4 mt-6">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Energy</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {(() => {
                            if (range === "day") {
                                return (<DayChart entries={entries} activities={activities} startDate={startDate} endDate={endDate} range={range} />)
                            }
                            else if (range === "isoWeek") {
                                return (<WeekChart entries={entries} activities={activities} startDate={startDate} endDate={endDate} range={range} />)
                            }
                            else if (range === "month") {
                                return (<MonthChart entries={entries} activities={activities} startDate={startDate} endDate={endDate} range={range} />)
                            }
                            else if (range === "year") {
                                return (<YearChart entries={entries} activities={activities} startDate={startDate} endDate={endDate} range={range} />)
                            }
                        })()}

                    </CardContent>
                </Card>
                <RatedActivities />

            </div>
        </section>
    )
}
