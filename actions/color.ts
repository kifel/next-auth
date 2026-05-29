"use server"

import { NetworkError } from "@/lib/api/api-server"
import {
  createColorRequest,
  deleteColorRequest,
  getColorByIdRequest,
  updateColorRequest,
} from "@/lib/api/endpoints/color"

import { ApiError } from "@/lib/api/errors/api-error"

import {
  ColorFormSchema,
  ColorFormState,
  GetColorResult,
  UpdateColorFormSchema,
} from "@/lib/color/color-definitions"
import { rethrowIfRedirectError } from "@/lib/next/rethrow-redirect"

import { revalidatePath } from "next/cache"

import { z } from "zod"

export async function createColor(
  _state: ColorFormState,
  formData: FormData
): Promise<ColorFormState> {
  const validatedFields = ColorFormSchema.safeParse({
    code: formData.get("code"),
    description: formData.get("description"),
  })

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
    }
  }

  try {
    await createColorRequest(validatedFields.data)

    revalidatePath("/color")

    return {
      message: "Cor criada com sucesso",
    }
  } catch (error: unknown) {
    rethrowIfRedirectError(error)
    if (error instanceof ApiError) {
      return {
        apiErrors: error.data?.errors ?? ["Erro inesperado"],
      }
    }

    if (error instanceof NetworkError) {
      return {
        apiErrors: ["Servidor indisponível"],
      }
    }

    return {
      apiErrors: ["Erro inesperado"],
    }
  }
}

export async function updateColor(
  _state: ColorFormState,
  formData: FormData
): Promise<ColorFormState> {
  const id = Number(formData.get("id"))

  const validatedFields = UpdateColorFormSchema.safeParse({
    code: formData.get("code"),
    description: formData.get("description"),
    active: formData.get("active"),
  })

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
    }
  }

  try {
    await updateColorRequest(id, {
      ...validatedFields.data,
      active: validatedFields.data.active === "true",
    })

    revalidatePath("/color")

    return {
      message: "Cor atualizada com sucesso",
    }
  } catch (error: unknown) {
    rethrowIfRedirectError(error)
    if (error instanceof ApiError) {
      return {
        apiErrors: error.data?.errors ?? ["Erro inesperado"],
      }
    }

    if (error instanceof NetworkError) {
      return {
        apiErrors: ["Servidor indisponível"],
      }
    }

    return {
      apiErrors: ["Erro inesperado"],
    }
  }
}

export async function getColorAction(id: number): Promise<GetColorResult> {
  try {
    const color = await getColorByIdRequest(id)

    return {
      data: color,
    }
  } catch (error) {
    rethrowIfRedirectError(error)
    if (error instanceof ApiError) {
      return {
        error: error.data?.errors?.[0] ?? "Erro inesperado",
      }
    }

    if (error instanceof NetworkError) {
      return {
        error: "Servidor indisponível",
      }
    }

    return {
      error: "Erro inesperado",
    }
  }
}

export async function deleteColor(id: number): Promise<{ error?: string }> {
  try {
    await deleteColorRequest(id)

    revalidatePath("/color")

    return {}
  } catch (error: unknown) {
    rethrowIfRedirectError(error)
    if (error instanceof ApiError) {
      return {
        error: error.data?.errors?.[0] ?? "Erro inesperado",
      }
    }

    if (error instanceof NetworkError) {
      return {
        error: "Servidor indisponível",
      }
    }

    return {
      error: "Erro inesperado",
    }
  }
}
