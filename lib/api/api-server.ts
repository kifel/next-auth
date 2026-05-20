import { updateSession } from "@/lib/auth/session"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import "server-only"

export async function fetchWithToken(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  return fetch(`${process.env.API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...(options.headers || {}),
    },
    cache: options.cache ?? (options.next ? undefined : "no-store"),
  })
}

async function refreshAccessToken(): Promise<boolean> {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get("refreshToken")?.value

  if (!refreshToken) return false

  const res = await fetch(`${process.env.API_URL}/auth/refresh-token`, {
    method: "POST",
    headers: { Authorization: `Bearer ${refreshToken}` },
  })

  if (!res.ok) return false

  const data = await res.json()

  await updateSession(data.access_token)

  return true
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  let res = await fetchWithToken(path, options)

  if (res.status === 401) {
    const refreshed = await refreshAccessToken()

    if (!refreshed) {
      redirect("/logout")
    }

    res = await fetchWithToken(path, options)

    if (res.status === 401) {
      redirect("/logout")
    }
  }

  return res
}
