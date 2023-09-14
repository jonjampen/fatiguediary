import React from 'react'

export default function ActivityItem({ children, activityId, selectedActivities, setSelectedActivities, style }) {
    function selectActivity(e) {
        e.target.classList.toggle("bg-primary");

        let selectedActivitiesTemp = [...selectedActivities];

        if (selectedActivitiesTemp.includes(activityId)) {
            selectedActivitiesTemp.splice(selectedActivitiesTemp.indexOf(activityId), 1)
            setSelectedActivities(selectedActivitiesTemp)
        }
        else {
            selectedActivitiesTemp.push(activityId)
            setSelectedActivities(selectedActivitiesTemp)
        }
    }

    return (
        <li className="border rounded min-h-[44px] flex items-center justify-center text-center cursor-pointer select-none px-1" style={style} onClick={selectActivity}>{children}</li>
    )
}
