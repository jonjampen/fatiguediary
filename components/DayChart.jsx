import React from 'react'
import Chart from 'react-apexcharts'

export default function DayChart({ entries, activities }) {
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

    console.log(activities)

    let state = {
        options: {
            chart: {
                id: 'apexchart-example',
                height: 250,
            },
            xaxis: {
                type: 'datetime',
                // min: new Date("{$startDate} {$wakeUpTime}").getTime(),
                // max: new Date("{$endDate} {$bedTime}").getTime(),
                labels: {
                    datetimeFormatter: {
                        year: 'YYYY',
                        month: 'MMM \'yy',
                        day: 'ddd',
                        hour: 'HH:mm'
                    },
                    style: {
                        colors: '#7D8082',
                    },
                    datetimeUTC: false, // Do not convert to UTC
                },
            },
            yaxis: {
                labels: {
                    formatter: function (val) {
                        return val.toFixed(0);
                    },
                    style: {
                        colors: '#7D8082',
                    },

                },
                tickAmount: 5, // only 6 labels
                min: 0,
                max: 10
            },
            noData: {
                text: "No data yet...",
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
            },
            colors: ['hsl(var(--accent))'],
            tooltip: {
                x: {
                    show: true,
                    format: 'dd/MM/yy HH:mm',
                },
                y: {
                    formatter: function (val) {
                        return val.toFixed(1)
                    },
                },
                z: {
                    title: "Activities:",
                }
            },
            grid: {
                borderColor: '#7D8082',
            }
        },
        series: [{
            name: 'Energylevel',
            data: data,
        }],
    }

    var options = {
        chart: {
            id: 'apexchart-example'
        },
        noData: {
            text: "No data yet.",
        },
        series: [{
            name: "Energylevel",
        }],
        chart: {
            height: 250,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        colors: ['#F55B53'],
        xaxis: {
            type: 'datetime',
            min: new Date("{$startDate} {$wakeUpTime}").getTime(),
            max: new Date("{$endDate} {$bedTime}").getTime(),
            labels: {
                datetimeFormatter: {
                    year: 'YYYY',
                    month: 'MMM \'yy',
                    day: 'ddd',
                    hour: 'HH:mm'
                },
                style: {
                    colors: '#7D8082',
                },
                datetimeUTC: false, // Do not convert to UTC
            },
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return val.toFixed(0);
                },
                style: {
                    colors: '#7D8082',
                },

            },
            tickAmount: 5, // only 6 labels
            min: 0,
            max: 10
        },
        tooltip: {
            x: {
                show: true,
                format: 'dd/MM/yy HH:mm'
            },
            y: {
                formatter: function (val) {
                    return val.toFixed(1)
                },
            },
            z: {
                title: "{$text['activities']}:",
            }
        },
        grid: {
            borderColor: '#7D8082',
        }

    };

    return (
        <Chart options={state.options} series={state.series} type="area" width={500} height={320} />
    )

}