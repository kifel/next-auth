export async function loginRequest(data: {
  username: string
  password: string
}) {
  const res = await fetch(`${process.env.API_URL}/auth/authenticate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error("INVALID_CREDENTIALS")

  return res.json()
}

export async function refreshSession(refreshToken: string) {
  const res = await fetch(`${process.env.API_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  })

  if (!res.ok) return null

  const data = await res.json()

  return {
    accessToken: data.access_token,
  }
}
