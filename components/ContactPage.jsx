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
            <Card className="w-full md:w-[700px]">
                <CardHeader className="text-center">
                    <CardTitle>Contact Form</CardTitle>
                    <CardDescription className="flex gap-2 w-full justify-center">
                        <Button variant="ghost" size="icon" onClick={() => window.open("https://instagram.com/fatiguediary.ch", "_blank")}>
                            <Instagram className="h-6 w-6" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => window.open("mailto:info@fatiguediary.ch", "_blank")}>
                            <Mail className="h-6 w-6" />
                        </Button>

                    </CardDescription>
                    {success != null ? (
                        <Alert variant={success == "true" ? "" : "destructive"}>
                            <AlertTitle>{success === "true" ? "Message Sent!" : "Error occurred"}</AlertTitle>
                            <AlertDescription>
                                {(() => {
                                    if (success === "true") {
                                        return <p>Your message was sent successfully, you&apos;ll receive a confirmation email shortly and I&apos;ll get back to you as soon as possible.</p>
                                    }
                                    else {
                                        return <p>An error occurred while sending the email. Please contact me directly at info@fatiguediary.ch.</p>
                                    }
                                })()}

                            </AlertDescription>
                        </Alert>) : null}
                </CardHeader>
                <form className="w-full" action="https://email.fatiguediary.ch/sendEmail.php" method="POST">
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-3">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="John Doe" name="name" />
                            </div>
                            <div className="flex flex-col space-y-3">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="john@doe.com" name="email" />
                            </div>
                            <div className="flex flex-col space-y-3">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" placeholder="Your message" name="message" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button type="submit" className="w-full">Send Message</Button>
                    </CardFooter>
                </form>
            </Card >

            <div className="flex flex-col gap-8 h-full justify-start">

                <Card className="w-full md:w-[400px]">
                    <CardHeader>
                        <CardTitle>About</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>I&apos;m Jon Jampen and I developed Fatigue Diary as part of my Matura project. Feel free to contact me with any questions or issues! <br /> Follow Fatigue Diary on <a href="https://instagram.com/fatiguediary.ch">Instagram</a> to get the latest news.</p>
                    </CardContent>
                </Card>
                <Card className="w-full md:w-[400px]">
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul>
                            <li><a href="https://jonjampen.ch" target="_blank">Jon Jampen</a></li>
                            <li><a href="mailto:info@fatiguediary.ch">info@fatiguediary.ch</a></li>
                            <li><a href="https://www.fatiguediary.ch" target="_blank">www.fatiguediary.ch</a></li>
                            <li><a href="/feedback">Feedback Form</a></li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
