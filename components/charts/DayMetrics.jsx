import React from 'react'

export default function DayMetrics({ metrics }) {
    return (
        <div className="pt-4">
            {metrics.map(metric => {
                return (
                    <div className="flex items-center justify-between px-6 pb-6">
                        <h4>{metric.name}</h4>
                        {metric.type === "scale03" ?
                            <div className="bg-border w-[120px] h-2 rounded-full">
                                <div className="bg-primary h-2 rounded-full max-w-full"
                                    style={{ width: 120 / 3 * metric.rating }}>
                                </div>
                            </div>
                            :
                            <p>{metric.rating}</p>
                        }
                    </div>
                )
            })}
        </div>
    )
}
