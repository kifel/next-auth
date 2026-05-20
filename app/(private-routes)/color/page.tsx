import { ColorTable } from "@/components/color/color-table"
import { DataTablePagination } from "@/components/data-table-pagination"
import { DynamicFilter } from "@/components/filtro"

import { searchColors } from "@/lib/api/endpoints/color"

import { Button } from "@/components/ui/button"

import { Plus } from "lucide-react"

type Props = {
    searchParams: Promise<{
        description?: string
        code?: string
        page?: string
        size?: string
    }>
}

export default async function ColorPage({
    searchParams,
}: Props) {
    const params = await searchParams

    const colors = await searchColors({
        description: params.description,
        code: params.code,
        page: Number(params.page ?? 0),
        size: Number(params.size ?? 10),
    })

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Cores
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Gerencie as cores cadastradas no sistema.
                    </p>
                </div>

                <Button className="gap-2">
                    <Plus className="size-4" />
                    Nova cor
                </Button>
            </div>

            <div className="rounded-xl border bg-card shadow-sm">
                <div className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h2 className="text-sm font-medium">
                            Filtros
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Pesquise por descrição ou código.
                        </p>
                    </div>

                    <DynamicFilter
                        placeholder="Pesquisar cor..."
                        options={[
                            {
                                label: "Descrição",
                                value: "description",
                            },
                            {
                                label: "Código",
                                value: "code",
                            },
                        ]}
                    />
                </div>

                <div className="p-4">
                    <ColorTable data={colors.content} />
                </div>

                <div className="border-t p-4">
                    <DataTablePagination page={colors.page} />
                </div>
            </div>
        </div>
    )
}