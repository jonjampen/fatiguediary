import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
    dialogClose,
} from "@/components/ui/dialog";
import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function EditMetricDialog({ metric, updateMetrics }) {
    const [newMetric, setNewMetric] = useState({});
    const [dialogError, setDialogError] = useState("");

    async function editMetric() {
        if (!newMetric.name) {
            setDialogError("Enter name!")
            return;
        }

        await fetch(process.env.URL + "/api", {
            method: "POST",
            body: JSON.stringify({
                "type": "editMetric",
                "name": newMetric.name,
                "color": newMetric.color,
                "metricId": newMetric.id,
            }),
            cache: 'no-store',
        })

        setNewMetric({})
        setDialogError("")
        dialogClose();
        updateMetrics();
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setNewMetric((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    let buttonStyle = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 "
    buttonStyle += "border border-input bg-background hover:bg-accent hover:text-accent-foreground "
    buttonStyle += "h-8 w-8"

    return (
        <Dialog>
            <DialogTrigger>
                <div className={buttonStyle} onClick={() => setNewMetric(metric)}><Pencil className="w-4 h-4" /></div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-left">Edit Metric: {metric.name}</DialogTitle>
                    {dialogError ? <DialogDescription className="text-left text-destructive">{dialogError}</DialogDescription> : null}
                </DialogHeader>
                <div className="flex gap-4 py-4">
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="color">
                            Color
                        </Label>
                        <input type="color" name="color" defaultValue={metric.color} className="w-10 h-10 rounded-full" onChange={handleInputChange} />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="metricNAme">
                            Metric name
                        </Label>
                        <Input name="name" defaultValue={metric.name} placeholder="Headache" className="col-span-3" onChange={handleInputChange} />
                    </div>
                </div>
                <DialogFooter className="flex flex-row justify-between">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={() => {
                        editMetric()
                    }} type="button">Save Metric</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
