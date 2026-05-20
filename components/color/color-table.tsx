import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Color } from "@/types/color"
import { ColorTableRow } from "./color-table-row"


type Props = {
    data: Color[]
}

export function ColorTable({
    data,
}: Props) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Código</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((color) => (
                        <ColorTableRow
                            key={color.id}
                            color={color}
                        />
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}