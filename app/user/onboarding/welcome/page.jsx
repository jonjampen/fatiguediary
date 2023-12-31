import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { options } from 'app/api/auth/[...nextauth]/options'
import { getServerSession } from "next-auth/next"

export default async function instructions() {
    const session = await getServerSession(options)

    return (
        <>
            <h1 className="mb-0 pb-0">Welcome {session.user.name}</h1>
            <h3 className="mb-10">to Fatigue Diary!</h3>
            <p>Have a look at this video to learn how to use Fatigue Diary effectively.</p>
            <div className="aspect-video my-2">
                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <p>You can also read the <a href="/instructions" className="underline">written instructions</a>.</p>
            <div className="absolute bottom-10 flex flex-col gap-3">
                <Link href="/user/dashboard" className="w-full"><Button className="w-full">Get Started</Button></Link>
            </div>
        </>
    )
}
