"use client"
import React, { useEffect, useState } from 'react'
import FeaturesDesktop from '@/components/FeaturesDesktop'
import FeaturesMobile from '@/components/FeaturesMobile'

export default function FeatureSection() {
    const [isMobile, setIsMobile] = useState();
    const handleResize = () => setIsMobile(window.innerWidth < 1024);

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    return isMobile ? <FeaturesMobile /> : <FeaturesDesktop />
}
