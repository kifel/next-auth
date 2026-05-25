"use client"

import { deleteColor } from "@/actions/color"
import { Badge } from "@/components/ui/badge"
import { TableCell, TableRow } from "@/components/ui/table"
import { Color } from "@/types/color"
import { ConfirmDeleteDialog } from "../confirm-delete-dialog"
import { ColorPreview, parseColorText } from "./color-preview"
import { EditColorDialog } from "./update/edit-color-dialog"

type Props = {
  color: Color
}

export function ColorTableRow({ color }: Props) {
  const parsed = parseColorText(color.description)
  return (
    <TableRow className="cursor-pointer">
      <TableCell>{color.id}</TableCell>
      <TableCell>{color.code}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {parsed.color && (
            <ColorPreview color={parsed.color} />
          )}

          <span>{parsed.text}</span>
        </div>
      </TableCell>
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
