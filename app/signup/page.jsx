import React from 'react'
import Form from '@/components/Form'
import LabelInput from "@/components/LabelInput"

export default function Signup() {
    return (
        <Form title="Signup" description="Enter your information to create an account" info="Already have an account?" link="/login" linkText="Login">
            <LabelInput title="Name" placeholder="Name" name="name" type="text" />
            <LabelInput title="Email" placeholder="Email" name="email" type="email" />
            <LabelInput title="Password" placeholder="Password" name="password" type="password" />
            <LabelInput title="Password Confirmation" placeholder="Repeat your password" name="passwordConf" type="password" />
        </Form >
    )
}
