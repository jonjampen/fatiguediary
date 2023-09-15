import React from 'react'
import EnergyValue from '@/components/EnergyValue'
import moment from "moment"

export default function Entry({ entry }) {
    return (
        <div className="w-full border-b flex justify-between items-center py-2">
            <div className="flex flex-col">
                <p className="text-xs text-gray-500">{moment(entry.datetime).format("HH:mm")}</p>
                <p>Activities TK</p>
                <p>{entry.notes}</p>
            </div>
            <div className="">
                <EnergyValue avg={entry.energylevel}>
                    <span>{entry.energylevel}</span>
                </EnergyValue>
            </div>
        </div>
    )
}
