import { cookies } from "next/headers"
import "server-only"

export async function refreshAccessToken() {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get("refreshToken")?.value

  if (!refreshToken) return null

  const res = await fetch(`${process.env.API_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  })

  if (!res.ok) return null

  console.log("refrash ok")

  const data = await res.json()

  return {
    accessToken: data.access_token,
    refreshToken: refreshToken,
  }
}
