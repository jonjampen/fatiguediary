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

export function SelectLanguage() {
    return (
        <Select>
            <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Language</SelectLabel>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
