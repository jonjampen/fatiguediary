"use client"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Instagram, Mail, PlayCircle, Share, Share2, Youtube } from 'lucide-react'
import { motion, stagger, useScroll, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef, useState } from 'react'
import FeatureSection from '@/components/FeatureSection'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Home() {
  const AnimatedButton = motion(Button)
  const AnimatedDialogTrigger = motion(DialogTrigger)
  const [displayVideoPopup, setDisplayVideoPopup] = useState("none")

  async function shareIt() {
    await navigator.share({
      title: "Fatigue Diary a tool to track and manage fatigue",
      text: "Effortlessly monitor, analyze, and improve your energy levels and daily activities with Fatigue Diary.",
      url: "https://www.fatiguediary.ch",
    });
  }


  return (
    <div className="flex flex-col  items-center justify-center relative">
      <div className="mx-6 sm:mx-12 max-w-[1400px] min-h-screen">
        {/* Hero */}
        <section className="flex w-full h-[90vh] flex-col lg:flex-row justify-between items-center mb-8">
          <div className="w-full lg:max-w-[50%] flex flex-col items-center lg:items-start" >
            <motion.h1 className="font-bold text-center lg:text-left text-4xl md:text-5xl leading-tight"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}>
              Track and Manage Fatigue with&nbsp;
              <span className="text-accent">
                Fatigue Diary
              </span>
            </motion.h1>
            <motion.h4 className="text-xl md:text-2xl text-center lg:text-left"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}>
              Effortlessly monitor, analyze, and improve your energy levels and daily activities while preventing crashes.
            </motion.h4>
            <br />
            <div className="flex gap-4">
              <Link href="/signup">
                <AnimatedButton
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  Start now
                </AnimatedButton></Link>

              {/* video popup */}
              <Dialog>
                <AnimatedDialogTrigger
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  variant="outline"
                  className="flex items-center justify-center px-2 gap-2 border rounded-lg hover:bg-secondary">
                  <PlayCircle /> Watch Video
                </AnimatedDialogTrigger>
                <DialogContent className="aspect-video w-screen px-8 md:w-[580px] lg:w-[980px]">
                  <iframe src="https://www.youtube.com/embed/V73Hobz1Sgw?si=iGxJFEZBx7nH8T-T" frameBorder="0" width="100%" height="100%" allow="accelerometer; autoplay; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </DialogContent>
              </Dialog>

            </div>
          </div>
          <motion.img src="/preview/app.gif" alt="Screenshots of the Fatigue Diary App" className="max-h-[70vh] md:max-w-[30%]" initial={{ opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} />
        </section>

        {/* Features */}
        <FeatureSection />

        {/* Developer */}
        <section className="mb-28 w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8" >
          <motion.div className="w-full md:max-w-md"
            initial={{ opacity: 0, scale: 0.75 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}>
            <h2 className="font-semibold">Developed by a fatigue patient</h2>
            <p>Hello, I&apos;m Jon. Like you, I am facing chronic fatigue, and I&apos;ve created this web app to share the strategies that have helped me on my journey. This project started as my matura (high school graduation) project.</p>
            <p>Feel free to contact me if you have any questions!</p>
          </motion.div>
          <motion.img
            src="/preview/programmer.svg"
            alt=""
            className="max-w-[60%] lg:max-w-[30%]"
            initial={{ opacity: 0, scale: 0.75 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          />
        </section >

        {/* CTA */}
        <section className="border rounded  mb-28 flex flex-col lg:flex-row items-center justify-start lg:justify-between px-3 py-3 lg:px-10 lg:py-10 gap-8">
          <div className="max-w-md flex flex-col gap-8">
            <motion.h2 className="font-bold text-3xl"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}>Use Fatigue Diary for FREE now!</motion.h2>
            <motion.p className="text-xl"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}>Effortlessly monitor, analyze, and improve your energy levels and daily activities while preventing crashes.</motion.p>
            <div className="flex gap-4">
              <Link href="/signup">
                <Button>Start now</Button>
              </Link>
              <Link href="/instructions">
                <Button variant="accent">Instructions</Button>
              </Link>
            </div>
          </div>
          <motion.img src="/preview/circle-screenshot.svg" alt="Screenshot of Fatigue Diary"
            initial={{ opacity: 0, scale: 0.75 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }} className="" />
        </section>

        {/* Footer */}
        {/* <hr /> */}
        <section className="flex flex-col lg:flex-row items-start justify-between align-center pt-6 border-t" >
          <div className="max-w-sm mb-16 lg:mb-0">
            <h3 className="font-bold text-2xl">Fatigue Diary</h3>
            <h4>Effortlessly monitor, analyze, and improve your energy levels and daily activities while preventing crashes.</h4>
            <div className="flex gap-4 items-center mt-3">
              <a href="https://instagram.com/fatiguediary.ch" target="_blank"><Instagram /></a>
              <a href="https://youtube.com/@FatigueDiary" target="_blank"><Youtube /></a>
              <a href="mailto:info@fatiguediary.ch" target="_blank"><Mail /></a>
              <button className="w-full text-start md:w-auto md:text-auto hover:text-accent" onClick={shareIt} name="share this app"><Share2 /></button>
            </div>
          </div>
          <div className="flex w-full gap-16 justify-between sm:justify-start lg:justify-end md:width-auto sm:gap-20">
            <div className="">
              <h3 className="font-bold text-2xl">HELP</h3>
              <ul>
                <li><a href="/instructions">Instructions</a></li>
                {/* <li><a href="/videos">Video Guides</a></li> */}
                <li><a href="/contact">Contact</a></li>
                <li><a href="/feedback">Feedback Form</a></li>
              </ul>
            </div>
            <div className="">
              <h3 className="font-bold text-2xl">APP</h3>
              <ul>
                <li><a href="/login">Log In</a></li>
                <li><a href="/signup">Sign Up</a></li>
                <li><a href="/install">Install</a></li>
                <li><button className="w-full text-start md:w-auto md:text-auto hover:text-accent" onClick={shareIt}>Share this app</button></li>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </section>
        <section className="w-full mt-8 pb-3">
          <p className="text-center">&copy;2024 All rights reserved. Designed and developed by <a href="https://jonjampen.ch" target="_blank" className="text-accent">Jon Jampen</a>.</p>
        </section>
      </div>
    </div>
  )
}
