"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"

export function SessionToast() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const reason = searchParams.get("reason")

  useEffect(() => {
    if (reason !== "session_expired") return

    toast.error("Sessão expirada. Faça login novamente.")
    router.replace(pathname)
  }, [reason, pathname, router])

  return null
}
