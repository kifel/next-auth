import type { Action, Resource } from "./permissions.types"

type RolePermissions = Record<string, Partial<Record<Resource, Action[]>>>

/**
 * Mapa central de permissões.
 *
 * Regras:
 * - Só declare o que o role PODE fazer. Tudo que não está aqui é negado.
 * - Roles são independentes — nenhum herda do outro.
 * - ROLE_USER é o mínimo garantido a qualquer usuário autenticado.
 * - Para adicionar um novo recurso, basta incluir a entrada aqui.
 */
export const ROLE_PERMISSIONS: RolePermissions = {
  ROLE_USER: {
    // acesso mínimo garantido a todos os usuários autenticados
    color: ["view"],
    product: ["view"],
  },

  ROLE_ADMIN: {
    color: ["view", "create", "edit", "delete"],
    product: ["view", "create", "edit", "delete"],
  },

  ROLE_GERENTE: {
    color: ["view", "create", "edit"],
    product: ["view", "create", "edit"],
  },

  ROLE_SUPERVISOR: {
    color: ["view"],
    product: ["view", "create"],
  },
}
