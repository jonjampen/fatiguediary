"use client";

import React, { useState } from 'react'
import { Input } from './input';

export default function MetricRating({ ratingType, selectedRating, setSelectedRating }) {
    function changeRating(e, val) {
        e.preventDefault();
        setSelectedRating(val)
    }

    if (ratingType === "numberInput") {
        return (
            <Input type="number" defaultValue={selectedRating} onChange={(e) => changeRating(e, e.target.value)} className="max-w-[152px]" />
        )
    }
    else {
        let ratings = ["0", "1", "2", "3"]
        return (
            <div className='flex gap-2'>
                {
                    ratings.map((rating, pos) => {
                        return <button
                            className={`w-8 h-8 border rounded ${selectedRating == pos ? "bg-primary text-primary-foreground" : "text-foreground"}`}
                            onClick={(e) => changeRating(e, pos)}
                        >{rating}</button>
                    })
                }
            </div>
        )
    }
}
