import React from 'react'
import BackNavigation from '@/components/BackNavigation'

export default function Layout({ children }) {

    return (
        <>
            <BackNavigation />
            {children}
        </>
    )
}
