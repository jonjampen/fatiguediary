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
        let changedMetrics = metrics.filter(metric => metric.changed)
        let data = {
            date: moment(date).format("YYYY-MM-DD"),
            metrics: changedMetrics,
        }

        let ready = await createCheckupEntry(data)
        metrics.filter(metric => metric.changed).map(metric => metric.changed = false)
        if (ready) {
            setSaveMessage("Saved!")
            setTimeout(() => {
                setSaveMessage("")
            }, 500)
        }
    }

    async function updateMetrics() {
        let updatedMetrics = await getEntryByDate(moment(date).format("YYYY-MM-DD"))
        setMetrics(updatedMetrics);
    }

    useEffect(() => {
        let getAsync = async () => {
            await updateMetrics();
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
                            <Metric key={metric.id} metric={metric} position={pos} setMetrics={setMetrics} isEditing={isEditing} updateMetrics={updateMetrics} setEntryEdited={setEntryEdited} />
                        )
                    })}

                    {/* Show hidden activities in editing mode */}
                    {isEditing ?
                        <>
                            <hr />
                            <p className='text-center'>Hidden Metrics</p>

                            {metrics.filter(metric => metric.hidden).map((metric, pos) => {
                                return (
                                    <Metric key={metric.id} metric={metric} position={pos} setMetrics={setMetrics} isEditing={isEditing} updateMetrics={updateMetrics} setEntryEdited={setEntryEdited} />
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
