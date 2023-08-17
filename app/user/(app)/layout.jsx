import AppNav from "@/components/AppNav"

export default function Layout({ children }) {
    return (
        <>
            {children}
            <AppNav />
        </>
    )
}
