import "server-only"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"
import { apiFetchServer } from "./api-server"

export const verifySession = cache(async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value

  if (!token) {
    redirect("/")
  }

  const res = await apiFetchServer("/auth/me")

  if (res.status === 401 || res.status === 503) {
    redirect("/logout")
  }

  return {
    isAuth: true,
    user: await res.json(),
  }
})

export const getUser = cache(async () => {
  const session = await verifySession()
  return session.user
})
