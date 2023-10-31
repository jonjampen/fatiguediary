"use client"
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { links } from "@/lib/navbarLinks"
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react';

export default function DesktopProfileNav({ getInitials }) {
    const { data: session, status } = useSession()

    return (
        <>
            {/* Desktop Profile */}
            <li className="hidden md:block relative">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarFallback className="bg-secondary">{session.user.name ? getInitials(session.user.name) : "?"}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-2">
                        <DropdownMenuLabel>
                            {session.user.name ?? "Loading..."}
                            <p className="text-muted-foreground text-xs font-extralight mt-[2px]">{session.user.email ?? "Loading..."}</p>
                        </DropdownMenuLabel>
                        {/* email */}
                        <DropdownMenuSeparator />
                        {links.profile.map((item, id) => {
                            return (
                                <a href={item.link} key={id}><DropdownMenuItem className="cursor-pointer">{item.name}</DropdownMenuItem></a>
                            )
                        })}
                        <button className="w-full" onClick={() => signOut({ callbackUrl: 'http://localhost:3000/login' })} ><DropdownMenuItem className="cursor-pointer">Sign Out</DropdownMenuItem></button>
                    </DropdownMenuContent>
                </DropdownMenu>
            </li >
        </>
    )
}
