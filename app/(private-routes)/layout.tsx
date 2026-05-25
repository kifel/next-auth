import { getUserWithPermissions } from "@/lib/auth/auth-dal";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getUserWithPermissions();

  if (!session) {
    redirect("/logout")
  }

  const hasUserRole = session.roles?.some((role) => role.name === "ROLE_USER")

  if (!hasUserRole) {
    redirect("/unauthorized")
  }

  return (
    <>
      {children}
    </>
  );
}
