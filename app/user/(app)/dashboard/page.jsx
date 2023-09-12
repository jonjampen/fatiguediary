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
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';


export default async function Dashboard() {
    const session = await getServerSession(options)
    console.log(session)

    return (
        <section className="mx-4">
            <div className="w-full flex flex-col justify-start text-left mb-4">
                <h5 className="text-gray-600">Hi, {session.user.name}</h5>
                <h1 className="text-left text-2xl">Your Dashboard</h1>
            </div>
            <div className="w-full flex flex-col items-center justify-between gap-4">
                <DatePicker />
                <RangePicker />
            </div>
            <div className="w-full flex flex-col items-center justify-between gap-4 mt-6">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Energy</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Chart</p>
                    </CardContent>
                </Card>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Energy boosting activities</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Chart</p>
                    </CardContent>
                </Card>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Energy draining activities</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Chart</p>
                    </CardContent>
                </Card>

            </div>
        </section>
    )
}
