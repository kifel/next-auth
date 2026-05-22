import { User } from "@/types/user"
import { cache } from "react"
import "server-only"
import { apiFetch } from "../api/api-server"

type Session = {
  isAuth: true
  user: User
}

export const verifySession = cache(async (): Promise<Session> => {
  const res = await apiFetch("/auth/me")
  return {
    isAuth: true,
    user: await res.json(),
  }
})

export const getUser = cache(async (): Promise<User> => {
  const session = await verifySession()
  return session.user
})
