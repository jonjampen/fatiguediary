"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

export default function VersionUpdate({ show, data }) {
    const [isOpen, setIsOpen] = useState(show);
    const [currentInfo, setCurrentInfo] = useState(data[0]);
    const [currentInfoPos, setCurrentInfoPos] = useState(0);

    async function continueInfo() {
        // updated users last used version in db
        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            body: JSON.stringify({
                "type": "updateUsersVersion",
                "version": currentInfo.id,
            }),
            cache: 'no-store',
        })

        if (data[currentInfoPos + 1]) {
            setCurrentInfoPos(prev => prev + 1)
        }
        else {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        setCurrentInfo(data[currentInfoPos])
    }, [currentInfoPos])

    if (isOpen) {
        return (
            <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                <div className="max-h-[80vh] overflow-y-scroll fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full">
                    <img src={currentInfo.image_path} alt="" className='w-full' />
                    <h2 className="flex flex-col space-y-2 text-2xl text-center sm:text-left">{currentInfo.title}</h2>
                    <p dangerouslySetInnerHTML={{ __html: currentInfo.description }} className="max-h-[200px] overflow-y-scroll"></p>
                    <div className="flex flex-col gap-1 mt-2">
                        <Button onClick={continueInfo}>Continue</Button>
                        {/* <Button variant="ghost" className="hover:bg-transparent" onClick={() => closeInfo("dismiss")}>Dismiss</Button> */}
                    </div>
                </div>
            </div >
        )
    }
    return null
}
