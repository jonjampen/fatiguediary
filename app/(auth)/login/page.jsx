import React from 'react'
import Form from '@/components/Form'

export default function Login() {
    let fields = [
        {
            title: "Email",
            placeholder: "Email",
            name: "email",
            type: "email",
        },
        {
            title: "Password",
            placeholder: "Password",
            name: "password",
            type: "password",
        },

    ]
    return (
        <Form title="Login" description="Enter your email and password to continue" fields={fields} info="Don't have an account yet?" link="/signup" linkText="Signup" />
    )
}
