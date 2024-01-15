'use client'

import { useEffect } from 'react'

export default function GlobalError({ error, reset }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <html>
            <body>
                <div>
                    <h2>Sorry, something went wrong! Click &quot;Try again&quot;, reload the page, or contact support (info@fatiguediary.ch).</h2>
                    <button className="border rounded bg-gray-100 text-black h-10 min-w-16"
                        onClick={
                            // Attempt to recover by trying to re-render the segment
                            () => reset()
                        }
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    )
}