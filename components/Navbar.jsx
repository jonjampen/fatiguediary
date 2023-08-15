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


export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-end mb-6">
      <NavigationMenu className="w-full h-[64px] pl-3 pr-3">
        <NavigationMenuList className="w-full flex gap-7">
          <NavigationMenuItem>
            <Link href="/">Fatigue Diary</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/contact">Contact</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/login">Login</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button>Sign Up</Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}
