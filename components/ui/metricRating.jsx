"use client";

import React, { useState } from 'react'
import { Input } from './input';
import { Button } from './button';
import { Minus, Plus } from 'lucide-react';

export default function MetricRating({ ratingType, selectedRating, setSelectedRating }) {
    const [value, setValue] = useState(selectedRating)
    function changeRating(e, val) {
        console.log(val)
        e.preventDefault();
        setSelectedRating(val)
    }

    if (ratingType === "numberInput") {
        return (
            <div className='flex gap-2 w-[152px]'>
                <Button type="button" variant="outline" size="icon" className="h-8 w-8 flex-shrink-0" onClick={(e) => changeRating(e, selectedRating - 1)}><Minus className="w-4 h-4" /></Button>
                <Input type="number" value={selectedRating} onChange={(e) => changeRating(e, e.target.value)} className="h-8 flex-grow" />
                <Button type="button" variant="outline" size="icon" className="h-8 w-8 flex-shrink-0" onClick={(e) => changeRating(e, selectedRating + 1)}><Plus className="w-4 h-4" /></Button>
            </div>

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
