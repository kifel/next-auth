"use client"

import { canFromSerialized } from "@/lib/auth/permissions"
import type { Action, Resource, SerializedPermissions } from "@/lib/auth/permissions.types"
import { ReactNode } from "react"

interface CanProps {
  action: Action
  resource: Resource
  permissions: SerializedPermissions
  children: ReactNode
  /** Conteúdo renderizado quando sem permissão. Padrão: nada. */
  fallback?: ReactNode
}

/**
 * Renderiza `children` apenas se o usuário tiver permissão.
 * Use para botões, dialogs de cadastro, e qualquer ação condicional.
 *
 * Exemplo:
 *   <Can action="create" resource="product" permissions={perms}>
 *     <Button>Novo produto</Button>
 *   </Can>
 */
export function Can({ action, resource, permissions, children, fallback = null }: CanProps) {
  const allowed = canFromSerialized(permissions, action, resource)
  return allowed ? <>{children}</> : <>{fallback}</>
}
