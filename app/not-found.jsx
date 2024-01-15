import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function notFound() {
    return (
        <section className="flex justify-center">
            <div className="mx-10 max-w-[750px] text-justify mb-6 flex flex-col items-center">
                <h1>This page could not be found</h1>
                <p>The page you were looking for could not be found. I have recently made some changes to the structure of Fatigue Diary which my be the reason for this error. Please go back to the homepage or select your desired page in the navigation. If this error persists, please contact me (<a href="mailto:info@fatiguediary.ch">info@fatiguediary.ch</a>).</p>
                <br />
                <Link href="/"><Button>Homepage</Button></Link>
            </div>
        </section>
    )
}
