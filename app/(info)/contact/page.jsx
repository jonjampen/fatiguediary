import React from 'react'
import ContactPage from '@/components/ContactPage'

export const metadata = {
    title: "Contact",
}

export default function Contact() {
    return (
        <section className="mx-6 flex flex-col items-center mb-4">
            <h1>Contact</h1>
            <div className="flex flex-col md:flex-row justify-center items-start w-full gap-8">
                <ContactPage />
            </div>

        </section>
    )
}
