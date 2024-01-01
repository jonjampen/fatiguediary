"use client"
import React from 'react'
import { calculateColor } from '@/app/lib/calculateColor';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function BorderStyle({ children, avg }) {
    let color = avg > 0 ? calculateColor(avg) : "hsl(var(--border))";
    return (
        <Card id='container' className="w-full" style={{
            "borderLeft": "2px solid " + color
        }}>
            {children}
        </Card >

    )
}