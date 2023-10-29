import { cookies } from "next/headers"

export async function getSettings() {
    let URL = "http://localhost:3000"

    let res = await fetch(URL + "/api", {
        method: "POST",

        headers: { Cookie: cookies().toString() },

        body: JSON.stringify({
            "type": "getUserSettings",
        }),
    })
    res = await res.json()
    return res.data[0]
}