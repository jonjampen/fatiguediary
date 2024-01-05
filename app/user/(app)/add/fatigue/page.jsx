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

export default function AddFatigue() {
    const [energyLevel, setEnergyLevel] = useState(5);

    return (
        <section className="mx-4 flex flex-col gap-6 justify-center">
            <h1>Add Energy Level</h1>
            {/* Date & Time picker */}
            <Card>
                <CardHeader>
                    <CardTitle>Energy Level</CardTitle>
                    <CardDescription>Choose your current energy level.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Slider defaultValue={[energyLevel]} max={10} step={0.5} onValueChange={(newValue) => setEnergyLevel(newValue)} />
                </CardContent>
                <CardFooter className="flex justify-between text-2xl">
                    <p className="font-semibold">{energyLevel}</p>
                    <p>😂</p>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Activities</CardTitle>
                    <CardDescription>Mark the activities that you have just done.</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Activities */}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Notes</CardTitle>
                    <CardDescription>Add your notes here.</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* input */}
                </CardContent>
            </Card>
            <Button>Add Entry</Button>
        </section>
    )
}
