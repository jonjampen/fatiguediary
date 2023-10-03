"use client"
import { Button } from "@/components/ui/button"
import { SelectLanguage } from "@/components/SelectLanguage"
import { SelectTheme } from "@/components/SelectTheme"
import { IconInput } from "./ui/iconInput"
import { Moon, Sun } from "lucide-react"
import { LoaderButton } from "./ui/loaderButton"

export function SettingsForm() {
    function changeSettings(data) {

    }

    return (
        <section className="mx-4">
            <form onSubmit={changeSettings} className="w-full space-y-6 flex flex-col items-center">
                <div className="space-y-4 w-full">
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5 mr-1">
                            <h4 className="font-semibold text-lg">Language</h4>
                            <p className="text-muted-foreground text-sm">Choose the language of the user interface.</p>
                        </div>
                        <SelectLanguage />
                    </div>
                </div>
                <div className="space-y-4 w-full">
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5 mr-1">
                            <h4 className="font-semibold text-lg">Theme</h4>
                            <p className="text-muted-foreground text-sm">Choose what theme you want to use (defaults to system preference).</p>
                        </div>
                        <SelectTheme />
                    </div>
                </div>
                <div className="space-y-4 w-full">
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5 mr-1">
                            <h4 className="font-semibold text-lg">Awake Time</h4>
                            <p className="text-muted-foreground text-sm">What is your wake-up and bed time?</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <IconInput type="time" name="time" id="timeInput" icon={<Sun />} />
                            <IconInput type="time" name="time" id="timeInput" icon={<Moon />} />
                        </div>
                    </div>
                </div>
                <LoaderButton type="submit" >Save changes</LoaderButton>
            </form>
        </section>
    )
}
