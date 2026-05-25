import { Color } from "@/types/color"
import { z } from "zod"

export const ColorFormSchema = z.object({
  code: z.string().min(1, "Código é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
})

export const UpdateColorFormSchema = z.object({
  code: z.string().min(1, "Código é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  active: z.enum(["true", "false"]),
})

export type ColorFormValues = z.infer<typeof ColorFormSchema>
export type UpdateColorFormValues = z.infer<typeof UpdateColorFormSchema>

export type ColorFormState =
  | {
      errors?: {
        code?: string[]
        description?: string[]
      }
      apiErrors?: string[]
      message?: string
    }
  | undefined

export type GetColorResult =
  | {
      data: Color
    }
  | {
      error: string
    }
