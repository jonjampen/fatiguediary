"use client"
import React, { useEffect } from 'react'
import { LoaderButton } from "@/components/ui/loaderButton"
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
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import crypto from "crypto"

export default function Form({ title, description, fields, info, link, linkText, token = null }) {
    const searchParams = useSearchParams()
    let currentError = searchParams.get('error')
    const { push } = useRouter();

    // let form = document.getElementById("form");

    let userInput = {
        "name": "",
        "email": "",
        "password": "",
        "passwordConf": "",
        "privacyPolicy": "",
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (title === "Login") {
            await loginUser(userInput.email, userInput.password, false);
        }

        else if (title === "Signup") {
            // Register user
            if (!userInput.privacyPolicy) {
                push("/signup?error=privacyPolicyMissing")
                return;
            }
            if (!userInput.password || !userInput.passwordConf || !userInput.email || !userInput.name) {
                push("/signup?error=missingInformation")
                return;
            }
            // do passwords match
            if (userInput.password != userInput.passwordConf) {
                push("/signup?error=passwordNotMatch")
                return;
            }
            // does user already exist
            let res = await fetch(process.env.URL + "/api", {
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
                push("/signup?error=emailExists")
                return;
            }

            // create user
            res = await fetch(process.env.URL + "/api", {
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

        else if (title === "Request Password Reset") {
            let res = await fetch(process.env.URL + "/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "type": "selectUserByEmail",
                    "email": userInput.email,
                }),
            });

            let userData = await res.json()
            if (userData.data[0]) {
                let newToken = crypto.randomBytes(40).toString('hex');
                let res = await fetch(process.env.URL + "/api", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "type": "setResetToken",
                        "token": newToken,
                        "userid": userData.data[0].id,
                    }),
                });

                let resetLink = "https://fatiguediary.ch/password-reset/" + newToken;

                let formData = new FormData();
                formData.append("emailTo", userData.data[0].email);
                formData.append("emailFrom", "info@fatiguediary.ch");
                formData.append("subject", "Password Reset for Fatigue Diary");
                formData.append("message", "Hi " + userData.data[0].name + "\n\nYou have requested to reset your Password for Fatigue Diray (https://fatiguediary.ch). Click on the link below to reset your password.\n\n" + resetLink + "\n\nIf you haven't requested to reset your password, ignore this email.\n\nBest Regards\nJon Jampen\nDeveloper of Fatigue Diray\nhttps://www.fatiguediary.ch");

                res = await fetch("/sendGeneralEmail.php", {
                    method: "POST",
                    body: formData,
                });

                push("/password-reset/" + "?success")

            }
        } else if (title === "Reset Your Password") {
            if (userInput.password === userInput.passwordConf) {
                let res = await fetch(process.env.URL + "/api", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "type": "updatePassword",
                        "token": token,
                        "password": userInput.password
                    }),
                });
                push("/password-reset/" + token + "?success")
            }
            else {
                push("/password-reset/" + token + "?error=passwordNotMatch")
                return
            }
        }
    }

    async function loginUser(email, password, newUser) {
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
                                    else if (currentError === "privacyPolicyMissing") {
                                        return <>Please agree to our <a href="/privacy-policy">privacy policy</a>.</>
                                    }
                                    else if (currentError === "missingInformation") {
                                        return <>Please provide all the required information.</>
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
                                    <LabelInput key={field.name} title={field.title} placeholder={field.placeholder} name={field.name} type={field.type} change={handleChange} page={title} />
                                )
                            })}
                            {(() => {
                                if (title === "Signup") {
                                    return (
                                        <div className="flex justify-start gap-3">
                                            <Input type={"checkbox"} name={"pp"} className="h-4 w-4" onChange={(e) => handleChange("privacyPolicy", e.target.value)} />
                                            <Label htmlFor={"pp"}>I agree to the <a href="/privacy-policy" target="_blank">privacy policy</a>.</Label>
                                        </div>
                                    )
                                }
                            })()}
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col items-center">
                        <LoaderButton className="w-full" type="submit">{title}</LoaderButton>
                        <CardDescription className="mt-2">{info} <a href={link} className="link">{linkText}</a></CardDescription>
                    </CardFooter>
                </form>
            </Card>
        </div >
    )
}
