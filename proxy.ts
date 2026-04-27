import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const publicRoutes = ["/"]

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isPublicRoute = publicRoutes.includes(path)

  const accessToken = (await cookies()).get("accessToken")?.value

  if (!isPublicRoute && !accessToken) {
    return NextResponse.redirect(new URL("/", req.nextUrl))
  }

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
  }

  return NextResponse.next()
}

// Routes Proxy should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
