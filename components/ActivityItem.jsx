import React from 'react'

export default function ActivityItem({ children, activityId, selectedActivities, setSelectedActivities }) {
    function selectActivity(e) {
        e.target.classList.toggle("bg-primary");

        let selectedActivitiesTemp = selectedActivities;

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
        <li className="border rounded h-11 flex items-center justify-center text-center cursor-pointer select-none" onClick={selectActivity}>{children}</li>
    )
}
