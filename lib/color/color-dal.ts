import "server-only"

import {
  getColorByIdRequest,
  SearchColorsParams,
  searchColorsRequest,
} from "@/lib/api/endpoints/color"

import { NetworkError } from "@/lib/api/api-server"
import { ApiError } from "@/lib/api/errors/api-error"
import { rethrowIfRedirectError } from "../next/rethrow-redirect"

export async function getColor(id: number) {
  try {
    const data = await getColorByIdRequest(id)

    return {
      data,
      error: null,
    }
  } catch (error) {
    rethrowIfRedirectError(error)
    if (error instanceof ApiError) {
      return {
        data: null,
        error: error.data?.errors?.[0] ?? "Erro inesperado",
      }
    }

    if (error instanceof NetworkError) {
      return {
        data: null,
        error: "Servidor indisponível",
      }
    }

    return {
      data: null,
      error: "Erro inesperado",
    }
  }
}

export async function searchColors(params: SearchColorsParams = {}) {
  try {
    const data = await searchColorsRequest(params)

    return {
      data,
      error: null,
    }
  } catch (error) {
    rethrowIfRedirectError(error)
    if (error instanceof ApiError) {
      return {
        data: null,
        error: error.data?.errors?.[0] ?? "Erro inesperado",
      }
    }

    if (error instanceof NetworkError) {
      return {
        data: null,
        error: "Servidor indisponível",
      }
    }

    return {
      data: null,
      error: "Erro inesperado",
    }
  }
}
