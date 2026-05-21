"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { ColorForm } from "./create-color-form"

export function ColorDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="size-4" />
          Nova cor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nova Cor</DialogTitle>
          <DialogDescription>Adicione uma nova cor</DialogDescription>
        </DialogHeader>
        <ColorForm />
      </DialogContent>
    </Dialog>
  )
}
