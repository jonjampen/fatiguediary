import React from 'react'
import Navbar from '@/components/Navbar'
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

export default async function Layout({ children }) {
    const session = await getServerSession(options)

    return (
        <>
            <Navbar session={session} />
            <main className="h-[calc(100vh-64px-24px-1px)]"> {/* -nav-margintop-navborder */}
                {children}
            </main>
        </>
    )
}
