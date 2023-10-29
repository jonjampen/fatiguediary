import React from 'react'
import Form from '@/components/Form'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Login({ params: { token }, searchParams }) {

    let fields = [
        {
            title: "Password",
            placeholder: "Enter a new password",
            name: "password",
            type: "password",
        },
        {
            title: "Password Confirmation",
            placeholder: "Repeat your new password",
            name: "passwordConf",
            type: "password",
        },
    ]
    if (typeof searchParams.success == "undefined") {
        return (

            <Form title="Reset Your Password" description="Enter your new password." fields={fields} info="After setting your new password " link="/login" linkText="log in." token={token} />
        )
    }
    else {
        return (
            <div className="flex flex-col items-center">
                <h1>Password Reset</h1>
                <p>You have successfully reset your password. Please go to <a href="/login">login</a> and log in with your new password.</p>
                <br />
                <Link href="/login"><Button>Login</Button></Link>
            </div>
        )
    }
}