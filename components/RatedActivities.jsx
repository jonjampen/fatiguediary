"use client"
import { calculateColor } from '@/app/lib/calculateColor'
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function RatedActivities() {
    const [goodActivities, setGoodActivities] = useState()
    const [badActivities, setBadActivities] = useState()
    const [worstScore, setWorstScore] = useState()
    const [bestScore, setBestScore] = useState()
    let URL = "http://localhost:3000"
    let activityDiffs = {};

    async function fetchEntries() {
        let res = await fetch(URL + "/api", {
            method: "POST",
            body: JSON.stringify({
                "type": "getEntriesActivities",
            }),
        })
        res = await res.json()
        return res.data
    }

    function calculateActivities(entries) {
        let lastEntryId, lastDifference;

        entries.map((entry, key) => {
            if (key === 0 || !entry.activity_name) return;

            if (!activityDiffs[entry.activity_name])
                activityDiffs[entry.activity_name] = [];

            let difference = entry.energylevel - entries[key - 1].energylevel

            // fix difference for entry with multiple activities
            if (entry.energy_id === lastEntryId)
                difference = lastDifference

            activityDiffs[entry.activity_name].push(difference)

            lastEntryId = entry.energy_id;
            lastDifference = difference;
        })

        let ratedActivities = {
            "good": [],
            "bad": [],
        };
        let tempBestScore = 0, tempWorstScore = 0;
        Object.keys(activityDiffs).forEach((key) => {
            let values = activityDiffs[key];
            let sum = values.reduce((currentTotal, current) => currentTotal + current, 0);
            let len = values.length
            let avg = len != 0 ? sum / len : 0;

            tempBestScore = Math.max(avg, tempBestScore)
            tempWorstScore = Math.min(avg, tempWorstScore)

            let scoreType = avg < 0 ? 'bad' : avg > 0 ? 'good' : undefined;

            if (scoreType)
                ratedActivities[scoreType][key] = avg;
        })
        setBestScore(tempBestScore)
        setWorstScore(tempWorstScore)
        // setGoodActivities()
        // setBadActivities()
        const sortByGoodValue = (a, b) => b[1] - a[1];
        const sortByBadValue = (a, b) => a[1] - b[1];
        setBadActivities(Object.entries(ratedActivities.bad).sort(sortByBadValue))
        setGoodActivities(Object.entries(ratedActivities.good).sort(sortByGoodValue))
    }

    function calculateRelativeColor(avg) {
        let offset = 0;
        let scale;
        let colorIndex;
        const numColors = 5;

        if (avg > 0) {
            scale = bestScore / numColors;
            offset = 6
            colorIndex = Math.ceil(avg / scale - 1) + offset;
        }
        else {
            scale = worstScore / numColors;
            colorIndex = (numColors - 1) - Math.ceil(avg / scale - 1);
        }
        return calculateColor(colorIndex)
    }

    useEffect(() => {
        (async () => {
            let entries = await fetchEntries()
            calculateActivities(entries);
        })()
    }, [])


    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Energy boosting activities</CardTitle>
                    {/* <CardDescription>Card Description</CardDescription> */}
                </CardHeader>
                <CardContent>
                    <ul className="activities w-full">
                        {goodActivities != undefined ? (
                            goodActivities.map((values, key) => {
                                let color = calculateRelativeColor(values[1])
                                return (
                                    <li className="border rounded min-h-[44px] flex items-center justify-center text-center cursor-pointer select-none px-1" key={key}
                                        style={{
                                            "border": "2px solid " + color,
                                            'wordBreak': 'break-all'
                                        }}>
                                        {values[0]}
                                    </li>
                                )
                            })

                        ) : (
                            <p>Loading...</p>
                        )}
                    </ul>
                </CardContent>
            </Card>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Energy draining activities</CardTitle>
                    {/* <CardDescription>Card Description</CardDescription> */}
                </CardHeader>
                <CardContent>
                    <ul className="activities w-full">
                        {badActivities != undefined ? (
                            badActivities.map((values, key) => {
                                let color = calculateRelativeColor(values[1])
                                return (
                                    <li className="border rounded min-h-[44px] flex items-center justify-center text-center cursor-pointer select-none px-1" key={key}
                                        style={{
                                            "border": "2px solid " + color,
                                            'wordBreak': 'break-all'
                                        }}>
                                        {values[0]}
                                    </li>
                                )
                            })
                        ) : (
                            <p>Loading...</p>
                        )}
                    </ul>
                </CardContent>
            </Card>
        </>
    )
}