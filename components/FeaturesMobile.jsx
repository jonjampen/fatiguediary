import React from 'react'
import { motion } from "framer-motion"

export default function FeaturesDesktop() {
    return (

        <section>
            <div className="flex flex-col items-center justify-center min-h-screen gap-6">
                <motion.img src="/preview/feature/light/track.svg" className="lg:h-[50vh] max-w-1/2 max-h-[50vh]" alt="" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} />
                <motion.div className="max-w-md"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1 }}>
                    <h2 className="font-semibold">Energy and Activity Tracking</h2>
                    <p>Log energy level and activities after every activity which can help you get started with pacing.</p>
                </motion.div>
            </div>
            <div className="flex flex-col items-center justify-center min-h-screen gap-6">
                <motion.img src="/preview/feature/light/analysis.svg" className="lg:h-[50vh] max-w-1/2 max-h-[50vh]" alt="" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} />
                <motion.div className="max-w-md"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1 }}>
                    <h2 className="font-semibold">Energy and Activity Tracking</h2>
                    <p>Log energy level and activities after every activity which can help you get started with pacing.</p>
                </motion.div>
            </div>
            <div className="flex flex-col items-center justify-center min-h-screen gap-6">
                <motion.img src="/preview/feature/light/automated-analysis.svg" className="lg:h-[50vh] max-w-1/2 max-h-[50vh]" alt="" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} />

                <motion.div className="max-w-md"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1 }}>
                    <h2 className="font-semibold">Energy and Activity Tracking</h2>
                    <p>Log energy level and activities after every activity which can help you get started with pacing.</p>
                </motion.div>
            </div>
        </section >
    )
}
