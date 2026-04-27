import { cookies } from "next/headers"
import "server-only"

export async function apiFetchServer(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies()

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/proxy${path}`,
    {
      ...options,
      headers: {
        ...(options.headers || {}),
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    }
  )

  return res
}
