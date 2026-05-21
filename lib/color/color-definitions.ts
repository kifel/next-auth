import { z } from "zod"

export const ColorFormSchema = z.object({
  code: z.string().min(1, "Código é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
})

export type ColorFormValues = z.infer<typeof ColorFormSchema>

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
