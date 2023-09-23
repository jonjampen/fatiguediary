export default function formatChartData(entries, activities) {
    let data = [];

    Object.entries(entries).map(([key, entry]) => {
        let currentActivities = []
        Object.entries(activities).map(([key, activity]) => {
            if (activity.energyId === entry.id) {
                currentActivities.push(activity.activityName)
            }
        })
        data.push({
            x: entry.datetime,
            y: entry.energylevel,
            z: currentActivities.join(", "),
        })
    })
    return data;
}