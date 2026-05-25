export type Action = "view" | "create" | "edit" | "delete"

// string genérico — suporta qualquer um dos 100+ recursos sem enum fixo
export type Resource = string

export type PermissionMap = Map<Resource, Set<Action>>

// versão serializável para passar de Server Components → Client Components
// (Map/Set não são serializáveis pelo Next.js)
export type SerializedPermissions = Record<Resource, Action[]>
