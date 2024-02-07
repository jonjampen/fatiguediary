"use client"
import React from 'react'
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function AppMenu({ menuItems }) {

    async function shareIt() {
        await navigator.share({
            title: "Fatigue Diary a tool to track and manage fatigue",
            text: "Effortlessly monitor, analyze, and improve your energy levels and daily activities with Fatigue Diary.",
            url: "https://www.fatiguediary.ch",
        });
    }

    return (
        <div className="flex flex-col w-full items-center gap-8">
            {menuItems.map(menuCard => {
                return (
                    <Card className="w-full md:w-[500px]">
                        <CardContent className="pt-6">
                            <ul className="flex flex-col gap-4">
                                {menuCard.map(menuItem => {
                                    if (menuItem?.component) {
                                        return menuItem.component
                                    }
                                    else {
                                        if (menuItem?.link) {
                                            return (
                                                <li>
                                                    <Link href={menuItem.link} className="flex justify-between items-center cursor-pointer w-full">
                                                        <div className="flex gap-4">
                                                            {menuItem.icon} {menuItem.name}
                                                        </div>
                                                        <ChevronRight />
                                                    </Link>
                                                </li>
                                            )
                                        }
                                        else if (menuItem?.url) {
                                            return (
                                                <li>
                                                    <a href={menuItem.url} target="_blank" className="flex justify-between items-center cursor-pointer w-full">
                                                        <div className="flex gap-4">
                                                            {menuItem.icon} {menuItem.name}
                                                        </div>
                                                        <ChevronRight />
                                                    </a>
                                                </li>
                                            )
                                        }
                                        else if (menuItem?.action) {
                                            return (
                                                <li>
                                                    <button onClick={shareIt} className="flex justify-between items-center cursor-pointer w-full">
                                                        <div className="flex gap-4">
                                                            {menuItem.icon} {menuItem.name}
                                                        </div>
                                                        <ChevronRight />
                                                    </button>
                                                </li>
                                            )
                                        }
                                    }
                                })}
                            </ul>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}
