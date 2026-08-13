"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea'
import { Instagram, Mail } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ContactPage() {
    const searchParams = useSearchParams()
    let success = searchParams.get('success');

    return (
        <>
                <Card className="w-full md:w-[400px]">
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul>
                            <li><a href="https://jonjampen.ch" target="_blank">Jon Jampen</a></li>
                            <li><a href="https://instagram.com/fatiguediary.ch" target="_blank">Instagram</a></li>
                            <li><a href="mailto:info@fatiguediary.ch">info@fatiguediary.ch</a></li>
                            <li><a href="https://www.fatiguediary.ch" target="_blank">www.fatiguediary.ch</a></li>
                            <li><a href="/feedback">Feedback Form</a></li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="w-full md:w-[400px]">
                    <CardHeader>
                        <CardTitle>About</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>I&apos;m Jon Jampen and I developed Fatigue Diary as part of my Matura project. Feel free to contact me with any questions or issues! <br /> Follow Fatigue Diary on <a href="https://instagram.com/fatiguediary.ch">Instagram</a> to get the latest news.</p>
                    </CardContent>
                </Card>
        </>
    )
}
