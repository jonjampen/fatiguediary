"use client"
import { Button } from "@/components/ui/button"
import { SelectLanguage } from "@/components/SelectLanguage"
import { SelectTheme } from "@/components/SelectTheme"
import { IconInput } from "./ui/iconInput"
import { Moon, Sun } from "lucide-react"
import { LoaderButton } from "./ui/loaderButton"
import { useEffect, useState } from "react"
import moment from "moment"

export function SettingsForm() {
    const [awakeTime, setAwakeTime] = useState()
    const [bedTime, setBedTime] = useState()
    const [theme, setTheme] = useState()
    const [language, setLanguage] = useState()

    async function getValues() {
        // get activities
        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            body: JSON.stringify({
                "type": "getUserSettings",
            }),
        })
        res = await res.json()
        return res.data[0]
    }

    async function changeSettings(e) {
        e.preventDefault()

        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            body: JSON.stringify({
                "type": "setUserSettings",
                "theme": theme === "Dark" ? 0 : 1,
                "awakeTime": awakeTime,
                "bedTime": bedTime,
                "language": language === "German" ? "De" : "En",
            }),
        })

        window.location.href = "/user/dashboard";
    }

    useEffect(() => {
        async function fetchData() {
            let data = await getValues()
            setAwakeTime(data.wake_up_time)
            setBedTime(data.bed_time)
            setTheme(data.theme === 0 ? "Dark" : "Light")
            setLanguage(data.language === "De" ? "German" : "English")
        }
        fetchData();
    }, [])

    return (
        <section className="mx-4">
            <form onSubmit={changeSettings} className="w-full space-y-6 flex flex-col items-center">
                <div className="space-y-4 w-full">
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5 mr-1">
                            <h4 className="font-semibold text-lg">Language</h4>
                            <p className="text-muted-foreground text-sm">Choose the language of the user interface. <span className="text-destructive">Currently only English supported.</span></p>
                        </div>
                        <SelectLanguage setValue={setLanguage} value={language} />
                    </div>
                </div>
                <div className="space-y-4 w-full">
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5 mr-1">
                            <h4 className="font-semibold text-lg">Theme</h4>
                            <p className="text-muted-foreground text-sm">Choose what theme you want to use (defaults to system preference).</p>
                        </div>
                        <SelectTheme setValue={setTheme} value={theme} />
                    </div>
                </div>
                <div className="space-y-4 w-full">
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5 mr-1">
                            <h4 className="font-semibold text-lg">Awake Time</h4>
                            <p className="text-muted-foreground text-sm">What is your wake-up and bed time?</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <IconInput type="time" name="time" id="timeInput" icon={<Sun />} onValueChange={setAwakeTime} value={awakeTime} />
                            <IconInput type="time" name="time" id="timeInput" icon={<Moon />} onValueChange={setBedTime} value={bedTime} />
                        </div>
                    </div>
                </div>
                <LoaderButton type="submit" >Save changes</LoaderButton>
            </form>
        </section>
    )
}
