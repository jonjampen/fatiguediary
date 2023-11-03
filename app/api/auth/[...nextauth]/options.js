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
                // user = user[0][0]
                // credentials.password = credentials.password // TODO: add password encryption
                // if (credentials.email === user.email && credentials.password === user.password) {
                //     delete user.password
                //     return user
                // }
                // else {
                //     return null
                // }
                if (user) {
                    return user
                }
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
    if (res.data) {
        return res.data[0];
    }
    return null
}