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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import DatePicker from '@/components/DatePicker';
import { Button } from '@/components/ui/button';
import moment from "moment";
import { Edit, EyeOff, Eye, Pencil, Trash2 } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Metric from '@/components/Metric';

export default function DailyCheckupForm({ createCheckupEntry, createNewMetric, getEntryByDate, editMetricDb, deleteMetricDb, changeVisibilityDb }) {
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [metrics, setMetrics] = useState([]);
    const [dialogError, setDialogError] = useState("");
    const [saveMessage, setSaveMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [entryEdited, setEntryEdited] = useState(false);
    const [newMetric, setNewMetric] = useState({});

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

    function formatSleepDuration(value) {
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        return `${hours}h ${minutes}m`;
    };

    async function addNewMetric() {
        console.log("N: ", newMetric.name, "T", newMetric.type)
        if (!newMetric.name || !newMetric.type) {
            setDialogError("Select name and rating type!")
            console.log(newMetric)
            return;
        }
        let metricCreated = await createNewMetric(newMetric);
        setNewMetric({})
        setDialogError("")
        dialogClose();
        updateMetrics();
    }

    async function editMetric() {
        if (!newMetric.name) {
            setDialogError("Enter name!")
            return;
        }
        let metricCreated = await editMetricDb(newMetric);
        setNewMetric({})
        setDialogError("")
        dialogClose();
        updateMetrics();
    }

    async function deleteMetric(id) {
        let metricCreated = await deleteMetricDb(id);
        updateMetrics();
    }

    async function changeVisibility(updated) {
        console.log(updated.hidden)
        updated.hidden = !updated.hidden;
        let metricCreated = await changeVisibilityDb(updated);
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
                    {metrics.map((metric, pos) => {
                        if (!metric.hidden) {
                            return (
                                <Metric metric={metric} position={pos} setMetrics={setMetrics} isEditing={isEditing} updateMetrics={updateMetrics} setEntryEdited={setEntryEdited} />
                            )
                        }
                    })}

                    {isEditing ?
                        <>
                            <hr />
                            <p className='text-center'>Hidden Metrics</p>
                        </>
                        : null
                    }


                    {
                        metrics.map((metric, pos) => {
                            if (metric.hidden && isEditing) {
                                return (
                                    <div className="flex justify-between items-center w-full">
                                        <h4>{metric.name}</h4>

                                        <div className="flex gap-2">
                                            <Dialog>
                                                <DialogTrigger>
                                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setNewMetric(metric)}><Pencil className="w-4 h-4" /></Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle className="text-left">Edit Metric: {metric.name}</DialogTitle>
                                                        {dialogError ? <DialogDescription className="text-left text-destructive">{dialogError}</DialogDescription> : null}
                                                    </DialogHeader>
                                                    <div className="flex gap-4 py-4">
                                                        <div className="flex flex-col items-start gap-4">
                                                            <Label htmlFor="metricNAme">
                                                                Metric name
                                                            </Label>
                                                            <Input id="metricNAme" defaultValue={metric.name} placeholder="Headache" className="col-span-3" onChange={(e) => setNewMetric((prev) => ({ ...prev, name: e.target.value }))} />
                                                        </div>
                                                    </div>
                                                    <DialogFooter className="flex flex-row justify-between">
                                                        <DialogClose asChild>
                                                            <Button variant="outline">Cancel</Button>
                                                        </DialogClose>
                                                        <Button onClick={() => {
                                                            editMetric()
                                                        }} type="button">Save Metric</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>

                                            <div className="">
                                                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => changeVisibility(metric)}>{metric.hidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}</Button>
                                            </div>

                                            <AlertDialog>
                                                <AlertDialogTrigger className="w-full">
                                                    <Button variant="outline" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="w-4 h-4" /></Button>
                                                </AlertDialogTrigger>

                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Do you want to delete the metric &quot;{metric.name}&quot;? Deleting this metric will remove it from all entries that were already created. This action cannot be undone! You can also just hide the metric so it will not be removed from past entries.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => deleteMetric(metric.id)}>Delete</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>

                                        </div>
                                    </div>
                                )
                            }
                        })
                    }

                    <div div className="flex justify-between items-center w-full" >
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
                                        <Input id="metricName" placeholder="Headache" value={newMetric.name} className="col-span-3" onChange={(e) => setNewMetric((prev) => ({ ...newMetric, name: e.target.value }))} />
                                    </div>
                                    <div className="flex flex-col items-start gap-4 w-[40%]">
                                        <Label>
                                            Rating type
                                        </Label>
                                        <Select onValueChange={(newType) => setNewMetric((prev) => ({ ...newMetric, type: newType }))}>
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
                                    <Button onClick={() => addNewMetric()} type="button">Create Metric</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardContent>
            </Card>
        </div >
    )
}
