"use client"
import React, { useEffect, useRef } from 'react'
import { motion, stagger, useScroll, useAnimation, useInView } from "framer-motion"

export default function FeaturesDesktop() {
    const featureOne = useRef(null)
    const featureOneInView = useInView(featureOne)
    let imageOneControl = useAnimation();

    const featureTwo = useRef(null)
    const featureTwoInView = useInView(featureTwo)
    let imageTwoControl = useAnimation();

    const featureThree = useRef(null)
    const featureThreeInView = useInView(featureThree)
    let imageThreeControl = useAnimation();

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
    )
}
