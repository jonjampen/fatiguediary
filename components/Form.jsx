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
    const URL = "http://localhost:3000"

    // let form = document.getElementById("form");
    // console.log(form)

    let userInput = {
        "name": "",
        "email": "",
        "password": "",
        "passwordConf": "",
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (title === "Login") {
            await loginUser(userInput.email, userInput.password, false);
        } else if (title === "Signup") {
            // Register user
            // do passwords match
            if (userInput.password != userInput.passwordConf) {
                window.location.href = "/signup?error=passwordNotMatch"
                return;
            }
            // does user already exist
            let res = await fetch(URL + "/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "type": "selectUserByEmail",
                    "email": userInput.email,
                }),
            });

            let userExists = await res.json()
            if (userExists.data[0]) {
                window.location.href = "/signup?error=emailExists"
                return;
            }

            // create user
            res = await fetch(URL + "/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "type": "createNewUser",
                    "name": userInput.name,
                    "email": userInput.email,
                    "password": userInput.password,
                    "passwordConf": userInput.passwordConf,
                }),
            });

            // login user
            await loginUser(userInput.email, userInput.password, true);
        }
    }

    async function loginUser(email, password, newUser) {
        console.log(email, password, newUser)
        await signIn("credentials", {
            email: email,
            password: password,
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
                            <AlertTitle>{title} Failed</AlertTitle>
                            <AlertDescription>
                                {(() => {
                                    if (currentError === "passwordNotMatch") {
                                        return <>Your passwords do not match.</>
                                    }
                                    else if (currentError === "emailExists") {
                                        return <>A user with this email already exists. Try again or <a href="/login">log in</a>.</>
                                    }
                                    else if (currentError === "emailExists") {
                                        return <>Username or password wrong, please try again or  <a href="/signup">create a new account</a>.</>
                                    }
                                    else {
                                        return <>There was an error logging you in. Please try again or contact support.</>
                                    }
                                })()}

                            </AlertDescription>
                        </Alert>) : null}

                </CardHeader>
                <form method="post" onSubmit={handleSubmit} id="form">
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
