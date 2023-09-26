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
import { useRouter } from 'next/navigation'

export default function Entry({ entry, activities }) {
    const { push } = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="w-full border-t flex justify-between items-center cursor-pointer py-2 px-2">
                <div className="flex flex-col justify-start items-start">
                    <p className="text-xs text-gray-500">{moment(entry.datetime).format("HH:mm")}</p>
                    <ul className="flex gap-2">
                        {Object.entries(activities).map(([key, activity]) => {
                            if (activity.energyId === entry.id) {
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
            <DropdownMenuContent>
                <DropdownMenuLabel>Edit Entry</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => push(`/user/add/fatigue/${entry.id}`)}><Pencil className="h-3 w-3" />&nbsp;Edit</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive"><Trash2 className="h-3 w-3" />&nbsp;Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
