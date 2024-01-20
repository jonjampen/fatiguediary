"use client"
import DatePicker from '@/components/DatePicker'
import RangePicker from '@/components/RangePicker'
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import moment from "moment"
import DayChart from "@/components/charts/DayChart"
import WeekChart from "@/components/charts/WeekChart"
import MonthChart from "@/components/charts/MonthChart"
import YearChart from "@/components/charts/YearChart"
import MetricsChart from "@/components/charts/MetricsChart"
import RatedActivities from '@/components/RatedActivities'

export default function Dashboard({ fetchEntries, getActivities, getAllDailyEntriesInRange }) {
    const [startDate, setStartDate] = useState(moment().startOf('day').format("YYYY-MM-DD HH:mm:ss"))
    const [endDate, setEndDate] = useState(moment().endOf("day").format("YYYY-MM-DD HH:mm:ss"))
    const [selectedDate, setSelectedDate] = useState(moment().startOf("day").toDate())
    const [range, setRange] = useState("day")
    const [entries, setEntries] = useState([])
    const [activities, setActivities] = useState({})
    const [dailyEntries, setDailyEntries] = useState([])
    
    async function updateEntries() {
        setEntries(await fetchEntries(startDate, endDate));
        setActivities(await getActivities(startDate, endDate));
        setDailyEntries(await getAllDailyEntriesInRange(startDate, endDate))
    }

    function updateDate(date) {
        setStartDate(moment(date).startOf(range).format("YYYY-MM-DD HH:mm:ss"))
        setEndDate(moment(date).endOf(range).format("YYYY-MM-DD HH:mm:ss"))
    }

    useEffect(() => {
        updateEntries()
    }, [startDate, endDate])

    useEffect(() => {
        updateDate(selectedDate)
    }, [selectedDate, range])

    return (
        <>
            <div className="w-full flex flex-col items-center justify-between gap-4">
                <DatePicker updateValues={setSelectedDate} selectedRange={range} />
                <RangePicker setRange={setRange} />
            </div>
            <div className="w-full flex flex-col items-center justify-between gap-4 mt-6">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Energy</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {(() => {
                            if (range === "day") {
                                return (<DayChart entries={entries} activities={activities} startDate={startDate} endDate={endDate} range={range} />)
                            }
                            else if (range === "isoWeek") {
                                return (<WeekChart entries={entries} activities={activities} startDate={startDate} endDate={endDate} range={range} />)
                            }
                            else if (range === "month") {
                                return (<MonthChart entries={entries} activities={activities} startDate={startDate} endDate={endDate} range={range} />)
                            }
                            else if (range === "year") {
                                return (<YearChart entries={entries} activities={activities} startDate={startDate} endDate={endDate} range={range} />)
                            }
                        })()}

                    </CardContent>
                </Card>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {(() => {
                            if (range === "day") {
                                return (<DayChart entries={entries} activities={activities} startDate={startDate} endDate={endDate} range={range} />)

                            }
                            else if (range === "isoWeek") {
                                return (<MetricsChart entries={dailyEntries} startDate={startDate} endDate={endDate} range={range} />)
                            }
                            else if (range === "month") {
                                return (<MonthChart entries={entries} activities={activities} startDate={startDate} endDate={endDate} range={range} />)
                            }
                            else if (range === "year") {
                                return (<YearChart entries={entries} activities={activities} startDate={startDate} endDate={endDate} range={range} />)
                            }
                        })()}

                    </CardContent>
                </Card>
                <RatedActivities />

            </div>
        </>
    )
}
