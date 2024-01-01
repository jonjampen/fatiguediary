"use client"

import React from 'react'
import { calculateColor } from '@/app/lib/calculateColor'

export default function EnergyValue({ children, avg }) {
    let color = avg > 0 ? calculateColor(avg) : "transparent";

    return (
        <div style={{
            "color": color
        }}>
            {children}
        </div>
    )
}
