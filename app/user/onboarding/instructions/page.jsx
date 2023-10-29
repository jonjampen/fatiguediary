import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function instructions() {
    return (
        <>
            <h1>Welcome</h1>
            <p>Welcome to Fatigue Diary. To learn how to use Fatigue Diary read the <a href="/instructions">instructions</a>.</p>
            <div className="absolute bottom-10 flex flex-col gap-3">
                <Link href="/instructions" className="w-full"><Button variant="accent" className="w-full">Read Instruction</Button></Link>
                <Link href="/user/dashboard" className="w-full"><Button className="w-full">Get Started</Button></Link>
            </div>
        </>
    )
}
