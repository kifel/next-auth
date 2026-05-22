"use client"

import { getColor } from "@/actions/color"
import { Badge } from "@/components/ui/badge"
import { TableCell, TableRow } from "@/components/ui/table"
import { Color } from "@/types/color"
import { useState } from "react"
import { EditColorDialog } from "./update/edit-color-dialog"
import { EditColorForm } from "./update/edit-color-form"

type Props = {
  color: Color
}

export function ColorTableRow({ color }: Props) {
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
    <>
      <TableRow className="cursor-pointer" onClick={handleOpen}>
        <TableCell>{color.id}</TableCell>
        <TableCell>{color.code}</TableCell>
        <TableCell>{color.description}</TableCell>
        <TableCell>
          <Badge variant={color.active ? "default" : "secondary"}>
            {color.active ? "Ativo" : "Inativo"}
          </Badge>
        </TableCell>
      </TableRow>

      <EditColorDialog open={open} onOpenChangeAction={handleClose}>
        {loading && (
          <p className="text-sm text-muted-foreground">Carregando...</p>
        )}
        {!loading && data && <EditColorForm color={data} onSuccessAction={() => setOpen(false)} />}
      </EditColorDialog>
    </>
  )
}
