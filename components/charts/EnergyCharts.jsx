import React from 'react'
import DayChart from "@/components/charts/DayChart"
import WeekChart from "@/components/charts/WeekChart"
import MonthChart from "@/components/charts/MonthChart"
import YearChart from "@/components/charts/YearChart"

export default function EnergyCharts({ entries, activities, startDate, endDate, range }) {
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
}
