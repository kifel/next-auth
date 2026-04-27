import { ApiError } from "../errors/api-error"

export async function apiFetchClient<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`/api/proxy${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
  })

  const contentType = res.headers.get("content-type")

  const responseData = contentType?.includes("application/json")
    ? await res.json()
    : await res.text()

  if (!res.ok) {
    throw new ApiError(
      typeof responseData === "string" ? responseData : "Erro na requisição",
      res.status,
      responseData
    )
  }

  return responseData as T
}
