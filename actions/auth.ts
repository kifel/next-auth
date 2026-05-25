"use server"

import { NetworkError } from "@/lib/api/api-server"
import { loginRequest } from "@/lib/auth/auth-api"
import { LoginFormSchema, LoginFormState } from "@/lib/auth/auth-definitions"
import { createSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { z } from "zod"

export async function login(
  _state: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
    }
  }

  try {
    const data = await loginRequest(validatedFields.data)

    await createSession(data.access_token, data.refresh_token)
  } catch (error) {
    if (error instanceof NetworkError) {
      return {
        errors: {
          username: ["Servidor indisponível"],
        },
      }
    }

    if (error instanceof Error) {
      if (error.message === "INVALID_CREDENTIALS") {
        return {
          errors: {
            username: ["Usuário ou senha inválidos"],
          },
        }
      }
    }

    return {
      errors: {
        username: ["Erro inesperado"],
      },
    }
  }

  redirect("/dashboard")
}
