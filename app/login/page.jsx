import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"


export default function Login() {
    return (
        <main className="h-[100vh] flex justify-center items-center">
            <Card className="w-[350px]">
                <CardHeader className="flex-col items-center">
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Enter your email and password to continue</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Email</Label>
                                <Input type="email" placeholder="Email" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="framework">Password</Label>
                                <Input type="password" placeholder="Password" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col items-center">
                    <Button className="w-full">Login</Button>
                    <CardDescription className="mt-2">Don't have an account yet? <a href="/signup">Signup now</a></CardDescription>
                </CardFooter>
            </Card>
        </main>
    )
}
