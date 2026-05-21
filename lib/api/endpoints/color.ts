import { Color } from "@/types/color"
import { Page } from "@/types/page"
import { apiFetch } from "../api-server"
import { handleApiError } from "../errors/handle-api-error"

type SearchColorsParams = {
  description?: string
  code?: string
  page?: number
  size?: number
}

type ColorRequest = {
  code: string
  description: string
}

export async function searchColors(
  params: SearchColorsParams = {}
): Promise<Page<Color>> {
  const query = new URLSearchParams()

  query.set("page", String(params.page ?? 0))

  query.set("size", String(params.size ?? 10))

  query.set("description", params.description ?? "")

  query.set("code", params.code ?? "")

  const res = await apiFetch(`/color/search?${query.toString()}`)

  if (!res.ok) {
    await handleApiError(res)
  }

  return res.json()
}

export async function createColorRequest(data: ColorRequest) {
  const response = await apiFetch("/color/admin/add", {
    method: "POST",
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    await handleApiError(response)
  }

  return response.json()
}
