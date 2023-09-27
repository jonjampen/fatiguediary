"use client"

import React, { useEffect, useState } from 'react'
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
import { calculateColor } from '@/app/lib/calculateColor'
import { calculateEmoji } from '@/app/lib/calculateEmoji'
import { LoaderButton } from './ui/loaderButton'
import { useRouter } from 'next/navigation'

export default function AddForm({ startActivities, fetchActivities, id }) {
    const [energyLevel, setEnergyLevel] = useState([5]);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [activities, setActivities] = useState(startActivities);
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [time, setTime] = useState(moment().format("HH:mm"));
    let URL = "http://localhost:3000"
    let res;
    const { push } = useRouter();

    async function getEnergy() {
        let energy = await fetch(URL + "/api", {
            method: "POST",
            body: JSON.stringify({
                "type": "getEntryById",
                "energyid": id,
            }),
        })
        energy = await energy.json()
        energy = energy.data[0]

        let energyActivities = await fetch(URL + "/api", {
            method: "POST",
            body: JSON.stringify({
                "type": "getActivitiesByEnergyId",
                "energyid": id,
            }),
        })
        energyActivities = await energyActivities.json()
        energyActivities = energyActivities.data
        let formattedActivities = []
        energyActivities.map(energyActivity => {
            formattedActivities.push(energyActivity.activity_id)
        })

        setEnergyLevel(energy.energylevel)
        setDate(moment(energy.datetime).format("YYYY-MM-DD"))
        setTime(moment(energy.datetime).format("HH:mm"))
        document.getElementById("notes").value = energy.notes
        setSelectedActivities(formattedActivities)
    }

    async function addEnergy(e) {
        e.preventDefault();
        let datetime = date + " " + time
        res = await fetch(URL + "/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "type": id ? "updateEnergylevel" : "addEnergylevel",
                "energylevel": energyLevel[0],
                "notes": e.target.notes.value,
                "activities": selectedActivities,
                "datetime": datetime,
                "energyid": id ?? "",
            }),
        });
        push('/user/dashboard');
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

    let emoji = calculateEmoji(energyLevel);

    useEffect(() => {
        if (id) getEnergy()
    }, [])

    return (
        <form onSubmit={addEnergy} className="mx-4 mb-4 flex flex-col gap-6 justify-center items-center" >
            <h1>{id ? "Edit" : "Add"} Energy Level</h1>
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
                    <input type="range" value={energyLevel} max={10} step={0.5} onChange={(e) => setEnergyLevel(e.target.value)} className="w-full" />
                </CardContent>
                <CardFooter className="flex justify-between text-2xl">
                    <p className="font-semibold" style={{ 'color': calculateColor(energyLevel) }}>{energyLevel}</p>
                    <p>{emoji}</p>
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
                            return <ActivityItem key={activity.id} activityId={activity.id} selectedActivities={selectedActivities} setSelectedActivities={setSelectedActivities} style={{ 'word-break': 'break-all;', "backgroundColor": (selectedActivities.includes(activity.id)) ? "hsl(var(--primary))" : "transparent" }}>{activity.name}</ActivityItem>
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
                                    <LoaderButton onClick={createActivity}>Create Activity</LoaderButton>
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
            <LoaderButton type="submit">
                Save Entry
            </LoaderButton>
        </form>
    )
}
