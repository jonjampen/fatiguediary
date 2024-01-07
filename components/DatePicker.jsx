"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronLeft, ChevronRight } from "lucide-react"
import moment from "moment"


export default function DatePicker({ updateValues, selectedRange }) {
    const [date, setDate] = useState(moment().startOf("day").toDate())
    useEffect(() => {
        updateValues(date)
    }, [date])

    return (
        <div className="flex gap-2">
            <Button variant="outline" size="icon" className="" onClick={() => setDate(moment(date).startOf("day").subtract(1, selectedRange).toDate())}>
                <ChevronLeft className="h-4 w-4" />
            </Button>

            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a starting date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>

            <Button variant="outline" size="icon" className="" onClick={() => setDate(moment(date).startOf("day").add(1, selectedRange).toDate())}>
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}
