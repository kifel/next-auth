"use client"

import { getColor } from "@/actions/color"
import { FormDialog } from "@/components/form-dialog"
import { Button } from "@/components/ui/button"
import { Color } from "@/types/color"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { EditColorForm } from "./edit-color-form"

type Props = {
  color: Color
}

export function EditColorDialog({ color }: Props) {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<Color | null>(null)
  const [loading, setLoading] = useState(false)

  function handleOpen() {
    setOpen(true)
    setLoading(true)
    getColor(color.id)
      .then(setData)
      .finally(() => setLoading(false))
  }

  function handleClose(isOpen: boolean) {
    if (!isOpen) setData(null)
    setOpen(isOpen)
  }

  return (
    <FormDialog
      title="Editar Cor"
      description="Atualize os dados da cor"
      open={open}
      onOpenChangeAction={handleClose}
      trigger={
        <Button variant="ghost" size="icon" onClick={handleOpen}>
          <Pencil className="size-4" />
        </Button>
      }
    >
      {loading && <p className="text-sm text-muted-foreground">Carregando...</p>}
      {!loading && data && (
        <EditColorForm color={data} onSuccessAction={() => setOpen(false)} />
      )}
    </FormDialog>
  )
}
