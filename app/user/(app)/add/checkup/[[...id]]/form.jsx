"use client";

import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import DatePicker from '@/components/DatePicker';
import moment from "moment";
import { Edit } from 'lucide-react'
import Metric from '@/components/Metric';
import AddMetricDialog from '@/components/AddMetricDialog';

export default function DailyCheckupForm({ createCheckupEntry, getEntryByDate }) {
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [metrics, setMetrics] = useState([]);
    const [saveMessage, setSaveMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [entryEdited, setEntryEdited] = useState(false);

    async function saveEntry() {
        let data = {
            date: moment(date).format("YYYY-MM-DD"),
            metrics: metrics,
        }

        let ready = await createCheckupEntry(data)
        if (ready) {
            setSaveMessage("Saved!")
            setTimeout(() => {
                setSaveMessage("")
            }, 500)
        }
    }

    async function updateMetrics() {
        let oldEntry = await getEntryByDate(moment(date).format("YYYY-MM-DD"))
        let newMetrics = await getMetrics()

        const mergedMetrics = [...oldEntry, ...newMetrics.filter(obj2 => !oldEntry.some(obj1 => obj1.id === obj2.id))];

        setMetrics(mergedMetrics);
    }

    async function getMetrics() {
        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            body: JSON.stringify({
                "type": "getMetrics",
            }),
            cache: 'no-store',
        })
        res = await res.json()
        res = res.data

        res = res.map(metric => { return { ...metric, rating: 0 } })
        return res
    }

    useEffect(() => {
        let getAsync = async () => {
            setMetrics(await getMetrics());
        }
        getAsync();
    }, [])

    useEffect(() => {
        updateMetrics();
    }, [date])

    useEffect(() => {
        if (entryEdited) {
            setEntryEdited(false)
            saveEntry();
        }
    }, [metrics])

    return (
        <div className="mx-4 mb-4 flex flex-col justify-center items-center" >
            <h1>Daily Metrics</h1>
            <div className="w-full mb-6 md:w-[500px] flex items-center justify-center gap-8 md:gap-16">
                <DatePicker updateValues={setDate} selectedRange="day" />
            </div>

            <Card className={`w-full md:w-[500px] transition-all duration-200 ${saveMessage ? "border-success" : ""}`}>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Health Metrics</CardTitle>
                        <p className='text-success text-base text-center'>{saveMessage}</p>
                        {isEditing ? <button onClick={() => setIsEditing(!isEditing)}>Done</button> : <Edit onClick={() => setIsEditing(!isEditing)} style={{ cursor: "pointer" }} />}
                    </div>
                    <CardDescription>Keep track of your symptoms, medications, treatments, measurements, etc.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    {metrics.filter(metric => !metric.hidden).map((metric, pos) => {
                        return (
                            <Metric metric={metric} position={pos} setMetrics={setMetrics} isEditing={isEditing} updateMetrics={updateMetrics} setEntryEdited={setEntryEdited} />
                        )
                    })}

                    {/* Show hidden activities in editing mode */}
                    {isEditing ?
                        <>
                            <hr />
                            <p className='text-center'>Hidden Metrics</p>

                            {metrics.filter(metric => metric.hidden).map((metric, pos) => {
                                return (
                                    <Metric metric={metric} position={pos} setMetrics={setMetrics} isEditing={isEditing} updateMetrics={updateMetrics} setEntryEdited={setEntryEdited} />
                                )
                            })
                            }
                        </>
                        : null
                    }

                    <AddMetricDialog updateMetrics={updateMetrics} />
                </CardContent>
            </Card>
        </div >
    )
}
