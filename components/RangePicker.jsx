import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RangePicker() {
    return (
        <Tabs defaultValue="day" className="w-[400px] m-w-full flex justify-center">
            <TabsList className="bg-background border w-[280px] flex justify-between">
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
