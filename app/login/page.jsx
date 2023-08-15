import React from 'react'
import Form from '@/components/Form'
import LabelInput from "@/components/LabelInput"

export default function Login() {
    return (
        <Form title="Login" description="Enter your email and password to continue" info="Don't have an account yet?" link="/signup" linkText="Signup">
            <LabelInput title="Email" placeholder="Email" name="email" type="email" />
            <LabelInput title="Password" placeholder="Password" name="password" type="password" />
        </Form >
    )
}
