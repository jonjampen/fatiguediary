"use client"
import React, { useState } from 'react'
import MetricRating from '@/components/ui/metricRating';
import EditMetricDialog from './EditMetricDialog';
import DeleteMetricDialog from './DeleteMetricDialog';
import MetricVisibilitySwitch from './MetricVisibilitySwitch';
import { GripVertical } from 'lucide-react';

export default function Metric({ metric, setMetrics, isEditing, position, updateMetrics, setEntryEdited }) {
    // const [draggable, setDraggable] = useState(false)
    return (
        <div className="flex justify-between items-center w-full">
            <h4>{metric.name}</h4>
            {isEditing ?
                <div className="flex gap-2">
                    <EditMetricDialog metric={metric} updateMetrics={updateMetrics} />

                    <div className="">
                        <MetricVisibilitySwitch metric={metric} updateMetrics={updateMetrics} />
                    </div>

                    <DeleteMetricDialog metric={metric} updateMetrics={updateMetrics} />

                    <div className="draggable-icon flex items-center justify-center cursor-grab">
                        <GripVertical className="w-4 h-4" />
                    </div>
                </div>
                :
                <MetricRating
                    ratingType={metric.type}
                    selectedRating={metric.rating}
                    setSelectedRating={(rating) => {
                        setMetrics((prevMetrics) => {
                            const updatedMetrics = [...prevMetrics];
                            updatedMetrics[position] = { ...metric, rating: rating, changed: true };
                            setEntryEdited(true)
                            return updatedMetrics;
                        });
                    }} />
            }
        </div>
    )
}
