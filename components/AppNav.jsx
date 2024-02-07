"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { BarChart4, PlusCircle, ClipboardList, HeartPulse, Menu } from 'lucide-react'

export default function AppNav() {
    const { push } = useRouter();

    return (
        <div className="w-full flex justify-center fixed bottom-0">
            <nav className="max-w-[400px] w-full h-16 rounded flex items-center justify-between px-8 border bg-background">
                <Button variant="ghost" size="icon" className="" onClick={() => push("/user/dashboard")} >
                    <BarChart4 className="h-8 w-8" />
                </Button>
                <Button variant="ghost" size="icon" className="" onClick={() => push("/user/metrics")} >
                    <HeartPulse className="h-8 w-8" />
                </Button>
                <Button variant="ghost" size="icon" className="" onClick={() => push("/user/add/fatigue")} >
                    <PlusCircle className="h-8 w-8" />
                </Button>
                <Button variant="ghost" size="icon" className="" onClick={() => push("/user/entries")} >
                    <ClipboardList className="h-8 w-8" />
                </Button>
                <Button variant="ghost" size="icon" className="" onClick={() => push("/user/menu")} >
                    <Menu className="h-8 w-8" />
                </Button>
            </nav>
        </div>
    )
}
