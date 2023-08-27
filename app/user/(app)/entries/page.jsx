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
import Entry from '@/components/Entry'
import BorderStyle from '@/components/BorderStyle'
import EnergyValue from '@/components/EnergyValue'

export default function Dashboard() {
    return (
        <section className="mx-4">
            <h1>Your Entries</h1>
            <div className="w-full flex flex-col items-center justify-between gap-4">
                <DatePicker />
            </div>
            <div className="w-full flex flex-col items-center justify-between gap-4 mt-6">
                <BorderStyle avg={8} className="w-full">
                    <CardHeader className="">
                        <CardTitle className="flex justify-between items-center ">
                            <p>Sun, 27.08.2023</p>
                            <EnergyValue avg={8}>
                                <span>8</span>
                            </EnergyValue>
                        </CardTitle>
                        {/* <CardDescription>Day Summary (TK)</CardDescription> */}
                    </CardHeader>
                    <CardContent className="">
                        <Entry />
                    </CardContent>
                </BorderStyle>
            </div>
        </section>
    )
}
