"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import MetricsInChartSelector from '@/components/MetricsInChartSelector'
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'

export default function EditCharts() {
    return (
        <div className='flex flex-col items-center gap-4 mt-6 mb-4 mx-4'>
            <Card className="w-full">
                <CardHeader className="pb-4">
                    <Input name="title" type="text" placeholder="Chart Title" defaultValue="Health Metrics" />
                </CardHeader>
                <CardContent>
                    <ul className="flex flex-col gap-2">
                        <MetricsInChartSelector />
                    </ul>
                </CardContent>
            </Card>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Chart</Button>
        </div>
    )
}
