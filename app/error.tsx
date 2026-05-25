"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AlertTriangle, House, RefreshCcw } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-muted/30 p-6">
      <Card className="w-full max-w-lg border-destructive/20 shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">
              Ocorreu um erro
            </CardTitle>

            <CardDescription className="text-base">
              {error.message || "Erro inesperado"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-3 sm:flex-row">
          <Button
            onClick={() => reset()}
            className="flex-1 gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Tentar novamente
          </Button>

          <Button
            asChild
            variant="outline"
            className="flex-1 gap-2"
          >
            <Link href="/">
              <House className="h-4 w-4" />
              Ir o início
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
