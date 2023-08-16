import React from 'react'
import { Button } from "@/components/ui/button"

export default function LoginNavButtons() {
    return (
        <>
            <a href="/login"><li className="py-2 px-1 md:py-0 md:px-0 w-full">Log In</li></a>
            <Button>Sign Up</Button>

        </>
    )
}
