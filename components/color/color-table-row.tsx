"use client"

import { deleteColor } from "@/actions/color"
import { Badge } from "@/components/ui/badge"
import { TableCell, TableRow } from "@/components/ui/table"
import { Color } from "@/types/color"
import { ConfirmDeleteDialog } from "../confirm-delete-dialog"
import { EditColorDialog } from "./update/edit-color-dialog"

type Props = {
  color: Color
}

export function ColorTableRow({ color }: Props) {
  return (
    <TableRow className="cursor-pointer">
      <TableCell>{color.id}</TableCell>
      <TableCell>{color.code}</TableCell>
      <TableCell>{color.description}</TableCell>
      <TableCell>
        <Badge variant={color.active ? "default" : "secondary"}>
          {color.active ? "Ativo" : "Inativo"}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <EditColorDialog color={color} />
          <ConfirmDeleteDialog
            description={color.description}
            deleteAction={() => deleteColor(color.id)}
          />
        </div>
      </TableCell>
    </TableRow>
  )
}
