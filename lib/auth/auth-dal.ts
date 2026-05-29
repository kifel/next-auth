import { cache } from "react"
import "server-only"

import { apiFetch, NetworkError } from "../api/api-server"

import { User } from "@/types/user"
import { rethrowIfRedirectError } from "../next/rethrow-redirect"
import { buildPermissions, serializePermissions } from "./permissions"

type SessionResult =
  | {
      isAuth: true
      user: User
    }
  | {
      isAuth: false
      error?: string
    }

export const verifySession = cache(async (): Promise<SessionResult> => {
  try {
    const res = await apiFetch("/auth/me")

    if (!res.ok) {
      return {
        isAuth: false,
      }
    }

    return {
      isAuth: true,
      user: await res.json(),
    }
  } catch (error) {
    rethrowIfRedirectError(error)
    if (error instanceof NetworkError) {
      return {
        isAuth: false,
        error: "Servidor indisponível",
      }
    }

    return {
      isAuth: false,
      error: "Erro inesperado",
    }
  }
})

export const getUser = cache(async () => {
  const session = await verifySession()

  if (!session.isAuth) {
    return null
  }

  return session.user
})

export const getUserWithPermissions = cache(async () => {
  const user = await getUser()

  if (!user) {
    return null
  }

  const permissions = buildPermissions(user.roles)

  return {
    ...user,
    permissions,
    permissionsSerialized: serializePermissions(permissions),
  }
})
