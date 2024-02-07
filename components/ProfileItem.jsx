"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function ProfileItem({ session }) {
    function getInitials(name) {
        const words = name.split(" ");
        if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
        if (words.length >= 2) return words.slice(0, 2).map((word) => word[0]).join("").toUpperCase();
    }

    return (
        <>
            <div className="flex gap-4">
                <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-secondary">{session.user.name ? getInitials(session.user.name) : "?"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0 justify-center items-start">
                    <p>{session.user.name || ""}({session.user.email || ""})</p>
                    <div className="flex gap-8">
                        <button onClick={() => signOut({ callbackUrl: process.env.URL + '/login' })} className="text-destructive" >Sign Out</button>
                        {/* <Link href="/user/account" className="text-primary">Manage Account</Link> */}
                    </div>
                </div>
            </div>
            <hr />
        </>
    )
}
