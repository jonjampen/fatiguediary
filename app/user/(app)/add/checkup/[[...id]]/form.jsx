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
import { Calendar, Clock, Edit, Plus } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DailyCheckupForm({ createCheckupEntry, createNewMetric }) {
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [sleepQuality, setSleepQuality] = useState(0);
    const [sleepDuration, setSleepDuration] = useState(0);
    const [stress, setStress] = useState(0);
    const [mood, setMood] = useState(0);
    const [metrics, setMetrics] = useState([]);
    const [metricsRating, setMetricsRating] = useState({});
    const [newMetric, setNewMetric] = useState("");
    const [newMetricType, setNewMetricType] = useState("");
    const [dialogError, setDialogError] = useState("");

    function submitEntry(e) {
        e.preventDefault()
        let data = {
            date: moment(date).format("YYYY-MM-DD"),
            metrics: metricsRating,
        }
        // createCheckupEntry
        createCheckupEntry(data)
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
        setMetrics(await getMetrics());
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
        return res
    }

    useEffect(() => {
        let getAsync = async () => {
            setMetrics(await getMetrics());
        }
        getAsync();
    }, [])

    useEffect(() => {
        setMetricsRating((prevMetricsRating) => {
            return metrics.reduce((acc, metric) => {
                acc[metric.id] = prevMetricsRating[metric.id] || 0;
                return acc;
            }, {});
        });
    }, [metrics]);

    return (
        <form onSubmit={submitEntry} className="mx-4 mb-4 flex flex-col gap-6 justify-center items-center" >
            <h1>Daily Metrics</h1>
            <div className="w-full md:w-[500px] flex items-center justify-center gap-8 md:gap-16">
                <DatePicker updateValues={setDate} selectedRange="day" />
            </div>
            <Card className="w-full md:w-[500px]">
                <CardHeader>
                    <CardTitle>Health Metrics</CardTitle>
                    <CardDescription>Keep track of your symptoms, medications, treatments, measurements, etc.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    {metrics.map(metric => {
                        return (
                            <div className="flex justify-between items-center w-full">
                                <h4>{metric.name} {metric.id}</h4>
                                <MetricRating
                                    selectedRating={metricsRating[metric.id] || 0}
                                    setSelectedRating={(rating) => {
                                        setMetricsRating((prevmetricsRating) => {
                                            return { ...prevmetricsRating, [metric.id]: rating };
                                        });
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

            <Button type="submit">Save Entry</Button>
        </form>
    )
}
