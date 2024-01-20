"use client"
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import formatChartData from '@/app/lib/formatChartData';
import dynamic from "next/dynamic";
import { getSettings } from '@/app/lib/settings';
import ApexCharts from 'apexcharts';
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function MonthChart({ metrics, startDate, endDate, range, getAllDailyEntriesInRange }) {
    const [series, setSeries] = useState([])

    useEffect(() => {
        const getData = async () => {
            let data = await getAllDailyEntriesInRange(startDate, endDate);
            setSeries(data)
        }
        getData()
    }, [startDate, endDate])

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
            xaxis: {
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
                curve: 'straight',
            },
            // colors: ['hsl(var(--accent))'],
            tooltip: {
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
        series: series,
        type: "line",
    }


    return (
        <>
            <Chart options={state.options} series={state.series} type={state.type} height={320} width="100%" />
            <div className="flex gap-2">
                {metrics.map(metric => {
                    // console.log(metric);
                    return (
                        <div key={metric.id} className="bg-primary h-10 rounded border px-4 py-2 inline whitespace-nowrap cursor-pointer"
                            onClick={() => {
                                ApexCharts.getChartByID("chartIdXy").toggleSeries(metric.name)
                            }}>{metric.name}</div>
                    )
                })}
            </div>
        </>
    )

}