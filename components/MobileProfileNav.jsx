import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { links } from "@/lib/navbarLinks"
import NavItem from './NavItem'

export default function MobileProfileNav() {
    return (
        <>
            {/* Mobile Profile */}
            < hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700 md:hidden" />
            <li className="md:hidden mb-3">
                <div className="flex gap-3 py-3 items-center">
                    <Avatar>
                        <AvatarFallback className="bg-secondary">JJ</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start justify-center">
                        <p>Jon Jampen</p>
                        <p className="text-muted-foreground text-xs font-extralight mt-[2px]">info@fatiguediary.ch</p>
                    </div>
                </div>
                <ul>
                    {links.profile.map((item, id) => {
                        return (
                            <NavItem link={item.link} name={item.name} key={id} />
                        )
                    })}
                    <button className="w-full text-left" onClick={() => signOut({ callbackUrl: 'http://localhost:3000/login' })} ><a><li className="py-2 px-1 md:py-0 md:px-0 w-full">Sign Out</li></a></button>
                </ul>
            </li>
        </>
    )
}
