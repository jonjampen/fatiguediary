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

export default function DesktopProfileNav() {
    return (
        <>
            {/* Desktop Profile */}
            <li className="hidden md:block relative">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarFallback className="bg-secondary">JJ</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-2">
                        <DropdownMenuLabel>
                            Jon Jampen
                            <p className="text-muted-foreground text-xs font-extralight mt-[2px]">info@fatiguediary.ch</p>
                        </DropdownMenuLabel>
                        {/* email */}
                        <DropdownMenuSeparator />
                        {links.profile.map((item, id) => {
                            return (
                                <a href={item.link} key={id}><DropdownMenuItem className="cursor-pointer">{item.name}</DropdownMenuItem></a>
                            )
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </li>
        </>
    )
}
