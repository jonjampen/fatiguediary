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
import LabelInput from "@/components/LabelInput"

export default function Form({ title, description, fields, info, link, linkText }) {
    return (
        <div className="flex h-full justify-center items-start md:items-center">
            <Card className="w-[350px]">
                <CardHeader className="flex-col items-center">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            {fields.map(field => {
                                return (
                                    <LabelInput key={fields.name} title={field.title} placeholder={field.placeholder} name={field.name} type={field.type} />
                                )
                            })}
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
