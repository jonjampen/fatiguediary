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

export default function DeleteChartDialog({ chart, updateCharts, className }) {
    async function deleteChart(id) {
        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            body: JSON.stringify({
                "type": "deleteChart",
                "chart_id": id,
            }),
            cache: 'no-store',
        })
        updateCharts();
    }
    let buttonStyle = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 "
    buttonStyle += "border border-input bg-background hover:bg-accent hover:text-accent-foreground "
    buttonStyle += "h-8 w-8 text-destructive"

    return (
        <AlertDialog>
            <AlertDialogTrigger className={className}>
                <div className={buttonStyle}><Trash2 className="w-4 h-4" /></div>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Do you want to delete the chart &quot;<b className="text-destructive">{chart.chart_name}</b>&quot;? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteChart(chart.chart_id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
