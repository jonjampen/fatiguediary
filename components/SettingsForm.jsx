"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { SelectLanguage } from "@/components/SelectLanguage"
import { SelectTheme } from "@/components/SelectTheme"
import { IconInput } from "./ui/iconInput"
import { Clock, Moon, Sun } from "lucide-react"

const FormSchema = z.object({
    marketing_emails: z.boolean().default(false).optional(),
    security_emails: z.boolean(),
})

export function SettingsForm() {
    const { toast } = useToast()

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            security_emails: true,
        },
    })

    function onSubmit(data) {
        toast({
            title: "Settings saved successfully",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <section className="mx-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <div>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="language"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5 mr-1">
                                            <FormLabel className="text-base">
                                                Language
                                            </FormLabel>
                                            <FormDescription>
                                                Choose the language of the user interface.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <SelectLanguage />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="theme"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Theme
                                            </FormLabel>
                                            <FormDescription>
                                                Choose what theme you want to use (defaults to system preference).
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <SelectTheme />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="awake-time"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Awake Time
                                            </FormLabel>
                                            <FormDescription>
                                                What is your wake-up and bed time?
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <div className="flex flex-col gap-2">
                                                <IconInput type="time" name="time" id="timeInput" icon={<Sun />} />
                                                <IconInput type="time" name="time" id="timeInput" icon={<Moon />} />
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <Button>Save Changes</Button>
                </form>
            </Form>
        </section>
    )
}
