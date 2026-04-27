import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { refreshAccessToken } from "@/lib/auth/auth-refresh"
import { setAuthCookies } from "@/lib/auth/session"

type HandlerContext = {
  params: { path: string[] } | Promise<{ path: string[] }>
}

export async function handler(req: NextRequest, context: HandlerContext) {
  const resolved = await context.params
  const path = "/" + resolved.path.join("/")
  const cookieStore = await cookies()

  const accessToken = cookieStore.get("accessToken")?.value

  const body =
    req.method === "GET" || req.method === "HEAD" ? undefined : await req.text()

  try {
    const res = await fetch(`${process.env.API_URL}${path}`, {
      method: req.method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body,
    })

    if (res.status === 401) {
      const tokens = await refreshAccessToken()

      if (!tokens) {
        return new NextResponse(null, { status: 401 })
      }

      const retry = await fetch(`${process.env.API_URL}${path}`, {
        method: req.method,
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          "Content-Type": "application/json",
        },
        body,
      })

      const response = new NextResponse(await retry.text(), {
        status: retry.status,
      })
      setAuthCookies(response, tokens)
      return response
    }

    const data = await res.json()

    return new NextResponse(JSON.stringify(data), {
      status: res.status,
    })
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: "api_offline" + err }), {
      status: 503,
    })
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
