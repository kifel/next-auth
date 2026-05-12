import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

const publicRoutes = ["/"]

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isPublicRoute = publicRoutes.includes(path)

  if (path === "/logout") {
    const res = NextResponse.redirect(new URL("/", req.nextUrl))
    res.cookies.delete("accessToken")
    res.cookies.delete("refreshToken")
    return res
  }

  const accessToken = (await cookies()).get("accessToken")?.value
  const refreshToken = (await cookies()).get("refreshToken")?.value

  if (!isPublicRoute && !accessToken && refreshToken) {
    const newTokens = await tryRefresh(refreshToken)

    if (newTokens) {
      const res = isPublicRoute
        ? NextResponse.redirect(new URL("/dashboard", req.nextUrl))
        : NextResponse.next()

      res.cookies.set("accessToken", newTokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 15,
      })
      return res
    }

    if (!isPublicRoute && !accessToken) {
      return NextResponse.redirect(new URL("/", req.url))
    }

    if (isPublicRoute && accessToken) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return NextResponse.next()
  }

  if (!isPublicRoute && !accessToken) {
    return NextResponse.redirect(new URL("/", req.nextUrl))
  }

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
  }

  return NextResponse.next()
}

async function tryRefresh(refreshToken: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: { Authorization: `Bearer ${refreshToken}` },
    })
    if (!res.ok) return null
    const data = await res.json()
    return { accessToken: data.access_token }
  } catch {
    return null
  }
}

// Routes Proxy should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
