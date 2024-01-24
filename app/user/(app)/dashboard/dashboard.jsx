"use client"
import DatePicker from '@/components/DatePicker'
import RangePicker from '@/components/RangePicker'
import React, { use, useEffect, useState } from 'react'
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
import MetricsChart from "@/components/charts/MetricsChart"
import RatedActivities from '@/components/RatedActivities'
import EnergyCharts from '@/components/charts/EnergyCharts'
import DayMetrics from '@/components/charts/DayMetrics'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard({ fetchEntries, getActivities, getAllDailyEntriesInRange, getMetricEntryByDate }) {
    const [startDate, setStartDate] = useState(moment().startOf('day').format("YYYY-MM-DD HH:mm:ss"))
    const [endDate, setEndDate] = useState(moment().endOf("day").format("YYYY-MM-DD HH:mm:ss"))
    const [selectedDate, setSelectedDate] = useState(moment().startOf("day").toDate())
    const [range, setRange] = useState("day")
    const [entries, setEntries] = useState([])
    const [activities, setActivities] = useState({})
    const [dailyEntries, setDailyEntries] = useState([])
    const [metricEntries, setMetricEntries] = useState([])

    async function updateEntries() {
        setEntries(await fetchEntries(startDate, endDate));
        setActivities(await getActivities(startDate, endDate));
        setDailyEntries(await getAllDailyEntriesInRange(startDate, endDate))
        setMetricEntries(await getMetricEntryByDate(moment(startDate).format("YYYY-MM-DD")))
    }

    function updateDate(date) {
        setStartDate(moment(date).startOf(range).format("YYYY-MM-DD HH:mm:ss"))
        setEndDate(moment(date).endOf(range).format("YYYY-MM-DD HH:mm:ss"))
    }

    function monthlyAvg(entries) {
        if (entries.length > 0) {

            console.log("old:", entries)
            let newA = entries.map(metric => {
                let monthlyAverages = {};
                console.log(metric)
                metric.data.forEach(entry => {
                    let data = entry[1]
                    let timestamp = entry[0]

                    const date = moment(timestamp);
                    const monthName = date.format('MMMM');

                    if (!monthlyAverages[monthName]) {
                        monthlyAverages[monthName] = {
                            total: 0,
                            count: 0,
                            average: 0,
                        };
                    }
                    monthlyAverages[monthName].total += data;
                    monthlyAverages[monthName].count += 1;
                })
                let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                const result = months.map(month => {
                    let data = monthlyAverages[month] || false;
                    let average = 0;

                    if (data) {
                        let count = data.count;
                        let total = data.total;

                        average = count > 0 ? total / count : 0;
                    }

                    return { x: month, y: average };
                });

                return { name: metric.name, data: result }
            })
            console.log("new:", newA)
            return newA;
        }
        return [];
    }

    useEffect(() => {
        updateEntries()
    }, [startDate, endDate])

    useEffect(() => {
        const updateMetrics = async () => {
            setMetricEntries(await getMetricEntryByDate(moment(startDate).format("YYYY-MM-DD")))
        }
        updateMetrics()
        updateDate(selectedDate)
    }, [selectedDate, range])

    return (
        <>
            <div className="w-full flex flex-col items-center justify-between gap-4">
                <DatePicker updateValues={setSelectedDate} selectedRange={range} />
                <RangePicker setRange={setRange} />
            </div>
            <div className="w-full flex flex-col items-center justify-between gap-4 mt-6 mb-4">
                <Card className="w-full min-h-[300px]">
                    <CardHeader className="pb-2">
                        <CardTitle>Energy</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 lg:px-6 pb-0">
                        <EnergyCharts entries={entries} activities={activities} startDate={startDate} endDate={endDate} range={range} />
                    </CardContent>
                </Card>
                <Card className={`w-full ${range === 'day' ? "min-h-0" : "min-h-[300px]"}`}>
                    <CardHeader className="pb-2">
                        <CardTitle>Health Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 lg:px-6 pb-0">
                        {(() => {
                            if (range === "day") {
                                return (<DayMetrics metrics={metricEntries} /> || <p>Loading...</p>)

                            }
                            else {
                                return (<MetricsChart entries={range === "year" ? monthlyAvg(dailyEntries) : dailyEntries} startDate={startDate} endDate={endDate} range={range} />)
                            }
                        })()}

                    </CardContent>
                </Card>
                <RatedActivities />
                <Link href={"/user/dashboard/edit"}><Button><Pencil className="mr-2 h-4 w-4" />Edit Dashboard</Button></Link>
            </div>
        </>
    )
}
