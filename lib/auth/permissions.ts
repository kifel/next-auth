import type {
  Action,
  PermissionMap,
  Resource,
  SerializedPermissions,
} from "./permissions.types"
import { ROLE_PERMISSIONS } from "./role-permissions"

/**
 * Recebe os roles do usuário e retorna um Map com a union
 * de todas as permissões. Roles independentes — sem herança.
 *
 * Exemplo:
 *   roles = [ROLE_USER, ROLE_GERENTE]
 *   → merge das permissões dos dois, sem duplicatas
 */
export function buildPermissions(roles: { name: string }[]): PermissionMap {
  const map: PermissionMap = new Map()

  for (const role of roles) {
    const rolePerms = ROLE_PERMISSIONS[role.name]
    if (!rolePerms) continue

    for (const [resource, actions] of Object.entries(rolePerms)) {
      if (!map.has(resource)) {
        map.set(resource, new Set())
      }
      for (const action of actions as Action[]) {
        map.get(resource)!.add(action)
      }
    }
  }

  return map
}

/**
 * Verifica se o usuário pode executar uma ação num recurso.
 * Usa o PermissionMap (servidor).
 */
export function can(
  permissions: PermissionMap,
  action: Action,
  resource: Resource
): boolean {
  return permissions.get(resource)?.has(action) ?? false
}

/**
 * Converte PermissionMap → objeto plain para trafegar
 * de Server Components para Client Components via props.
 */
export function serializePermissions(
  permissions: PermissionMap
): SerializedPermissions {
  return Object.fromEntries(
    [...permissions.entries()].map(([resource, actions]) => [
      resource,
      [...actions],
    ])
  )
}

/**
 * Verifica permissão a partir do objeto serializado.
 * Use em Client Components.
 */
export function canFromSerialized(
  permissions: SerializedPermissions,
  action: Action,
  resource: Resource
): boolean {
  return permissions[resource]?.includes(action) ?? false
}
