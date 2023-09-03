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
import LabelInput from "@/components/LabelInput"
import { signIn } from "next-auth/react"
// import { providers, signIn, getSession, csrfToken } from "next-auth/client";

export default function Form({ title, description, fields, info, link, linkText }) {
    let userInput = {
        "name": "",
        "email": "",
        "password": "",
        "passwordConf": "",
    }
    async function handleSubmit(e) {
        console.log(userInput.email, userInput.password)
        e.preventDefault();
        let response = await signIn("credentials", {
            email: userInput.email,
            password: userInput.password,
            callbackUrl: "/user/dashboard"
        })
    }

    function handleChange(position, value) {
        userInput[position] = value
    }

    return (
        <div className="flex h-full justify-center items-start md:items-center">
            <Card className="w-[350px]">
                <CardHeader className="flex-col items-center">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <form method="post" onSubmit={handleSubmit}>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            {fields.map(field => {
                                return (
                                    <LabelInput key={fields.name} title={field.title} placeholder={field.placeholder} name={field.name} type={field.type} change={handleChange} />
                                )
                            })}
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col items-center">
                        <Button className="w-full" type="submit">{title}</Button>
                        <CardDescription className="mt-2">{info} <a href={link} className="link">{linkText}</a></CardDescription>
                    </CardFooter>
                </form>
            </Card>
        </div >
    )
}
