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

    return (
        <AlertDialog>
            <AlertDialogTrigger className="w-full">
                <Button variant="outline" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="w-4 h-4" /></Button>
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
