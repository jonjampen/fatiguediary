import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button';

export default function DeleteMetricDialog({ metric, updateMetrics }) {
    async function deleteMetric(id) {
        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            body: JSON.stringify({
                "type": "deleteMetric",
                "metricId": id,
            }),
            cache: 'no-store',
        })
        updateMetrics();
    }
    let buttonStyle = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 "
    buttonStyle += "border border-input bg-background hover:bg-accent hover:text-accent-foreground "
    buttonStyle += "h-8 w-8 text-destructive"

    return (
        <AlertDialog>
            <AlertDialogTrigger className="w-full">
                <div className={buttonStyle}><Trash2 className="w-4 h-4" /></div>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Do you want to delete the metric &quot;<b className="text-destructive">{metric.name}</b>&quot;? Deleting this metric will remove it from all entries that were already created. This action cannot be undone! You can also just hide the metric so it will not be removed from past entries.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteMetric(metric.id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
