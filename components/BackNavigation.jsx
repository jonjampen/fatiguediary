"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function BackNavigation() {
    const router = useRouter()

    return (
        <div className='h-10 flex items-center justify-start mx-4'>
            <button type="button" className="flex gap-2" onClick={() => router.back()}>
                <ArrowLeft />Back
            </button>
        </div>
    )
}
