import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getUser } from "@/lib/auth/auth-dal"
import Link from "next/link"

export default async function Dashboard() {
  const user = await getUser()

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Bem-vindo, {user.name}</CardTitle>
          <CardDescription>Rota protegida</CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="text-sm text-muted-foreground">
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>Usuário:</strong> {user.username}
            </p>
            <p>
              <strong>Status:</strong> {user.isActive ? "Ativo" : "Inativo"}
            </p>
          </div>

          <div className="pt-2">
            <p className="mb-1 font-medium">Roles</p>

            {user.roles?.length ? (
              user.roles.map((role: { name: string }, idx: number) => (
                <p key={role.name ?? idx} className="text-sm">
                  • {role.name}
                </p>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                Nenhuma role atribuída
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Link href={"/logout"}>
            <Button variant={"outline"} size={"sm"} className="w-full">
              Sair
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
