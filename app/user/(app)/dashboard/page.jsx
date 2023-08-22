import DatePicker from '@/components/DatePicker'
import RangePicker from '@/components/RangePicker'
import React from 'react'

export default function Dashboard() {
    return (
        <div className="w-full flex flex-col items-center justify-between gap-4">
            <DatePicker />
            <RangePicker />
        </div>
    )
}
