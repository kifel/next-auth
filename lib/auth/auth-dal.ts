import { cache } from "react"
import "server-only"

import { apiFetch, NetworkError } from "../api/api-server"

import { User } from "@/types/user"

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
