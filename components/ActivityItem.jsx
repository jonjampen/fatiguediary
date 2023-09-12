import React from 'react'

export default function ActivityItem({ children, activityId }) {
    return (
        <li className="border rounded h-11 flex items-center justify-center text-center cursor-pointer">{children}</li>
    )
}
