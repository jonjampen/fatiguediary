"use client";

import React, { useState } from 'react'

export default function MetricRating({ ratings = ["-", "1", "2", "3"], selectedRating, setSelectedRating }) {
    function changeRating(e, pos) {
        e.preventDefault();
        setSelectedRating(pos)
    }

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
