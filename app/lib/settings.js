import { cookies } from "next/headers"
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

export async function getSettings() {
    const session = await getServerSession(options)

    if (session) {
        let res = await fetch(process.env.URL + "/api", {
            method: "POST",

            headers: { Cookie: cookies().toString() },

            body: JSON.stringify({
                "type": "getUserSettings",
            }),
        })
        res = await res.json()
        return res.data[0]
    }

    let defaultSettings = {
        "theme": 1,
        "language": "En",
    }
    return defaultSettings
}