"use client"
import React from 'react'
import { Input } from "@/components/ui/input"

export default function MetricsInChartSelector({ chartId, metric, checked, onChange }) {
    return (
        <li className="list-none flex justify-between items-center">
            {metric.name}
            <Input type="checkbox" className="w-4 h-4" checked={checked} onChange={(e) => onChange(chartId, metric.id, e.target.checked)} />
        </li>
    )
}
