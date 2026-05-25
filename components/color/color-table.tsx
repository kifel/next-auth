import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Color } from "@/types/color"
import { ColorTableRow } from "./color-table-row"

type Props = {
  data: Color[]
  canEdit: boolean
  canDelete: boolean
}

export function ColorTable({ data, canEdit, canDelete }: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Código</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((color) => (
            <ColorTableRow
              key={color.id}
              color={color}
              canEdit={canEdit}
              canDelete={canDelete}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
