import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import "server-only"

const ACCESS_TOKEN_MAX_AGE = 60 * 60 * 24 * 7
const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 30

export async function createSession(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies()

  setAccessToken(cookieStore, accessToken)
  setRefreshToken(cookieStore, refreshToken)
}

export async function updateSession(
  accessToken: string,
  refreshToken?: string
) {
  const cookieStore = await cookies()

  setAccessToken(cookieStore, accessToken)

  if (refreshToken) {
    setRefreshToken(cookieStore, refreshToken)
  }
}

export async function destroySession() {
  const cookieStore = await cookies()

  cookieStore.delete("accessToken")
  cookieStore.delete("refreshToken")
}

function setAccessToken(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  token: string
) {
  cookieStore.set("accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_TOKEN_MAX_AGE,
  })
}

function setRefreshToken(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  token: string
) {
  cookieStore.set("refreshToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: REFRESH_TOKEN_MAX_AGE,
  })
}

export function setAuthCookies(
  response: NextResponse,
  tokens: { accessToken: string; refreshToken?: string | null }
) {
  response.cookies.set("accessToken", tokens.accessToken, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  })

  if (tokens.refreshToken) {
    response.cookies.set("refreshToken", tokens.refreshToken, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
  }
}
