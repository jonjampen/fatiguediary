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

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setNewMetric(metric)}><Pencil className="w-4 h-4" /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-left">Edit Metric: {metric.name}</DialogTitle>
                    {dialogError ? <DialogDescription className="text-left text-destructive">{dialogError}</DialogDescription> : null}
                </DialogHeader>
                <div className="flex gap-4 py-4">
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
