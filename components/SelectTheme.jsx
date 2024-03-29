import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SelectTheme({ setValue, value }) {
    return (
        <Select onValueChange={value => setValue(value)} value={value}>
            <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Theme</SelectLabel>
                    <SelectItem value="Light">Light</SelectItem>
                    <SelectItem value="Dark">Dark</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
