"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function LogoutPage() {
  const [status, setStatus] = useState<"loading" | "done">("loading")

  useEffect(() => {
    const run = async () => {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include",
        })

        setStatus("done")

        // pequena pausa só pra UX não ficar "seca"
        setTimeout(() => {
          window.location.href = "/"
        }, 800)
      } catch (err) {
        console.error(err)
        window.location.href = "/"
      }
    }

    run()
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-sm text-center">
        <CardHeader>
          <CardTitle>Saindo da sua conta</CardTitle>
          <CardDescription>
            Aguarde um momento enquanto encerramos sua sessão
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4">
          {status === "loading" ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Fazendo logout...</p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Redirecionando...</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
