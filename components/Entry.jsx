import React from 'react'
import EnergyValue from '@/components/EnergyValue'

export default function Entry() {
    return (
        <div className="w-full border-b flex justify-between items-center py-2">
            <div className="flex flex-col">
                <p className="text-xs text-gray-500">09:47</p>
                <p>Reading, Eating</p>
                <p>Reading 100 pages.</p>
            </div>
            <div className="">
                <EnergyValue avg={8}>
                    <span>8</span>
                </EnergyValue>
            </div>
        </div>
    )
}
