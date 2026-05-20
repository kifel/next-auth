import { Color } from "@/types/color"
import { Page } from "@/types/page"
import { apiFetch } from "../api-server"

type SearchColorsParams = {
  description?: string
  code?: string
  page?: number
  size?: number
}

export async function searchColors(
  params: SearchColorsParams = {}
): Promise<Page<Color>> {
    const query = new URLSearchParams()

     query.set(
    "page",
    String(params.page ?? 0)
  )

  query.set(
    "size",
    String(params.size ?? 10)
  )

    query.set(
      "description",
      params.description ?? ''
    )

    query.set(
      "code",
      params.code ?? ''
    )


  const res = await apiFetch(`/color/search?${query.toString()}`, {
    next: {
        revalidate: 120,
    }
  })
  
   if (!res.ok) {
    throw new Error(
      "Erro ao buscar cores"
    )
  }

  return res.json()
}