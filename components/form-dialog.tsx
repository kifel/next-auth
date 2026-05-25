"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

type Props = {
  title: string
  description: string
  trigger?: React.ReactNode
  open?: boolean
  onOpenChangeAction?: (open: boolean) => void
  children: React.ReactNode
}

export function FormDialog({
  title,
  description,
  trigger,
  open,
  onOpenChangeAction,
  children,
}: Props) {
  const [internalOpen, setInternalOpen] = useState(false)

  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const setOpen = isControlled ? onOpenChangeAction! : setInternalOpen

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {trigger && (
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
