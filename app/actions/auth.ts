"use server"

import { LoginFormSchema, LoginFormState } from "@/lib/auth/auth-definitions"
import { createSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"

export async function login(_state: LoginFormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const response = await fetch(`${process.env.API_URL}/auth/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields.data),
  })

  if (!response.ok) {
    return {
      errors: {
        username: ["Usuário ou senha inválidos"],
      },
    }
  }

  const data = await response.json()

  await createSession(data.access_token, data.refresh_token)

  redirect("/dashboard")
}
