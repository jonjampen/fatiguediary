"use client";

import React, { useState } from 'react';
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
import TimeSliderSelector from "@/components/ui/timeSliderSelector";
import DatePicker from '@/components/DatePicker';
import SymptomRating from '@/components/ui/symptomRating';
import {Button} from '@/components/ui/button';
import moment from "moment";
import { Calendar, Clock, Edit, Plus } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DailyCheckupForm({createCheckupEntry, createNewSymptom}) {
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [sleepQuality, setSleepQuality] = useState(0);
    const [sleepDuration, setSleepDuration] = useState(0);
    const [stress, setStress] = useState(0);
    const [mood, setMood] = useState(0);
    const [newSymptom, setNewSymptom] = useState("");

    function submitEntry(e) {
        e.preventDefault()
        let data = {
            sleepQuality: sleepQuality,
            sleepDuration: sleepDuration,
            stress: stress,
            mood: mood,
            date: moment(date).format("YYYY-MM-DD"),
        }
        createCheckupEntry
        createCheckupEntry(data)
    }

    function formatSleepDuration(value) {
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        return `${hours}h ${minutes}m`;
      };

      function addSymptom() {
        createNewSymptom(newSymptom);
        dialogClose();
      }

    return (
        <form onSubmit={submitEntry} className="mx-4 mb-4 flex flex-col gap-6 justify-center items-center" >
            <h1>Daily Checkup</h1>
            <div className="w-full md:w-[500px] flex items-center justify-center gap-8 md:gap-16">
                <DatePicker updateValues={setDate} selectedRange="day" />
            </div>
            <Card className="w-full md:w-[500px]">
                <CardHeader>
                    <CardTitle>Well-Being</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                <div className="flex justify-between items-center w-full">
                        <h4>Sleep Quality</h4>
                        <SymptomRating ratings={["0", "1", "2", "3"]} selectedRating={sleepQuality} setSelectedRating={setSleepQuality} />
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <div>
                            <h4>Sleep Duration:</h4>
                            <p>{formatSleepDuration(sleepDuration)}</p>
                        </div>
                        <TimeSliderSelector onValueChange={setSleepDuration} />
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <h4>Stress:</h4>
                        <SymptomRating selectedRating={stress} setSelectedRating={setStress} />
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <h4>Mood:</h4>
                        <SymptomRating ratings={["😄", "🙂", "😐", "😞"]} selectedRating={mood} setSelectedRating={setMood} />
                    </div>
                </CardContent>
            </Card>
            <Card className="w-full md:w-[500px]">
                <CardHeader>
                    <CardTitle>Symptoms</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <div className="flex justify-between items-center w-full">
                        <h4>Fatigue</h4>
                        <SymptomRating selectedRating="0" setSelectedRating={() => e} />
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <h4>Brainfog</h4>
                        <SymptomRating selectedRating="0" setSelectedRating={() => e} />
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <h4>Headaches</h4>
                        <SymptomRating selectedRating="0" setSelectedRating={() => e} />
                    </div>
                    <div className="flex justify-between items-center w-full">
                    <Dialog>
                            <DialogTrigger>
                            <button type="button" className="text-muted-foreground underline cursor-pointer">+ Add new symptom</button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="text-left">Create new Symptom</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="flex flex-col items-start gap-4">
                                        <Label htmlFor="activityName">
                                            Symptom name
                                        </Label>
                                        <Input id="activityName" placeholder="Headache" className="col-span-3" onChange={(e) => setNewSymptom(e.target.value)} />
                                    </div>
                                </div>
                                <DialogFooter className="flex flex-row justify-between">
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button onClick={addSymptom} type="button">Create Symptom</Button>
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
