import React from 'react'
import { FileDown, HelpCircle, Instagram, Mail, MessageSquarePlus, Settings, Share2, Smartphone, Youtube } from 'lucide-react'
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import ProfileItem from '@/components/ProfileItem';
import AppMenu from '@/components/AppMenu';

export default async function menu() {
    const session = await getServerSession(options)
    const menuItems = [
        [
            {
                name: "Account",
                component: <ProfileItem session={session} />
            },
            {
                name: "Settings",
                icon: <Settings />,
                link: "settings",
            },
            {
                name: "Export",
                icon: <FileDown />,
                link: "settings",
            },
        ],
        [
            {
                name: "Features",
                icon: <Smartphone />,
                link: "/",
            },
            {
                name: "Instructions",
                icon: <HelpCircle />,
                link: "/instructions",
            },
            {
                name: "Contact",
                icon: <Mail />,
                link: "/contact",
            },
            {
                name: "Send Feedback",
                icon: <MessageSquarePlus />,
                link: "/feedback",
            },
        ],
        [
            {
                name: "Share App",
                icon: <Share2 />,
                action: "share",
            },
            {
                name: "Instagram",
                icon: <Instagram />,
                url: "http://www.instagram.com/fatiguediary.ch",
            },
            {
                name: "YouTube",
                icon: <Youtube />,
                url: "http://www.youtube.com/@fatiguediary",
            },
        ],
    ]
    return (
        <div className="mx-4 flex flex-col items-center">
            <h1>Menu</h1>
            <AppMenu menuItems={menuItems} />
        </div>
    )
}
