"use client"

import * as React from "react"
import type { ToastProps } from "@/components/ui/toast"

interface ToastData extends ToastProps {
  id: string
}

interface ToastContextType {
  toasts: ToastData[]
  toast: (props: Omit<ToastData, "id">) => void
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastData[]>([])

  const toast = (props: Omit<ToastData, "id">) => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, ...props }])
  }

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used inside a <ToastProvider />")
  }
  return context
}
