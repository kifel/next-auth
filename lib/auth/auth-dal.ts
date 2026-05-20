import { User } from "@/types/user"
import { redirect } from "next/navigation"
import { cache } from "react"
import "server-only"
import { fetchWithToken } from "../api/api-server"

type Session = {
  isAuth: true
  user: User
}

export const verifySession = cache(async (): Promise<Session> => {
  const res = await fetchWithToken("/auth/me")

  if (res.status === 401 || res.status === 503) {
    redirect("/logout")
  }

  return {
    isAuth: true,
    user: await res.json(),
  }
})

export const getUser = cache(async (): Promise<User> => {
  const session = await verifySession()
  return session.user
})
