import React from 'react'
import Chart from 'react-apexcharts';
import moment from 'moment';

export default function DayChart({ entries, activities, startDate, endDate }) {
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

    // console.log(activities)

    let state = {
        options: {
            chart: {
                // id: 'apexchart-example',
                height: 250,
                toolbar: {
                    show: true,
                    offsetX: 0,
                    offsetY: 0,
                    tools: {
                        download: true,
                        selection: false,
                        zoom: false,
                        zoomin: false,
                        zoomout: false,
                        pan: false,
                        reset: false,
                        customIcons: [],
                    },
                    export: {
                        csv: {
                            filename: "FatigueDiary-Export",
                            columnDelimiter: ',',
                            headerCategory: 'category',
                            headerValue: 'value',
                            dateFormatter(timestamp) {
                                return new Date(timestamp).toDateString()
                            }
                        },
                        svg: {
                            filename: "FatigueDiary-Export",
                        },
                        png: {
                            filename: "FatigueDiary-Export",
                        }
                    },
                },
            },
            xaxis: {
                type: 'datetime',
                min: moment(startDate).toDate().getTime(),
                max: moment(endDate).toDate().getTime(),
                labels: {
                    datetimeFormatter: {
                        year: 'YYYY',
                        month: 'MMM \'yy',
                        day: 'ddd',
                        hour: 'HH:mm'
                    },
                    style: {
                        colors: 'hsl(var(--muted-foreground))',
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
                        colors: 'hsl(var(--muted-foreground))',
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
                borderColor: 'hsl(var(--border))',
            }
        },
        series: [{
            name: 'Energylevel',
            data: data,
        }],
    }

    return (
        <Chart options={state.options} series={state.series} type="area" height={320} />
    )

}