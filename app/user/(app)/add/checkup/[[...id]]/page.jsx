import React from 'react'
import DailyCheckupForm from './form'


export default async function DailyCheckup({ params }) {
    async function createCheckupEntry(data) {
        "use server"
        console.log(data)
    }

    return (
        <section>
            <DailyCheckupForm createCheckupEntry={createCheckupEntry}/>
        </section>
    )
}
