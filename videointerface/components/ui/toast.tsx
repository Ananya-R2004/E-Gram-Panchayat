"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  heading?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, heading, description, action, onOpenChange, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "pointer-events-auto relative flex w-full max-w-sm items-center justify-between gap-4 overflow-hidden rounded-md border p-4 pr-10 shadow-lg transition-all",
          variant === "destructive"
            ? "border-red-500 bg-red-500 text-white"
            : "bg-background text-foreground",
          className
        )}
        {...props}
      >
        <div className="grid gap-1">
          {heading && <div className="font-semibold">{heading}</div>}
          {description && <div className="text-sm opacity-80">{description}</div>}
        </div>

        {action}

        <button
          onClick={() => onOpenChange?.(false)}
          className="absolute right-2 top-2 rounded-md p-1 hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }
)
Toast.displayName = "Toast"
