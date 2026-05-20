import {
    TableCell,
    TableRow,
} from "@/components/ui/table"

import { Badge } from "@/components/ui/badge"

import { Color } from "@/types/color"

type Props = {
  color: Color
}

export function ColorTableRow({
  color,
}: Props) {
  return (
    <TableRow className="cursor-pointer">
      <TableCell>
        {color.id}
      </TableCell>

      <TableCell>
        {color.code}
      </TableCell>

      <TableCell>
        {color.description}
      </TableCell>

      <TableCell>
        <Badge
          variant={
            color.active
              ? "default"
              : "secondary"
          }
        >
          {color.active
            ? "Ativo"
            : "Inativo"}
        </Badge>
      </TableCell>
    </TableRow>
  )
}