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

type UpdateColorRequest = {
  code: string
  description: string
  active: boolean
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

export async function getColorById(id: number): Promise<Color> {
  const res = await apiFetch(`/color/${id}`)

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

export async function updateColorRequest(id: number, data: UpdateColorRequest) {
  const response = await apiFetch(`/color/admin/update/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    await handleApiError(response)
  }

  return response.json()
}

export async function deleteColorRequest(id: number) {
  const response = await apiFetch(`/color/admin/delete/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    await handleApiError(response)
  }
}
