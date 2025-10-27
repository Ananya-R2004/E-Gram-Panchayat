"use client"

import { useToast } from "@/components/ui/use-toast"
import { Toast } from "@/components/ui/toast"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(({ id, ...props }) => (
        <Toast key={id} {...props} onOpenChange={() => dismiss(id)} />
      ))}
    </div>
  )
}
