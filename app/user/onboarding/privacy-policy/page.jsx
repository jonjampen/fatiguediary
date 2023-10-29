import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function privacyOnboarding() {
    return (
        <>
            <h1>Privacy Policy</h1>
            <p>We have updated our <a href="/privacy-policy" target="_blank">privacy policy</a>. By using this app you agree to our <a href="/privacy-policy" target="_blank"> privacy policy</a>.</p >
            <Link href="/user/onboarding/instructions" className="absolute bottom-10"><Button>Continue</Button></Link>
        </>
    )
}
