import AppNav from "@/components/AppNav"

export default function Layout({ children }) {
    return (
        <div className="pb-16">
            {children}
            <AppNav />
        </div>
    )
}
