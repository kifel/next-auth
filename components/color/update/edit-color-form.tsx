"use client"

import { updateColor } from "@/actions/color"
import { ViewApiError } from "@/components/api-error"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Color } from "@/types/color"
import { useActionState, useEffect, useState } from "react"

type Props = {
  color: Color
  onSuccessAction: () => void
}

export function EditColorForm({ color, onSuccessAction }: Props) {
  const [state, action, pending] = useActionState(updateColor, undefined)
  const [active, setActive] = useState(color.active)

  useEffect(() => {
    if (state?.message) onSuccessAction()
  }, [onSuccessAction, state?.message])

  return (
    <form action={action} className="mt-4">
      <input type="hidden" name="id" value={color.id} />
      <input type="hidden" name="active" value={String(active)} />

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="code">Código</FieldLabel>
          <Input
            id="code"
            name="code"
            defaultValue={color.code}
            aria-invalid={!!state?.errors?.code}
          />
          {state?.errors?.code && <FieldError>{state.errors.code}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="description">Descrição</FieldLabel>
          <Input
            id="description"
            name="description"
            defaultValue={color.description}
            aria-invalid={!!state?.errors?.description}
          />
          {state?.errors?.description && (
            <FieldError>{state.errors.description}</FieldError>
          )}
        </Field>

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="active">Ativo</FieldLabel>
            <Switch id="active" checked={active} onCheckedChange={setActive} />
          </div>
        </Field>

        <ViewApiError errors={state?.apiErrors} />

        <Field>
          <Button disabled={pending} type="submit">
            {pending ? "Salvando..." : "Salvar"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
