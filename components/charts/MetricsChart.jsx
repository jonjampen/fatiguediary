"use client"
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import dynamic from "next/dynamic";
import { getSettings } from '@/app/lib/settings';
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function MonthChart({ entries, startDate, endDate, range }) {
    const [settings, setSettings] = useState({ "theme": 1, })

    useEffect(() => {
        const getData = async () => {
            setSettings(await getSettings());
        }
        getData()
    }, [])

    let state = {
        options: {
            chart: {
                id: "chartIdXy",
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
            xaxis:
                range === "year" ?
                    {
                        type: 'category',
                    }
                    :
                    {
                        type: 'datetime',
                        min: moment(startDate).toDate().getTime(),
                        max: moment(endDate).toDate().getTime(),
                        tickAmount: 7,
                        labels: {
                            datetimeFormatter: {
                                year: 'YYYY',
                                month: 'MMM \'yy',
                                day: 'dd',
                                hour: ''
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
            },
            noData: {
                text: "No data yet...",
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
                width: range === "month" ? 2 : 3
            },
            colors: entries.map(entry => entry.color),
            tooltip: {
                hideEmptySeries: false,
                theme: settings.theme === 0 ? "dark" : "light",
                x: {
                    show: true,
                    format: 'dd/MM/yy',
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
        series: entries,
        type: "line",
    }

    console.log(entries.map(entry => entry.color))

    return (
        <Chart options={state.options} series={state.series} type={state.type} height={280} width="100%" />
    )

}