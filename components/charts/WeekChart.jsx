"use client"
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import formatChartData from '@/app/lib/formatChartData';
import dynamic from "next/dynamic";
import { getSettings } from '@/app/lib/settings';
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function WeekChart({ entries, activities, startDate, endDate, range }) {
    let data = formatChartData(entries, activities, range, startDate, endDate)
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
                tickAmount: 7,
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
                theme: settings.theme === 0 ? "dark" : "light",
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
        type: "bar",
    }

    return (
        <Chart options={state.options} series={state.series} type={state.type} height={320} width="100%" />
    )

}