"use server"

import { apiFetch } from "@/lib/api/api-server"
import { ColorFormSchema, ColorFormState } from "@/lib/color/color-definitions"
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

  const response = await apiFetch("/color/admin/add", {
    method: "POST",
    body: JSON.stringify(validatedFields.data),
  })

  if (!response.ok) {
    const error = await response.json()
    return {
      apiErrors: error.errors,
    }
  }

  revalidatePath("/color")

  return {
    message: "Cor criada com sucesso!",
  }
}
