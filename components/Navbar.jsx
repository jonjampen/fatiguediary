"use client"
import React from 'react'
import { Button } from '@/components/ui/button'

import { links } from "@/lib/navbarLinks"
import MobileProfileNav from './MobileProfileNav'
import DesktopProfileNav from './DesktopProfileNav'
import LoginNavButtons from './LoginNavButtons'

export default function Navbar() {
  let isLoggedIn = true;

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
    <nav className="w-full flex flex-col items-start md:flex-row md:items-center justify-between mb-6 px-3">

      {/* Top Bar */}
      <div className="w-full md:w-auto flex items-center justify-between h-16">
        <img src="/logo.svg" alt="" className="h-10" />

        <Button variant="outline" size="icon" onClick={toggleMenu} className="md:hidden" >
          <img src="/icons/menu.svg" alt="open menu" className="h-4 w-4" id="menu-icon" />
        </Button>
      </div>

      <ul className="hidden md:flex items-center gap-8 px-3  md:w-auto md:px-0 w-full" id="menu-items">

        {/* Links */}
        {links.main.map((item, id) => {
          return (
            <a href={item.link} key={id}><li className="py-2 px-1 md:py-0 md:px-0 w-full">{item.name}</li></a>
          )
        })}

        {renderProfileNav()}
      </ul>
    </nav>
  )
}