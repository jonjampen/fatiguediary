import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { links } from "@/lib/navbarLinks"
import NavItem from './NavItem'
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

export default function MobileProfileNav({ getInitials }) {
    const { data: session, status } = useSession()

    return (
        <>
            {/* Mobile Profile */}
            < hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700 md:hidden" />
            <li className="md:hidden mb-3">
                <div className="flex gap-3 py-3 items-center">
                    <Avatar>
                        <AvatarFallback className="bg-secondary">{session.user.name ? getInitials(session.user.name) : "?"}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start justify-center">
                        <p>{session.user.name ? session.user.name : "Loading..."}</p>
                        <p className="text-muted-foreground text-xs font-extralight mt-[2px]">{session.user.email ? session.user.email : "Loading..."}</p>
                    </div>
                </div>
                <ul>
                    {links.profile.map((item, id) => {
                        return (
                            <NavItem link={item.link} name={item.name} key={id} />
                        )
                    })}
                    <button className="w-full text-left" onClick={() => signOut({ callbackUrl: process.env.URL + '/login' })} ><a><li className="py-2 px-1 md:py-0 md:px-0 w-full">Sign Out</li></a></button>
                </ul>
            </li>
        </>
    )
}
