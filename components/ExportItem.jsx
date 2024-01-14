"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Download, Trash } from "lucide-react"

export default function ExportItem({ readableFileName, filePath }) {
    return (
        <li className="flex justify-between">
            <p>{readableFileName}</p>
            <div className="flex gap-3">
                <a href={filePath} download={readableFileName} className="hover:bg-accent hover:text-accent-foreground h-10 w-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"><Download /></a>
                <Button variant="ghost" size="icon"><Trash /></Button>
            </div>
        </li>
    )
}
