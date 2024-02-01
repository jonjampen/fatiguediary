"use client"
import React, { useEffect, useState } from 'react'
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddMetricDialog({ updateMetrics, charts }) {
    const [newMetric, setNewMetric] = useState({});
    const [dialogError, setDialogError] = useState("");
    const [allCharts, setAllCharts] = useState(charts);

    async function addMetric() {
        if (!newMetric.name || !newMetric.type) {
            setDialogError("Select name and rating type!")
            return;
        }

        await fetch(process.env.URL + "/api", {
            method: "POST",
            body: JSON.stringify({
                "type": "createMetric",
                "name": newMetric.name,
                "color": newMetric?.color ?? "#43B9F4",
                "metricType": newMetric.type,
                "addToCharts": allCharts,
            }),
            cache: 'no-store',
        })

        setNewMetric({})
        setDialogError("")
        dialogClose();
        setAllCharts(charts)
        updateMetrics();
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setNewMetric((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    function handleTypeChange(newType) {
        setNewMetric((prev) => ({
            ...prev,
            type: newType,
        }))
    }

    return (
        <div className="flex justify-between items-center w-full" >
            <Dialog>
                <DialogTrigger>
                    <p className="text-muted-foreground underline cursor-pointer">+ add new metric</p>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-left">Create new Metric</DialogTitle>
                        {dialogError ? <DialogDescription className="text-left text-destructive">{dialogError}</DialogDescription> : null}
                    </DialogHeader>
                    <div className="flex gap-4 py-4">
                        <div className="flex flex-col items-start gap-4">
                            <Label htmlFor="color">
                                Color
                            </Label>
                            <input type="color" name="color" value={newMetric?.color ?? '#43B9F4'} className="w-10 h-10 rounded-full" onChange={handleInputChange} />
                        </div>
                        <div className="flex flex-col items-start gap-4">
                            <Label htmlFor="metricName">
                                Metric name
                            </Label>
                            <Input name="name" placeholder="Headache" value={newMetric?.name ?? ''} className="col-span-3" onChange={handleInputChange} />
                        </div>
                        <div className="flex flex-col items-start gap-4 w-[40%]">
                            <Label>
                                Rating type
                            </Label>
                            <Select onValueChange={handleTypeChange}>
                                <SelectTrigger className="max-w-full">
                                    <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="scale03">0 - 3</SelectItem>
                                    <SelectItem value="numberInput">Number</SelectItem>
                                </SelectContent>
                            </Select>

                        </div>
                    </div>
                    <Label>Show in charts:</Label>
                    <div className="max-h-24 overflow-y-scroll customScrollBar flex flex-col gap-1">
                        {charts.map((chart, i) => {
                            return (
                                <div className="inline-flex items-center gap-3">
                                    <Input type="checkbox" className="h-4 w-4" checked={allCharts[i]?.checked ?? false} onChange={(e) => setAllCharts(prev => {
                                        let newCharts = [...prev]
                                        newCharts[i].checked = e.target.checked
                                        return newCharts
                                    })} /> {chart.name}
                                </div>
                            )
                        })
                        }
                    </div>

                    <DialogFooter className="flex flex-row justify-between">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={() => addMetric()} type="button">Create Metric</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
