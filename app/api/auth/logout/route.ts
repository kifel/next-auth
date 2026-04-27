import { NextResponse } from "next/server"

export async function POST() {
  const res = NextResponse.redirect(
    new URL("/", process.env.NEXT_PUBLIC_APP_URL)
  )

  res.cookies.set("accessToken", "", {
    path: "/",
    maxAge: 0,
  })

  res.cookies.set("refreshToken", "", {
    path: "/",
    maxAge: 0,
  })

  return res
}
