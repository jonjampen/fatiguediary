"use client"
import React from 'react'
import { Button } from '@/components/ui/button'

import { links } from "@/lib/navbarLinks"
import MobileProfileNav from './MobileProfileNav'
import DesktopProfileNav from './DesktopProfileNav'
import LoginNavButtons from './LoginNavButtons'
import NavItem from './NavItem'
import { Menu } from 'lucide-react'
import { useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession()
  let isLoggedIn = !!session;

  async function shareIt() {
    await navigator.share({
      title: "Fatigue Diary",
      text: "A Web app that helps you with your fatigue.",
      url: "https://www.fatiguediary.ch",
    });
  }

  function renderProfileNav() {
    if (isLoggedIn) {
      return (
        <>
          <DesktopProfileNav />
          <MobileProfileNav />
        </>
      )
    }

    return (
      <LoginNavButtons />
    )
  }

  function toggleMenu() {
    let menuItems = document.getElementById("menu-items");
    menuItems.classList.toggle("hidden")
  }

  return (
    <nav className="w-full flex flex-col items-start md:flex-row md:items-center justify-between mb-6 px-3  border-b">

      {/* Top Bar */}
      <div className="w-full md:w-auto flex items-center justify-between h-16">
        <img src="/logo.svg" alt="" className="h-10" />

        <Button variant="outline" size="icon" onClick={toggleMenu} className="md:hidden" >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <ul className="hidden md:flex items-center gap-8 px-3  md:w-auto md:px-0 w-full" id="menu-items">

        {/* Links */}
        {links.main.map((item, id) => {
          if (!item.loginRequired || isLoggedIn) {
            return (
              <NavItem link={item.link} name={item.name} key={id} />
            )
          }
        })}
        {isLoggedIn ?
          <button className="w-full text-start md:w-auto md:text-auto hover:text-accent" onClick={shareIt} key={99}><li className="py-2 px-1 md:py-0 md:px-0 w-full">Share this app</li></button>
          : ""
        }
        {renderProfileNav()}
      </ul>
    </nav>
  )
}