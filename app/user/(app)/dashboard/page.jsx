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
import DayChart from "@/components/DayChart"

export default function Dashboard() {
    const { data: session, status } = useSession()
    const [entries, setEntries] = useState([])
    const [startDate, setStartDate] = useState(moment().startOf('day').format("YYYY-MM-DD HH:mm:ss"))
    const [endDate, setEndDate] = useState(moment().endOf("day").format("YYYY-MM-DD HH:mm:ss"))
    const [selectedDate, setSelectedDate] = useState(moment().startOf("day").toDate())
    const [range, setRange] = useState("day")
    const [activities, setActivities] = useState({})
    let URL = "http://localhost:3000"


    async function fetchEntries() {
        console.log(startDate, endDate)
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

    async function getActivities() {
        let res = await fetch(URL + "/api", {
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

    useEffect(() => {
        // let newEndDate = moment(startDate).startOf("day").subtract
        // setEndDate(newEndDate)
        updateEntries()
    }, [startDate, endDate])

    function updateDate(date) {
        if (range === "day") {
            setStartDate(date)
            setEndDate(moment(date).endOf("day").toDate())
        }
        else if (range === "week") {
            setStartDate(moment(date).startOf("isoWeek").toDate())
            setEndDate(moment(date).endOf("isoWeek").toDate())
        }
    }

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
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DayChart entries={entries} activities={activities} startDate={startDate} endDate={endDate} />
                    </CardContent>
                </Card>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Energy boosting activities</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Chart</p>
                    </CardContent>
                </Card>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Energy draining activities</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Chart</p>
                    </CardContent>
                </Card>

            </div>
        </section>
    )
}
