"use client";

import React, { useState, useEffect, use } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
    dialogClose,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import TimeSliderSelector from "@/components/ui/timeSliderSelector";
import DatePicker from '@/components/DatePicker';
import MetricRating from '@/components/ui/metricRating';
import { Button } from '@/components/ui/button';
import moment from "moment";
import { Calendar, Check, Clock, Edit, Plus } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DailyCheckupForm({ createCheckupEntry, createNewMetric, getEntryByDate }) {
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [metrics, setMetrics] = useState([]);
    const [newMetric, setNewMetric] = useState("");
    const [newMetricType, setNewMetricType] = useState("");
    const [dialogError, setDialogError] = useState("");
    const [saveMessage, setSaveMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    async function saveEntry() {
        let data = {
            date: moment(date).format("YYYY-MM-DD"),
            metrics: metrics,
        }

        await createCheckupEntry(data)
        setSaveMessage("Saved!")
        setTimeout(() => {
            setSaveMessage("")
        }, 500)
    }

    function formatSleepDuration(value) {
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        return `${hours}h ${minutes}m`;
    };

    async function addNewMetric() {
        if (!newMetric || !newMetricType) {
            setDialogError("Select name and rating type!")
            return;
        }
        let metricCreated = await createNewMetric(newMetric, newMetricType);
        setDialogError("")
        dialogClose();
        updateMetrics();
    }

    async function updateMetrics() {
        let oldEntry = await getEntryByDate(moment(date).format("YYYY-MM-DD"))
        let newMetrics = await getMetrics()

        const mergedMetrics = [...oldEntry, ...newMetrics.filter(obj2 => !oldEntry.some(obj1 => obj1.id === obj2.id))];

        setMetrics(mergedMetrics);
        console.log(mergedMetrics)
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

    return (
        <form className="mx-4 mb-4 flex flex-col justify-center items-center" >
            <div className="h-20">
                <h1 className="!mb-0">Daily Metrics</h1>
                <p className='text-success text-base h-4 text-center'>{saveMessage}</p>
            </div>
            <div className="w-full mb-6 md:w-[500px] flex items-center justify-center gap-8 md:gap-16">
                <DatePicker updateValues={setDate} selectedRange="day" />
            </div>
            <Card className={`w-full md:w-[500px] transition-all duration-200 ${saveMessage ? "border-success" : ""}`}>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Health Metrics</CardTitle>
                        {isEditing ? <button onClick={() => setIsEditing(!isEditing)}>Done</button> : <Edit onClick={() => setIsEditing(!isEditing)} style={{ cursor: "pointer" }} />}
                    </div>
                    <CardDescription>Keep track of your symptoms, medications, treatments, measurements, etc.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    {metrics.map((metric, pos) => {
                        return (
                            <div className="flex justify-between items-center w-full">
                                <h4>{metric.name}</h4>
                                <MetricRating
                                    ratingType={metric.type}
                                    selectedRating={metric.rating}
                                    setSelectedRating={(rating) => {
                                        setMetrics((prevMetrics) => {
                                            const updatedMetrics = [...prevMetrics];
                                            updatedMetrics[pos] = { ...metric, rating: rating };
                                            return updatedMetrics;
                                        });
                                        saveEntry();
                                    }} />
                            </div>
                        )
                    })
                    }
                    <div className="flex justify-between items-center w-full">
                        <Dialog>
                            <DialogTrigger>
                                <button type="button" className="text-muted-foreground underline cursor-pointer">+ add new metric</button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="text-left">Create new Metric</DialogTitle>
                                    {dialogError ? <DialogDescription className="text-left text-destructive">{dialogError}</DialogDescription> : null}
                                </DialogHeader>
                                <div className="flex gap-4 py-4">
                                    <div className="flex flex-col items-start gap-4">
                                        <Label htmlFor="metricNAme">
                                            Metric name
                                        </Label>
                                        <Input id="metricNAme" placeholder="Headache" className="col-span-3" onChange={(e) => setNewMetric(e.target.value)} />
                                    </div>
                                    <div className="flex flex-col items-start gap-4 w-[40%]">
                                        <Label>
                                            Rating type
                                        </Label>
                                        <Select onValueChange={setNewMetricType}>
                                            <SelectTrigger className="max-w-full">
                                                <SelectValue placeholder="Select..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="scale03">0 - 3</SelectItem>
                                                <SelectItem value="numberInput">Number</SelectItem>
                                            </SelectContent>
                                        </Select>

                                    </div>
                                </div>
                                <DialogFooter className="flex flex-row justify-between">
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button onClick={addNewMetric} type="button">Create Metric</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}
