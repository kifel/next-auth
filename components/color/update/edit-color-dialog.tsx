"use client"

import { getColorAction } from "@/actions/color"

import { FormDialog } from "@/components/form-dialog"
import { Button } from "@/components/ui/button"

import { Color } from "@/types/color"

import { Pencil } from "lucide-react"

import { useState } from "react"

import { EditColorForm } from "./edit-color-form"

type Props = {
  color: Color
}

export function EditColorDialog({
  color,
}: Props) {
  const [open, setOpen] = useState(false)

  const [data, setData] =
    useState<Color | null>(null)

  const [loading, setLoading] =
    useState(false)

  const [error, setError] = useState<
    string | null
  >(null)

  async function handleOpen() {
    setOpen(true)

    setLoading(true)

    setError(null)

    setData(null)

    const result = await getColorAction(
      color.id
    )

    if ("error" in result) {
      setError(result.error)

      setLoading(false)

      return
    }

    setData(result.data)

    setLoading(false)
  }

  function handleClose(isOpen: boolean) {
    setOpen(isOpen)

    if (!isOpen) {
      setData(null)

      setError(null)
    }
  }

  return (
    <FormDialog
      title="Editar Cor"
      description="Atualize os dados da cor"
      open={open}
      onOpenChangeAction={handleClose}
      trigger={
        <Button
          variant="ghost"
          size="icon"
          onClick={handleOpen}
        >
          <Pencil className="size-4" />
        </Button>
      }
    >
      {loading && (
        <p className="text-sm text-muted-foreground">
          Carregando...
        </p>
      )}

      {error && (
        <p className="text-sm text-destructive">
          {error}
        </p>
      )}

      {!loading && data && (
        <EditColorForm
          color={data}
          onSuccessAction={() =>
            setOpen(false)
          }
        />
      )}
    </FormDialog>
  )
}
