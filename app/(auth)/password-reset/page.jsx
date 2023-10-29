import React from 'react'
import Form from '@/components/Form'

export default function Login({ searchParams }) {
    console.log(typeof searchParams.success !== "undefined")
    let fields = [
        {
            title: "Email",
            placeholder: "Email",
            name: "email",
            type: "email",
        },
    ]

    if (typeof searchParams.success == "undefined") {
        return (
            <Form title="Request Password Reset" description="Enter your email and check your inbox." fields={fields} info="You will receive an email with a reset link." link="" linkText="" />
        )
    }
    else {
        return (
            <div className="flex flex-col items-center">
                <h1>Password Reset Request</h1>
                <p>An email has been set to your inbox. Please click on the link in the email to change your password.</p>
            </div>
        )
    }
}
