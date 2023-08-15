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

export default function Form({ title, description, info, link, linkText, children }) {
    return (
        <div className="flex h-full justify-center items-center">
            <Card className="w-[350px]">
                <CardHeader className="flex-col items-center">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            {children}
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col items-center">
                    <Button className="w-full">{title}</Button>
                    <CardDescription className="mt-2">{info} <a href={link}>{linkText}</a></CardDescription>
                </CardFooter>
            </Card>
        </div >
    )
}
