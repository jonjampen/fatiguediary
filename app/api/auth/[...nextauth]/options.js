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
                let user = await getUserByEmail(credentials.email)
                user = user[0][0]
                credentials.password = credentials.password // TODO: add password encryption
                if (credentials.email === user.email && credentials.password === user.password) {
                    delete user.password
                    return user
                }
                else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.user.id = 1

            return session
        }
    }
}

async function getUserByEmail(email) {
    let res = await fetch(process.env.URL + "/api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "type": "selectUserByEmail",
            "email": email,
        }),
    })
    // console.log(await res.json())
    let data = await res.json();
    return Object.values(data);
}