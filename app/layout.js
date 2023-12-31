import './globals.scss'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Provider from './lib/Provider'
import { getSettings } from './lib/settings'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    template: '%s | Fatigue Diary',
    default: 'Fatigue Diary | Track and Manage Fatigue',
  },
  description: 'Effortlessly manage your energy and activities with Fatigue Diary, designed to support those with Long Covid and Chronic Fatigue Syndrome. Track, analyze, and improve your energy levels while gaining insights into your energy levels, identifying patterns, and optimizing your daily life.',
  manifest: "/manifest.json",
  applicationName: 'Fatigue Diary',
  referrer: 'origin',
  keywords: ['Fatigue', 'Fatigue Diary', 'Fatigue tracking', 'Pacing', 'Chronic Fatigue Syndrome', 'Long Covid', 'CFS', 'ME/CFS', "ME", 'Energy management', 'Fatigue management', 'Activity monitoring', 'Energy levels', 'Fatigue insights', 'Energy tracking', 'Activity tracking', 'Energy trends', 'Activity analysis', 'Recovery tracking', 'Energy depletion', 'Health app', 'Wellness management', 'Energy optimization', 'Health insights', 'Energy patterns', 'Chronic illness support', 'Daily activity tracking', 'Energy diary', 'Health and fitness', 'Personal wellness', 'Energy tracking app', 'Health and activity analysis', 'Chronic condition support'],
  creator: 'Jon Jampen',

  openGraph: {
    title: 'Fatigue Diary',
    description: 'Effortlessly manage your energy and activities with Fatigue Diary, designed to support those with Long Covid and Chronic Fatigue Syndrome. Track, analyze, and improve your energy levels while gaining insights into your energy levels, identifying patterns, and optimizing your daily life.',
    url: 'https://fatiguediary.ch',
    siteName: 'Fatigue Diary',
    images: [
      {
        url: 'https://fatiguediary.ch/og.png',
        width: 800,
        height: 600,
        alt: 'Fatigue Diary Preview Image',
      },
      {
        url: 'https://fatiguediary.ch/og-alt.png',
        width: 1800,
        height: 1600,
        alt: 'Fatigue Diary Preview Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  robots: {
    index: false, // TODO: change
    follow: false, // TODO: change
    nocache: false, // TODO: change
    googleBot: {
      index: false, // TODO: change
      follow: false,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Fatigue Diary | Effortlessly manage your energy and activities with Fatigue Diary',
    description: 'Designed to support those with Long Covid and Chronic Fatigue Syndrome. Track, analyze, and improve your energy levels while gaining insights into your energy levels, identifying patterns, and optimizing your daily life.',
    // siteId: '',
    creator: 'Jon Jampen',
    // creatorId: '',
    images: ['https://fatiguediary.ch/og.png'],
  },

  verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
    other: {
      me: ['info@fatiguediary.ch', 'https://fatiguediary.ch', 'https://instagram.com/fatiguediary.ch'],
    },
  },

  alternates: {
    canonical: 'https://fatiguediary.ch',
    // languages: {
    //   'en-US': 'https://fatiguediary.ch/en',
    //   'de-DE': 'https://fatiguediary.ch/de',
    // },
  },
  category: 'health',
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F6FA' },
    { media: '(prefers-color-scheme: dark)', color: '#F5F6FA' },
  ],
}


export default async function RootLayout({ children }) {
  let settings = await getSettings();

  return (
    <html lang="en" className={settings.theme !== 1 && "dark"}>
      <body className={inter.className}>
        <Provider>
          <Navbar />
          <main className="h-[calc(100vh-64px-24px-1px)]"> {/* -nav-margintop-navborder */}
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
