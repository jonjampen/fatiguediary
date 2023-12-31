import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function LoginNavButtons() {
    return (
        <>
            <a href="/login"><li className="py-2 px-1 md:py-0 md:px-0 w-full">Log In</li></a>
            <Link href="/signup"><Button className="mb-4 md:mb-0">Sign Up</Button></Link>
        </>
    )
}
