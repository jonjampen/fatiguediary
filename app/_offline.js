import { Button } from '@/components/ui/button'
import React from 'react'

export default function notFound() {
    return (
        <section className="flex justify-center">
            <div className="mx-10 max-w-[750px] text-justify mb-6 flex flex-col items-center">
                <h1>Connect to the internet</h1>
                <p>You are offline. Check your connection.</p>
                <br />
                <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
        </section>
    )
}
