"use client"
import React, { useState } from 'react'
import MetricRating from '@/components/ui/metricRating';
import { EyeOff, Eye } from 'lucide-react'
import EditMetricDialog from './EditMetricDialog';
import { Button } from '@/components/ui/button';
import DeleteMetricDialog from './DeleteMetricDialog';

export default function Metric({ metric, setMetrics, isEditing, position, updateMetrics, setEntryEdited }) {
    return (
        <div className="flex justify-between items-center w-full">
            <h4>{metric.name}</h4>
            {isEditing ?
                <div className="flex gap-2">
                    <EditMetricDialog metric={metric} updateMetrics={updateMetrics} />

                    <div className="">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => changeVisibility(metric)}>{metric.hidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}</Button>
                    </div>

                    <DeleteMetricDialog metric={metric} updateMetrics={updateMetrics} />

                </div>
                :
                <MetricRating
                    ratingType={metric.type}
                    selectedRating={metric.rating}
                    setSelectedRating={(rating) => {
                        setMetrics((prevMetrics) => {
                            const updatedMetrics = [...prevMetrics];
                            updatedMetrics[position] = { ...metric, rating: rating };
                            setEntryEdited(true)
                            return updatedMetrics;
                        });
                    }} />
            }
        </div>
    )
}
