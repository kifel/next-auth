"use server"

import { createColorRequest } from "@/lib/api/endpoints/color"
import { ApiError } from "@/lib/api/errors/api-error"
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
