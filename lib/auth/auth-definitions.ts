import * as z from "zod"

export const LoginFormSchema = z.object({
  username: z
    .string()
    .min(2, { error: "Name must be at least 2 characters long." })
    .trim(),
  password: z
    .string()
    .min(2, { error: "Password must be at least 2 characters long." })
    .trim(),
})

export type LoginFormState =
  | {
      errors?: {
        username?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined
