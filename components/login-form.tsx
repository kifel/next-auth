"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "./theme-toggle"
import { login } from "@/app/actions/auth"
import { useActionState } from "react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, action, pending] = useActionState(login, undefined)
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="relative flex flex-col items-center">
          <div className="self-end">
            <ModeToggle />
          </div>

          <CardTitle className="text-center text-xl">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Usuário</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Usuário"
                  aria-invalid={!!state?.errors?.username}
                />
                {state?.errors?.username && (
                  <FieldError>{state.errors.username}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Senha"
                  name="password"
                  aria-invalid={!!state?.errors?.password}
                />
                {state?.errors?.password && (
                  <FieldError>{state.errors.password}</FieldError>
                )}
              </Field>
              <Field>
                <Button disabled={pending} type="submit">
                  Login
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
