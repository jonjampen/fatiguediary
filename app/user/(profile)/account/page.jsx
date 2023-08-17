"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})



export default function settings() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })
    function onSubmit(values) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <section>
            <div className="flex h-full justify-center items-start md:items-center">
                <Card className="w-[350px]">
                    <CardHeader className="flex-col items-center">
                        <CardTitle>Your Account</CardTitle>
                        <CardDescription>Change your account information</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="john@doe.com" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Enter your new email address
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="●●●●●●●●●●●●●" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Enter your new password
                                            </FormDescription>
                                            <FormMessage />
                                            {/* <FormLabel>Name</FormLabel> */}
                                            <FormControl>
                                                <Input placeholder="●●●●●●●●●●●●●" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Repeat your new password
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="flex-col items-center">
                        <Button className="w-full">Save Changes</Button>
                        {/* <CardDescription className="mt-2">{info} <a href={link} className="link">{linkText}</a></CardDescription> */}
                    </CardFooter>
                </Card>
            </div >



        </section>
    )
}
