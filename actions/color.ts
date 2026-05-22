"use server"

import {
  createColorRequest,
  deleteColorRequest,
  getColorById,
  updateColorRequest,
} from "@/lib/api/endpoints/color"
import { ApiError } from "@/lib/api/errors/api-error"
import {
  ColorFormSchema,
  ColorFormState,
  UpdateColorFormSchema,
} from "@/lib/color/color-definitions"
import { Color } from "@/types/color"
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
    if (error instanceof ApiError) {
      return {
        apiErrors: error.data?.errors ?? ["Erro inesperado"],
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
    return { message: "Cor atualizada com sucesso" }
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return { apiErrors: error.data?.errors ?? ["Erro inesperado"] }
    }
    return { apiErrors: ["Erro inesperado"] }
  }
}

export async function getColor(id: number): Promise<Color> {
  try {
    return await getColorById(id)
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      throw new Error(error.data?.errors?.[0] ?? "Erro inesperado")
    }
    throw new Error("Erro inesperado")
  }
}

export async function deleteColor(id: number): Promise<{ error?: string }> {
  try {
    await deleteColorRequest(id)
    revalidatePath("/color")
    return {}
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return { error: error.data?.errors?.[0] ?? "Erro inesperado" }
    }
    return { error: "Erro inesperado" }
  }
}
