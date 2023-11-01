"use client"
import React from 'react'
import EnergyValue from '@/components/EnergyValue'
import moment from "moment"
import { redirect } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Pencil, Trash2 } from 'lucide-react';
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
import { useRouter } from 'next/navigation'


export default function Entry({ entry, activities, updateEntries }) {
    const { push } = useRouter();
    let index = 0;

    async function deleteEntry() {
        let URL = "http://localhost:3000"
        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            body: JSON.stringify({
                "type": "deleteEntryById",
                "energyid": entry.id,
            }),
        })
        updateEntries();
        dialogClose();
    }

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger className="w-full border-t flex justify-between items-center cursor-pointer py-2 px-2">
                    <div className="flex flex-col justify-start items-start">
                        <p className="text-xs text-gray-500">{moment(entry.datetime).format("HH:mm")}</p>
                        <ul className="flex gap-2">
                            {Object.entries(activities).map(([key, activity]) => {
                                if (activity.energyId === entry.id) {
                                    index++
                                    if (index != 1) {
                                        return (<>
                                            <li className='text-muted-foreground'>
                                                •
                                            </li>
                                            <li className="list-none" key={activity.activityId}>
                                                {activity.activityName}
                                            </li>
                                        </>
                                        );
                                    }
                                    else {
                                        return (<>
                                            <li className="list-none" key={activity.activityId}>
                                                {activity.activityName}
                                            </li>
                                        </>
                                        );
                                    }
                                }
                            })}
                        </ul>

                        <p>{entry.notes}</p>
                    </div>
                    <div className="">
                        <EnergyValue avg={entry.energylevel}>
                            <span>{entry.energylevel}</span>
                        </EnergyValue>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-[-50px]">
                    <DropdownMenuLabel>Edit Entry</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => push(`/user/add/fatigue/${entry.id}`)}><Pencil className="h-3 w-3" />&nbsp;Edit</DropdownMenuItem>
                    <DialogTrigger className="w-full">
                        <DropdownMenuItem className="text-destructive"><Trash2 className="h-3 w-3" />&nbsp;Delete</DropdownMenuItem>
                    </DialogTrigger>
                </DropdownMenuContent>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-left">Are you sure?</DialogTitle>
                        <DialogDescription className="text-left">
                            Do you want to delete the entry from {moment(entry.datetime).format("DD.MM.YYYY HH:mm")}? Deleting this entry cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-row justify-between">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <LoaderButton onButtonClick={deleteEntry}>Delete</LoaderButton>
                    </DialogFooter>
                </DialogContent>
            </DropdownMenu>
        </Dialog>
    )
}
