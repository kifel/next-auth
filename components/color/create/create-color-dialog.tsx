"use client"

import { FormDialog } from "@/components/form-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ColorForm } from "./create-color-form"

export function CreateColorDialog() {
  return (
    <FormDialog
      title="Nova Cor"
      description="Adicione uma nova cor"
      trigger={
        <Button className="gap-2">
          <Plus className="size-4" />
          Nova cor
        </Button>
      }
    >
      <ColorForm />
    </FormDialog>
  )
}
