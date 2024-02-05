import React from 'react'
import { Button } from '@/components/ui/button';
import { EyeOff, Eye } from 'lucide-react'

export default function MetricVisibilitySwitch({ metric, updateMetrics }) {
    async function changeVisibility({ id, hidden }) {
        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            body: JSON.stringify({
                "type": "changeMetricVisibility",
                "visibility": !metric.hidden,
                "metricId": metric.id,
            }),
            cache: 'no-store',
        })

        updateMetrics();
    }

    return (
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={changeVisibility}>{metric.hidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}</Button>
    )
}
