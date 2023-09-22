import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RangePicker({ setRange }) {
    return (
        <Tabs defaultValue="day" className="w-[400px] m-w-full flex justify-center">
            <TabsList className="bg-background border w-[280px] flex justify-between">
                <TabsTrigger value="day" onClick={() => setRange("day")}>Day</TabsTrigger>
                <TabsTrigger value="week" onClick={() => setRange("week")}>Week</TabsTrigger>
                <TabsTrigger value="month" onClick={() => setRange("month")}>Month</TabsTrigger>
                <TabsTrigger value="year" onClick={() => setRange("year")}>Year</TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
