"use client"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Instagram, Mail, Share, Share2, Youtube } from 'lucide-react'
import { motion, stagger, useScroll, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from 'react'

export default function Home() {

  const AnimatedButton = motion(Button)

  const featureOne = useRef(null)
  const featureOneInView = useInView(featureOne)
  let imageOneControl = useAnimation();

  const featureTwo = useRef(null)
  const featureTwoInView = useInView(featureTwo)
  let imageTwoControl = useAnimation();

  const featureThree = useRef(null)
  const featureThreeInView = useInView(featureThree)
  let imageThreeControl = useAnimation();


  async function shareIt() {
    await navigator.share({
      title: "Fatigue Diary a tool to track and manage fatigue",
      text: "Effortlessly monitor, analyze, and improve your energy levels and daily activities with Fatigue Diary.",
      url: "https://www.fatiguediary.ch",
    });
  }

  useEffect(() => {
    const handleInView = async () => {

      if (featureOneInView) {
        await imageOneControl.start({ opacity: 1 });
        await imageTwoControl.start({ opacity: 0 });
        await imageThreeControl.start({ opacity: 0 });
      }
      else if (featureTwoInView) {
        await imageTwoControl.start({ opacity: 1 });
        await imageOneControl.start({ opacity: 0 });
        await imageThreeControl.start({ opacity: 0 });
      }
      else if (featureThreeInView) {
        await imageThreeControl.start({ opacity: 1 });
        await imageOneControl.start({ opacity: 0 });
        await imageTwoControl.start({ opacity: 0 });
      }
    }

    handleInView();
  }, [featureOneInView, featureTwoInView, featureThreeInView])

  return (
    <main className="mx-24 min-h-screen">
      {/* Hero */}
      <section className="flex w-full h-[90vh] justify-between items-center">
        <div className="max-w-2xl" >
          <motion.h1 className="font-bold text-left text-5xl leading-tight"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}>
            Track and Manage Fatigue with&nbsp;
            <span className="text-accent">
              Fatigue Diary
            </span>
          </motion.h1>
          <motion.h4 className="text-2xl"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}>
            Effortlessly monitor, analyze, and improve your energy levels and daily activities with Fatigue Diary.
          </motion.h4>
          <br />
          <AnimatedButton
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}>
            Start now
          </AnimatedButton>
        </div>
        {/* <img src="/preview/app.svg" alt="Screenshot of the Fatigue Diary App" /> */}
        <h2>image</h2>
      </section>

      {/* Features */}
      <section>
        <div className="features flex justify-between items-start">
          <div className="img h-screen w-1/2 sticky top-0">
            <motion.img src="/preview/feature/light/track.svg" className="absolute top-1/2 transform -translate-y-1/2 h-[70vh] max-w-1/2 max-h-[70vh]" alt="" animate={imageOneControl} initial={{ opacity: 1 }} transition={{ duration: 0 }} />
            <motion.img src="/preview/feature/light/analysis.svg" className="absolute top-1/2 transform -translate-y-1/2 max-h-[70vh] max-w-1/2" alt="" animate={imageTwoControl} initial={{ opacity: 0 }} transition={{ duration: 0 }} />
            <motion.img src="/preview/feature/light/automated-analysis.svg" className="absolute top-1/2 transform -translate-y-1/2 max-h-[70vh] max-w-1/2" alt="" animate={imageThreeControl} initial={{ opacity: 0 }} transition={{ duration: 0 }} />
          </div>
          <div className="text h-[300vh] w-1/2" >
            <div className="h-screen flex items-center justify-end">
              <motion.div className="max-w-md" ref={featureOne}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1 }}>
                <h2 className="font-semibold">Energy and Activity Tracking</h2>
                <p>Log energy level and activities after every activity which can help you get started with pacing.</p>
              </motion.div>
            </div>
            <div className="h-screen flex items-center justify-end">
              <motion.div className="max-w-md" ref={featureTwo}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1 }}>
                <h2 className="font-semibold">Gain Deeper Insights into Your Energy Levels</h2>
                <p>Visualize your energy trends through interactive charts to enhance your understanding of fatigue. Identify optimal times of the day and recognize potential patterns.</p>
              </motion.div>
            </div>
            <div className="h-screen flex items-center justify-end">
              <motion.div className="max-w-md" ref={featureThree}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1 }}>
                <h2 className="font-semibold">Automatic Activity Analysis</h2>
                <p>Benefit from automated analysis to identify activities that promote relaxation and recovery, as well as uncover potential sources of energy depletion you may not be aware of.</p>
              </motion.div>
            </div>
          </div>
        </div>



      </section >

      {/* Developer */}
      <section section className="mb-28" >
        <motion.div className="max-w-md"
          initial={{ opacity: 0, scale: 0.75 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}>
          <h2 className="font-semibold">Developed by a fatigue patient</h2>
          <p>Hello, I&apos;m Jon. Like you, I am facing chronic fatigue, and I&apos;ve created this web app to share the strategies that have helped me on my journey. This project started as my matura (high school graduation) project.</p>
          <p>Feel free to contact me if you have any questions!</p>
        </motion.div>
        {/* <img src="" alt="" /> */}
      </section >

      {/* CTA */}
      <section section className="border rounded min-h-[80vh] mb-28 flex items-center justify-between px-10 py-10" >
        <motion.div className="max-w-md flex flex-col gap-8"
          initial={{ opacity: 0, scale: 0.75 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          animate={{ delay: stagger(0.3) }}
        >
          <motion.h2 className="font-bold text-3xl"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}>Use Fatigue Diary for FREE now!</motion.h2>
          <motion.p className="text-xl"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}>Effortlessly monitor, analyze, and improve your energy levels and daily activities with Fatigue Diary.</motion.p>
          <div className="flex gap-4">
            <Button>Start now</Button>
            <Button variant="accent">Instructions</Button>
          </div>
        </motion.div>
        <motion.img src="/preview/circle-screenshot.svg" alt="Screenshot of Fatigue Diary"
          initial={{ opacity: 0, scale: 0.75 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }} />
      </section >

      {/* Footer */}
      <section section className="flex items-start justify-between align-center" >
        <div className="max-w-sm">
          <h3 className="font-bold text-2xl">Fatigue Diary</h3>
          <h4>Effortlessly monitor, analyze, and improve your energy levels and daily activities with Fatigue Diary.</h4>
          <div className="flex gap-4 items-center mt-3">
            <a href="https://instagram.com/fatiguediary.ch" target="_blank"><Instagram /></a>
            {/* <a href="https://youtube.com/" target="_blank"><Youtube /></a> */}
            <a href="mailto:info@fatiguediary.ch" target="_blank"><Mail /></a>
            <button className="w-full text-start md:w-auto md:text-auto hover:text-accent" onClick={shareIt}><Share2 /></button>
          </div>
        </div>
        <div className="flex gap-20">
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
      </section >
      <section className="w-full mt-8 pb-3">
        <p className="text-center">&copy;2023 All rights reserved. Designed and developed by <a href="https://jonjampen.ch" target="_blank" className="text-accent">Jon Jampen</a>.</p>
      </section>
      {/* </div> */}
    </main >
  )
}
