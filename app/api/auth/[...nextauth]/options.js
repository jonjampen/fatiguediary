import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {
                    label: "email",
                    type: "email",
                    placeholder: "your email",
                },
                password: {
                    label: "password",
                    type: "password",
                    placeholder: "your password",
                },
            },
            async authorize(credentials) {
                let user = await loginUser(credentials.email, credentials.password)
                console.log("User (nextauth options): " + JSON.stringify(user))

                if (user) {
                    console.log("Yes, is user! (nextauth options)")
                    return user
                }

                console.log("No, is NOT user! (nextauth options)")
                return null
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            // Send properties to the client, like an access_token and user id from a provider.
            let res = await fetch(process.env.URL + "/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "type": "selectUserByEmail",
                    "email": session.user.email,
                }),
            })
            res = await res.json();

            session.user.id = res.data[0].id

            return session
        }
    },
    pages: {
        signIn: '/login',
        error: '/login',
    }
}

async function loginUser(email, password) {
    let res = await fetch(process.env.URL + "/api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "type": "loginUser",
            "email": email,
            "password": password,
        }),
    })
    res = await res.json();
    if (res && res.data && res.data.length > 0) {
        console.log("User with that email and password exists. (loginUser())")
        console.log("Res Data: " + JSON.stringify(res.data))
        console.log("res.data[0]: " + JSON.stringify(res.data[0]))
        return res.data[0];
    }

    console.log("User with that email and password DOES NOT exists. (loginUser()); res: " + res)
    return null
}