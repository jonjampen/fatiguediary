import React from 'react'
import EnergyValue from '@/components/EnergyValue'
import moment from "moment"

export default function Entry({ entry, activities }) {
    return (
        <div className="w-full border-t flex justify-between items-center py-2">
            <div className="flex flex-col">
                <p className="text-xs text-gray-500">{moment(entry.datetime).format("HH:mm")}</p>
                <ul className="flex gap-2">
                    {Object.entries(activities).map(([key, activity]) => {
                        if (activity.energyId === entry.id) {
                            return (<>
                                <li className='text-muted'>
                                    •
                                </li>
                                <li className="list-none" key={activity.activityId}>
                                    {activity.activityName}
                                </li>
                            </>
                            );
                        }
                    })}
                </ul>

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
