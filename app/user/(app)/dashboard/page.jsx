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
    const [entries, setEntries] = useState({})
    const [activities, setActivities] = useState({})
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

    async function getActivities(date) {
        let startDate = moment(date).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).subtract(6, "days").format("YYYY-MM-DD HH:mm:ss")
        let endDate = moment(date).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).add(1, "day").format("YYYY-MM-DD HH:mm:ss")

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

    async function updateEntries(date) {
        const [ungroupedEntries, startDate, endDate] = await fetchEntries(date);
        setEntries(ungroupedEntries);
        setActivities(await getActivities(date));
    }

    useEffect(() => {
        updateEntries(moment().toDate())
    }, [])

    return (
        <section className="mx-4">
            <div className="w-full flex flex-col justify-start text-left mb-4">
                <h5 className="text-gray-600">Hi, {session ? session.user.name : ""}</h5>
                <h1 className="text-left text-2xl">Your Dashboard</h1>
            </div>
            <div className="w-full flex flex-col items-center justify-between gap-4">
                <DatePicker updateValues={updateEntries} />
                <RangePicker />
            </div>
            <div className="w-full flex flex-col items-center justify-between gap-4 mt-6">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Energy</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DayChart entries={entries} activities={activities} />
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
