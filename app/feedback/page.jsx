import React from 'react'

export const metadata = {
    title: "Feedback",
    robots: {
        index: false,
        follow: false,
        nocache: false,
        googleBot: {
            index: false,
            follow: false,
        },
    },
}

export default function feedback() {
    return (
        <div className="h-screen mb-6">
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSemOvvjG4FfmklAdXTMtwVAKT44GDvjWcCAfYQyAaTbCxaPcw/viewform?embedded=true" frameborder="0" marginheight="0" marginwidth="0" className="w-full" height="100%">Loading…</iframe>
        </div>
    )
}
