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
    <nav className="w-full flex items-center justify-between mb-6 h-16 px-3">
      <img src="/logo.svg" alt="" className="h-10" />

      <Button variant="outline" size="icon" onClick={toggleMenu} className="block md:hidden h-4 w-4" >
        <img src="/icons/menu.svg" alt="open menu" id="menu-icon" />
      </Button>
      <ul className="hidden md:flex items-center gap-5" id="menu-items">
        {links.main.map((item, id) => {
          return (
            <li key={id}><a href={item.link}>{item.name}</a></li>
          )
        })}
        <li className="relative">
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