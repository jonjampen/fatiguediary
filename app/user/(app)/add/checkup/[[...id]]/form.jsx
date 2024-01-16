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

export default function DailyCheckupForm() {
    const [sleepQuality, setSleepQuality] = useState(0);
    const [sleepDuration, setSleepDuration] = useState("0h 0m");
    const [stress, setStress] = useState(0);
    const [mood, setMood] = useState(0);

    return (
        <form className="mx-4 mb-4 flex flex-col gap-6 justify-center items-center" >
            <h1>Daily Checkup</h1>
            <div className="w-full md:w-[500px] flex items-center justify-between gap-8 md:gap-16">
                <DatePicker updateValues={() => "x"} selectedRange="day" />
            </div>
            <Card className="w-full md:w-[500px]">
                <CardHeader>
                    <CardTitle>Sleep</CardTitle>
                    <CardDescription>How well did you sleep last night?</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <div className="flex justify-between items-center w-full">
                        <h4>Quality:</h4>
                        <SymptomRating ratings={["0", "1", "2", "3"]} />
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <h4>Duration: {sleepDuration}</h4>
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
                        <SymptomRating />
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <h4>Mood:</h4>
                        <SymptomRating ratings={["😄", "🙂", "😐", "😞"]} />
                    </div>
                </CardContent>
            </Card>
            <Card className="w-full md:w-[500px]">
                <CardHeader>
                    <CardTitle>Symptoms</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <div className="flex justify-between items-center w-full">
                        <h4>Fatigue:</h4>
                        <SymptomRating />
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <h4>Brainfog:</h4>
                        <SymptomRating />
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <h4>Headaches:</h4>
                        <SymptomRating />
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}
