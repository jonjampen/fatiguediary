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

export default function Layout({ children }) {
    return (
        <>
            {children}
        </>
    )
}
