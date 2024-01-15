"use client"

import React from 'react'
import { calculateColor } from '@/app/lib/calculateColor'

export default function EnergyValue({ children, avg, type = "summary" }) {
    let color = calculateColor(avg);

    return (
        <div style={{
            "color": color
        }}>
            {type === "entry" || avg > 0 ? children : ""}
        </div>
    )
}
