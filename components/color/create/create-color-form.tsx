"use client"

import { createColor } from "@/actions/color"
import { ApiError } from "@/components/api-error"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useActionState } from "react"

export function ColorForm() {
  const [state, action, pending] = useActionState(createColor, undefined)

  return (
    <form action={action} className="mt-4">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="code">Código</FieldLabel>
          <Input
            id="code"
            name="code"
            placeholder="Ex: COR-001"
            aria-invalid={!!state?.errors?.code}
          />
          {state?.errors?.code && (
            <FieldError>{state.errors.code}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="description">Descrição</FieldLabel>
          <Input
            id="description"
            name="description"
            placeholder="Ex: Azul Marinho"
            aria-invalid={!!state?.errors?.description}
          />
          {state?.errors?.description && (
            <FieldError>{state.errors.description}</FieldError>
          )}
        </Field>

        <ApiError errors={state?.apiErrors} />

        <Field>
          <Button disabled={pending} type="submit">
            {pending ? "Salvando..." : "Salvar"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
