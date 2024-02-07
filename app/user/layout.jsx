import VersionUpdate from '@/components/VersionUpdate'
import { cookies } from 'next/headers'

export const metadata = {
    title: {
        absolute: "Fatigue Diary | App",
    },
    robots: {
        index: false,
        follow: false,
        nocache: false,
        googleBot: {
            index: false,
            follow: false,
        },
    },
}

export default async function Layout({ children }) {

    async function getCurrentVersion(userVers) {
        "use server"

        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            headers: { Cookie: cookies().toString() },
            body: JSON.stringify({
                "type": "getCurrentVersion",
            }),
            cache: 'no-store',
        })
        res = await res.json()
        if (res.data) {
            res = res.data
            let notSeen = res.filter(version => version.id > userVers)
            return notSeen;
        }
        return []
    }

    async function getUserVersion() {
        "use server"

        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            headers: { Cookie: cookies().toString() },
            body: JSON.stringify({
                "type": "getUsersVersion",
            }),
            cache: 'no-store',
        })
        res = await res.json()
        if (res.data) {
            res = res.data
            return res;
        }
        return 0;
    }

    let userVersion = await getUserVersion()
    let newVersions = await getCurrentVersion(userVersion)

    return (
        <main className="h-[calc(100vh-64px-24px-1px)] mt-4 md:mt-10"> {/* -nav-margintop-navborder */}
            {children}
            <VersionUpdate
                data={newVersions}
                show={!!newVersions.length}
            />
        </main>
    )
}
