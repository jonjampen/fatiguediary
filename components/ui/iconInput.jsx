import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "./button";

const IconInput = React.forwardRef(({ className, type, icon, ...props }, ref) => {
    return (
        (<div className="relative">
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10",
                    className
                )}
                ref={ref}
                {...props} />
            <div className="absolute left-0 top-0 h-10 w-10 flex items-center justify-center">
                {icon}
            </div>
        </div>)
    );
})
IconInput.displayName = "IconInput"

export { IconInput }
