"use client"

import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Slider } from "@/components/ui/slider"
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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import ActivityItem from '@/components/ActivityItem'
import { Calendar, Clock, Plus } from 'lucide-react'
import { IconInput } from './ui/iconInput'
import moment from 'moment';

export default function AddForm({ startActivities, fetchActivities }) {
    const [energyLevel, setEnergyLevel] = useState([5]);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [activities, setActivities] = useState(startActivities);
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [time, setTime] = useState(moment().format("hh:mm"));
    let URL = "http://localhost:3000"
    let res;

    async function addEnergy(e) {
        e.preventDefault();
        let datetime = date + " " + time
        res = await fetch(URL + "/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "type": "addEnergylevel",
                "energylevel": energyLevel[0],
                "notes": e.target.notes.value,
                "activities": selectedActivities,
                "datetime": datetime,
            }),
        });
    }
    async function createActivity() {
        let activityName = document.getElementById("activityName").value
        res = await fetch(URL + "/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "type": "createActivity",
                "name": activityName,
            }),
        });
        setActivities(await fetchActivities());
        dialogClose();
    }

    return (
        <form onSubmit={addEnergy} className="mx-4 mb-4 flex flex-col gap-6 justify-center items-center" >
            <h1>Add Energy Level</h1>
            <div className="w-full md:w-[500px] flex items-center justify-between gap-8 md:gap-16">
                <IconInput type="date" name="date" id="dateInput" icon={<Calendar />} value={date} onValueChange={setDate} />
                <IconInput type="time" name="time" id="timeInput" icon={<Clock />} value={time} onValueChange={setTime} />
            </div>
            <Card className="w-full md:w-[500px]">
                {selectedActivities.map(activity => {
                    return activity.id
                })}
                <CardHeader>
                    <CardTitle>Energy Level</CardTitle>
                    <CardDescription>Choose your current energy level.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Slider defaultValue={energyLevel} max={10} step={0.5} onValueChange={(newValue) => setEnergyLevel(newValue)} />
                </CardContent>
                <CardFooter className="flex justify-between text-2xl">
                    <p className="font-semibold">{energyLevel}</p>
                    <p>😂</p>
                </CardFooter>
            </Card>
            <Card className="w-full md:w-[500px]">
                <CardHeader>
                    <CardTitle>Activities</CardTitle>
                    <CardDescription>Mark the activities that you have just done.</CardDescription>
                </CardHeader>
                <CardContent className="w-full">
                    <ul className="activities w-full">
                        {activities.map(activity => {
                            return <ActivityItem key={activity.id} activityId={activity.id} selectedActivities={selectedActivities} setSelectedActivities={setSelectedActivities}><p className="break-words" style={{ 'word-break': 'break-all;' }}>{activity.name}</p></ActivityItem>
                        })}

                        <Dialog>
                            <DialogTrigger>
                                <li className="border rounded h-11 flex items-center justify-center text-center cursor-pointer"><Plus /></li>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="text-left">Create new Activity</DialogTitle>
                                    <DialogDescription className="text-left">
                                        Once created, activities cannot be deleted. However, they can be hidden or edited from the settings.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="flex flex-col items-start gap-4">
                                        <Label htmlFor="activityName">
                                            Activity name
                                        </Label>
                                        <Input id="activityName" placeholder="Reading" className="col-span-3" />
                                    </div>
                                </div>
                                <DialogFooter className="flex flex-row justify-between">
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button onClick={createActivity}>Create Activity</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </ul>
                </CardContent>
            </Card>
            <Card className="w-full md:w-[500px]">
                <CardHeader>
                    <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea placeholder="Notes..." id="notes" />
                </CardContent>
            </Card>
            <Button type="submit">Add Entry</Button>
        </form>
    )
}
