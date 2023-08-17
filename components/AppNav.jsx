"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { BarChart4, PlusCircle, ClipboardList } from 'lucide-react'

export default function AppNav() {
    function navigateTo(path) {
        window.location.href = path
    }

    return (
        <div className="w-full flex justify-center fixed bottom-0">

            <nav className="max-w-[400px] w-full h-16 rounded flex items-center justify-between px-8 border">
                <Button variant="ghost" size="icon" className="" onClick={() => navigateTo("/user/dashboard")} >
                    <BarChart4 className="h-8 w-8" />
                </Button>
                <Button variant="ghost" size="icon" className="" onClick={() => navigateTo("/user/add/fatigue")} >
                    <PlusCircle className="h-8 w-8" />
                </Button>
                <Button variant="ghost" size="icon" className="" onClick={() => navigateTo("/user/entries")} >
                    <ClipboardList className="h-8 w-8" />
                </Button>
            </nav>
        </div>
    )
}
