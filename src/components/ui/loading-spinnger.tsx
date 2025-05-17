import { Loader2 } from "lucide-react"

export function LoadingSpinner({ className }: { className?: string }) {
  return <Loader2 className={`animate-spin ${className || "h-8 w-8"}`} />
}
