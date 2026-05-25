
import { getUserWithPermissions } from "@/lib/auth/auth-dal"
import { can } from "@/lib/auth/permissions"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

export default async function ColorLayout({ children }: { children: ReactNode }) {
  const session = await getUserWithPermissions()

  if (!session) {
    return redirect("/logout")
  }

  if (!can(session!.permissions, "view", "color")) {
    redirect("/unauthorized")
  }

  return <>{children}</>
}
