import moment from "moment"


export default function formatChartData(entries, activities, range, startDate, endDate) {
    let data = [];

    if (range === "day") {
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
    }
    else {
        if (range === "year") {
            let groupedEntries = groupByDay(entries, startDate, endDate)

            for (let month = 0; month <= 11; month++) {
                let average = 0, count = 0, sum = 0;
                Object.entries(groupedEntries).map(([date, entries]) => {
                    if (moment(date).month() === month) {
                        entries.map((entry) => {
                            count++;
                            sum += entry.energylevel
                        })

                    }
                })
                average = count != 0 ? sum / count : null;
                data.push({
                    x: moment((month + 1).toString(), "MM").format("MMMM"),
                    y: average,
                })
            }
            let values = []
            let categories = []
            data.map(x => {
                values.push(x.y)
            })
            data.map(x => {
                categories.push(x.x)
            })
            data = {
                "categories": categories,
                "data": values,
            }
            console.log(data)
        }
        else {
            let groupedEntries = groupByDay(entries, startDate, endDate)

            Object.entries(groupedEntries).map(([date, entries]) => {
                let average = 0, count = 0, sum = 0;
                entries.map((entry) => {
                    count++;
                    sum += entry.energylevel
                })

                average = count != 0 ? sum / count : null;
                data.push({
                    x: date,
                    y: average,
                })
            })
        }
    }


    return data;
}

function groupByDay(ungroupedEntries, startDate, endDate) {
    let groupedEntries = {};
    for (let counter = moment(endDate).subtract(1, "day"); counter.isSameOrAfter(moment(startDate)); counter.subtract(1, "day").clone()) {
        let formattedDate = counter.format("YYYY-MM-DD")
        groupedEntries[formattedDate] = []
    }
    ungroupedEntries.map(entry => {
        let formattedDate = moment(entry.datetime).format("YYYY-MM-DD");
        if (groupedEntries[formattedDate]) {
            // groupedEntries[formattedDate] = []
            groupedEntries[formattedDate].push(entry);
        }
    })

    // reverse sub-array order (Asc day but Desc week)
    Object.entries(groupedEntries).map(([date, dayEntries]) => {
        groupedEntries[date] = dayEntries.reverse()
    })

    return groupedEntries
}