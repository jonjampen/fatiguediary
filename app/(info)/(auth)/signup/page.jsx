import React from 'react'
import Form from '@/components/Form'

export const metadata = {
    title: "Signup",
}

export default function Signup() {
    let fields = [
        {
            title: "Name",
            placeholder: "Name",
            name: "name",
            type: "text",
        },
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
        {
            title: "Password Confirmation",
            placeholder: "Repeat your password",
            name: "passwordConf",
            type: "password",
        },

    ]
    return (
        <Form title="Signup" description="Enter your information to create an account" fields={fields} info="Already have an account?" link="/login" linkText="Login" />
    )
}
