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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function AddFatigue() {
    const [energyLevel, setEnergyLevel] = useState([5]);

    async function addEnergy(e) {
        e.preventDefault();
        let URL = "http://localhost:3000"
        let res = await fetch(URL + "/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "type": "addEnergylevel",
                "energylevel": energyLevel[0],
                "notes": e.target.notes.value,
            }),
        });
    }

    return (
        <section>
            <form onSubmit={addEnergy} className="mx-4 mb-4 flex flex-col gap-6 justify-center items-center" >
                <h1>Add Energy Level</h1>
                {/* Date & Time picker */}
                <Card className="w-full md:w-[500px]">
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
                    <CardContent className="sm:max-w-[425px]">
                        {/* Activities */}
                        <Dialog>
                            <DialogTrigger>+</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="text-left">Create new Activity</DialogTitle>
                                    <DialogDescription className="text-left">
                                        Once created, activities cannot be deleted. However, they can be hidden by going to the settings.
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
                                    <Button variant="outline">Cancel</Button>
                                    <Button type="submit">Create Activity</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
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
        </section>
    )
}
