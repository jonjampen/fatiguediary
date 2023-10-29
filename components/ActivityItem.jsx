"use client"
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EyeIcon, EyeOff, Pencil, Trash2 } from 'lucide-react';
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
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { LoaderButton } from '@/components/ui/loaderButton'
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

import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input"



export default function ActivityItem({ children, activityId, selectedActivities, setSelectedActivities, style, isEditing, isHidden = false, fetchActivities }) {
    const [activityName, setActivityName] = useState()

    function selectActivity(e) {
        if (!isEditing) {
            let selectedActivitiesTemp = [...selectedActivities];

            if (selectedActivitiesTemp.includes(activityId)) {
                selectedActivitiesTemp.splice(selectedActivitiesTemp.indexOf(activityId), 1)
                setSelectedActivities(selectedActivitiesTemp)
            }
            else {
                selectedActivitiesTemp.push(activityId)
                setSelectedActivities(selectedActivitiesTemp)
            }
        }
    }

    async function hide() {
        let URL = "http://localhost:3000"
        // change hidden state in db
        let res = await fetch(URL + "/api", {
            method: "POST",
            body: JSON.stringify({
                "type": "toggleActivityVisibility",
                "activityId": activityId,
                "state": !isHidden,
            }),
        })
        await fetchActivities();
    }

    async function deleteActivity() {
        let URL = "http://localhost:3000"
        // change hidden state in db
        let res = await fetch(URL + "/api", {
            method: "POST",
            body: JSON.stringify({
                "type": "deleteActivityById",
                "activityId": activityId,
            }),
        })
        await fetchActivities();
    }

    async function updateActivity() {
        let URL = "http://localhost:3000"
        // change hidden state in db
        let res = await fetch(URL + "/api", {
            method: "POST",
            body: JSON.stringify({
                "type": "updateActivityById",
                "activityId": activityId,
                "activityName": activityName,
            }),
        })
        await fetchActivities();
        dialogClose();
    }

    if (!isEditing) {
        return <li className="border rounded min-h-[44px] flex items-center justify-center text-center cursor-pointer select-none px-1" style={style} onClick={selectActivity}>{children}</li>
    }
    else {
        return (
            <Dialog>
                <AlertDialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <li className="border rounded min-h-[44px] flex items-center justify-center text-center cursor-pointer select-none px-1" style={style} onClick={selectActivity}>{children}</li>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mt-[-20px]">
                            <DropdownMenuLabel>Edit {children}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DialogTrigger className="w-full">
                                <DropdownMenuItem><Pencil className="h-3 w-3" />&nbsp;Edit</DropdownMenuItem>
                            </DialogTrigger>

                            <DropdownMenuItem onClick={async () => await hide()}>{isHidden ? <EyeIcon className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}&nbsp;{isHidden ? "unhide" : "hide"}</DropdownMenuItem>

                            <AlertDialogTrigger className="w-full">
                                <DropdownMenuItem className="text-destructive"><Trash2 className="h-3 w-3" />&nbsp;Delete</DropdownMenuItem>
                            </AlertDialogTrigger>
                        </DropdownMenuContent>


                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Do you want to delete the activity "{children}"? Deleting this activity will remove it from all entries that were already created. This action cannot be undone! You can also just hide the activity so it will not be removed from past entries.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={deleteActivity}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>


                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-left">Edit {children}</DialogTitle>
                                <DialogDescription className="text-left">
                                    <Label htmlFor="activityName">
                                        Activity name
                                    </Label>
                                    <Input id="activityName" placeholder="Activity Name..." onChange={(e) => setActivityName(e.target.value)} />
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="flex flex-row justify-between">
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <LoaderButton onClick={updateActivity}>Save Changes</LoaderButton>
                            </DialogFooter>
                        </DialogContent>
                    </DropdownMenu>
                </AlertDialog>
            </Dialog>
        )
    }
}


