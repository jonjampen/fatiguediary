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
import TimeSliderSelector from "@/components/ui/timeSliderSelector";
import DatePicker from '@/components/DatePicker';
import SymptomRating from '@/components/ui/symptomRating';
import {Button} from '@/components/ui/button';
import moment from "moment";

export default function DailyCheckupForm({createCheckupEntry}) {
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [sleepQuality, setSleepQuality] = useState(0);
    const [sleepDuration, setSleepDuration] = useState(0);
    const [stress, setStress] = useState(0);
    const [mood, setMood] = useState(0);

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

    return (
        <form onSubmit={submitEntry} className="mx-4 mb-4 flex flex-col gap-6 justify-center items-center" >
            <h1>Daily Checkup</h1>
            <div className="w-full md:w-[500px] flex items-center justify-center gap-8 md:gap-16">
                <DatePicker updateValues={setDate} selectedRange="day" />
            </div>
            <Card className="w-full md:w-[500px]">
                <CardHeader>
                    <CardTitle>Sleep</CardTitle>
                    <CardDescription>How well did you sleep last night?</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <div className="flex justify-between items-center w-full">
                        <h4>Quality:</h4>
                        <SymptomRating ratings={["0", "1", "2", "3"]} selectedRating={sleepQuality} setSelectedRating={setSleepQuality} />
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <h4>Duration: {formatSleepDuration(sleepDuration)}</h4>
                        <TimeSliderSelector onValueChange={setSleepDuration} />
                    </div>
                </CardContent>
            </Card>
            <Card className="w-full md:w-[500px]">
                <CardHeader>
                    <CardTitle>Well-Being</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
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
            {/* <Card className="w-full md:w-[500px]">
                <CardHeader>
                    <CardTitle>Symptoms</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <div className="flex justify-between items-center w-full">
                        <h4>Fatigue:</h4>
                        <SymptomRating selectedRating="0" setSelectedRating={() => e} />
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <h4>Brainfog:</h4>
                        <SymptomRating selectedRating="0" setSelectedRating={() => e} />
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <h4>Headaches:</h4>
                        <SymptomRating selectedRating="0" setSelectedRating={() => e} />
                    </div>
                </CardContent>
            </Card> */}

            <Button type="submit">Save Entry</Button>
        </form>
    )
}
