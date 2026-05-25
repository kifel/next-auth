import { refreshSession } from "@/lib/auth/auth-api"
import { NextRequest, NextResponse } from "next/server"

const publicRoutes = ["/"]

type JwtPayload = {
  exp: number
}

function isExpired(token: string) {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    ) as JwtPayload
    return payload.exp * 1000 < Date.now()
  } catch {
    return true
  }
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isPublicRoute = publicRoutes.includes(path)

  if (path === "/logout") {
    const reason = req.nextUrl.searchParams.get("reason")

    const url = new URL("/", req.nextUrl)
    if (reason) url.searchParams.set("reason", reason)

    const res = NextResponse.redirect(url)
    res.cookies.delete("accessToken")
    res.cookies.delete("refreshToken")

    return res
  }

  const accessToken = req.cookies.get("accessToken")?.value
  const refreshToken = req.cookies.get("refreshToken")?.value

  const hasValidAccessToken = accessToken && !isExpired(accessToken)

  if (!hasValidAccessToken) {
    if (!refreshToken) {
      if (!isPublicRoute) {
        return NextResponse.redirect(new URL("/", req.url))
      }
      return NextResponse.next()
    }

    try {
      const newTokens = await refreshSession(refreshToken)

      if (!newTokens) {
        return NextResponse.redirect(new URL("/logout", req.url))
      }

      const response = isPublicRoute
        ? NextResponse.redirect(new URL("/dashboard", req.url))
        : NextResponse.next()

      response.cookies.set("accessToken", newTokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15,
      })

      return response
    } catch {
      return NextResponse.redirect(new URL("/logout", req.url))
    }
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
