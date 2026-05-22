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

export async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetchWithToken(path, options)

  if (res.status === 401) {
    redirect("/logout?reason=session_expired")
  }

  return res
}
