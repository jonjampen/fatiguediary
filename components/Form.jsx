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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useSearchParams } from 'next/navigation'


export default function Form({ title, description, fields, info, link, linkText }) {
    const searchParams = useSearchParams()
    let currentError = searchParams.get('error')

    let userInput = {
        "name": "",
        "email": "",
        "password": "",
        "passwordConf": "",
    }
    async function handleSubmit(e) {
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
                    {currentError ? (
                        <Alert variant="destructive">
                            {/* <Terminal className="h-4 w-4" /> */}
                            <AlertTitle>Login Failed</AlertTitle>
                            <AlertDescription>
                                Username or password wrong, please try again or  <a href="/signup">create a new account</a>.

                            </AlertDescription>
                        </Alert>) : null}

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
