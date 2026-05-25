import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { ArrowLeft, LockKeyhole, ShieldAlert } from "lucide-react"

import Link from "next/link"

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-linear-to-br from-background via-muted/30 to-background p-6">
      <Card className="w-full max-w-xl border-border/60 shadow-2xl">
        <CardHeader className="space-y-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border bg-destructive/10 shadow-sm">
            <ShieldAlert className="h-10 w-10 text-destructive" />
          </div>

          <div className="space-y-3">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Acesso negado
            </CardTitle>

            <CardDescription className="text-base leading-relaxed">
              Você não possui permissão para acessar este recurso.
              <br />
              Caso acredite que isso seja um erro, entre em contato com um administrador.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            className="flex-1 gap-2"
          >
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao dashboard
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="flex-1 gap-2"
          >
            <Link href="/logout">
              <LockKeyhole className="h-4 w-4" />
              Trocar conta
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
