"use client"
import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Navbar() {
  const links = {
    main: [
      {
        name: 'Information',
        link: '/',
      },
      {
        name: 'App',
        link: '/user',
      },
      {
        name: 'Instructions',
        link: '/instructions',
      },
      {
        name: 'Contact',
        link: '/contact',
      },
    ],
    profile: [
      {
        name: 'Your Account',
        link: '/account',
      },
      {
        name: 'Settings',
        link: '/settings',
      },
      {
        name: 'Sign Out',
        link: '/logout',
      },
    ],
    new: [
      {
        name: 'Login',
        link: '/login',
      }
    ],
  }

  let menuIcon = document.getElementById("menu-icon");

  function toggleMenu() {
    let menuItems = document.getElementById("menu-items");
    menuItems.classList.toggle("hidden")
  }

  return (
    <nav className="w-full flex flex-col items-start md:flex-row md:items-center justify-between mb-6 px-3">
      <div className="w-full flex items-center justify-between h-16">
        <img src="/logo.svg" alt="" className="h-10" />

        <Button variant="outline" size="icon" onClick={toggleMenu} className="md:hidden" >
          <img src="/icons/menu.svg" alt="open menu" className="h-4 w-4" id="menu-icon" />
        </Button>
      </div>
      <ul className="hidden md:flex items-center gap-5 px-3 md:px-0 w-full" id="menu-items">
        {links.main.map((item, id) => {
          return (
            <li key={id} className="py-2 px-1 md:py-0 md:px-0"><a href={item.link}>{item.name}</a></li>
          )
        })}
        <li className="hidden md:block relative">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
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
                  <DropdownMenuItem key={id}><a href={item.link}>{item.name}</a></DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
        <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
        <li className="md:hidden mb-3">
          <div className="flex gap-3 py-3">
            <Avatar>
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback className="bg-secondary">JJ</AvatarFallback>
            </Avatar>
            <div className="">
              <p>Jon Jampen</p>
              <p className="text-muted-foreground text-xs font-extralight mt-[2px]">info@fatiguediary.ch</p>
            </div>
          </div>
          {links.profile.map((item, id) => {
            return (
              <li key={id} className="py-2 px-1 md:py-0 md:px-0"><a href={item.link}>{item.name}</a></li>
            )
          })}
        </li>
      </ul>
    </nav>
  )
}

/* 
<NavigationMenu className="w-full h-[64px] pl-3 pr-3">
        <NavigationMenuList className="w-full flex gap-7">
          {links.main.map((item, id) => {
            return (
              <NavigationMenuItem key={id}>
                <Link href={item.link}>{item.name}</Link>
              </NavigationMenuItem>
            )
          })}
          <NavigationMenuItem>
            <Button>Sign Up</Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu> */