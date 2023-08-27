import DatePicker from '@/components/DatePicker'
import RangePicker from '@/components/RangePicker'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


export default function Dashboard() {
    return (
        <section className="mx-4">
            <h1>Your Entries</h1>
            <div className="w-full flex flex-col items-center justify-between gap-4">
                <DatePicker />
            </div>
            <div className="w-full flex flex-col items-center justify-between gap-4 mt-6">
                <Card className="w-full">
                    <CardHeader className="">
                        <CardTitle className="flex justify-between items-center ">
                            <p>Sun, 27.08.2023</p>
                            <span>8</span>
                        </CardTitle>
                        {/* <CardDescription>Day Summary (TK)</CardDescription> */}
                    </CardHeader>
                    <CardContent className="">
                        <div className="w-full border-b flex justify-between items-center py-2">
                            <div className="flex flex-col">
                                <p className="text-xs text-gray-500">09:47</p>
                                <p>Reading, Eating</p>
                                <p>Reading 100 pages.</p>
                            </div>
                            <div className="">
                                <span>8</span>
                            </div>
                        </div>
                        <div className="w-full border-b flex justify-between items-center py-2">
                            <div className="flex flex-col">
                                <p className="text-xs text-gray-500">09:47</p>
                                <p>Reading, Eating</p>
                                <p>Reading 100 pages.</p>
                            </div>
                            <div className="">
                                <span>8</span>
                            </div>
                        </div>
                        <div className="w-full border-b flex justify-between items-center py-2">
                            <div className="flex flex-col">
                                <p className="text-xs text-gray-500">09:47</p>
                                <p>Reading, Eating</p>
                                <p>Reading 100 pages.</p>
                            </div>
                            <div className="">
                                <span>8</span>
                            </div>
                        </div>
                        <div className="w-full border-b flex justify-between items-center py-2">
                            <div className="flex flex-col">
                                <p className="text-xs text-gray-500">09:47</p>
                                <p>Reading, Eating</p>
                                <p>Reading 100 pages.</p>
                            </div>
                            <div className="">
                                <span>8</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
