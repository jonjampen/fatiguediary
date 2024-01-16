"use client";

import React, { useState } from 'react'

export default function SymptomRating({ ratings = ["-", "1", "2", "3"] }) {
    const [selectedRating, setSelectedRating] = useState(0)

    return (
        <div className='flex gap-2'>
            {
                ratings.map((rating, pos) => {
                    return <button
                        className={`w-8 h-8 border rounded ${selectedRating == pos ? "bg-primary text-primary-foreground" : "text-foreground"}`}
                        onClick={(e) => {
                            e.preventDefault();
                            setSelectedRating(pos)
                        }}>{rating}</button>
                })
            }
        </div>
    )
}
