import AppNav from "@/components/AppNav"

export default function Layout({ children }) {
    return (
        <div className="flex justify-center">

            <div className="mx-10 max-w-screen-sm text-center mb-6 flex flex-col items-center">
                {children}
            </div>
        </div>
    )
}
