import { ApiError, ApiErrorResponse } from "./api-error"

export async function handleApiError(response: Response): Promise<never> {
  let error: ApiErrorResponse

  try {
    error = await response.json()
  } catch {
    throw new ApiError("Erro inesperado", response.status)
  }

  throw new ApiError<ApiErrorResponse>(error.message, response.status, error)
}
