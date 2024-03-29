import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function LabelInput({ title, placeholder, type, name, change, page = null }) {
    return (
        <div className="flex flex-col space-y-1.5">
            <Label htmlFor={name}>{title}</Label>
            <Input type={type} placeholder={placeholder} name={name} onChange={(e) => change(name, e.target.value)} />
            {(() => {
                if (title === "Password" && page === "Login") {
                    return (
                        <a href="/password-reset" className="text-xs">Forgot Password?</a>
                    )
                }
            })()}
        </div>
    )
}
