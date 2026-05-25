import { ColorTable } from "@/components/color/color-table"
import { CreateColorDialog } from "@/components/color/create/create-color-dialog"
import { DataTablePagination } from "@/components/data-table-pagination"
import { DynamicFilter } from "@/components/filtro"
import { getUserWithPermissions } from "@/lib/auth/auth-dal"
import { can } from "@/lib/auth/permissions"
import { searchColors } from "@/lib/color/color-dal"


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
  const session = await getUserWithPermissions()
  const perms = session!.permissions

  const result = await searchColors({
    description: params.description,
    code: params.code,
    page: Number(params.page ?? 0),
    size: Number(params.size ?? 10),
  })

  if (result.error || !result.data) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-destructive/20 bg-card p-6">
          <h2 className="text-lg font-semibold">
            Erro ao carregar cores
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {result.error}
          </p>
        </div>
      </div>
    )
  }

  const colors = result.data

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

        {can(perms, "create", "color") && <CreateColorDialog />}
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
