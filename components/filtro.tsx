/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import {
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react"

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"

import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type FilterOption = {
  label: string
  value: string
}

type Props = {
  options: FilterOption[]
  placeholder?: string
}

export function DynamicFilter({
  options,
  placeholder,
}: Props) {
  const router = useRouter()

  const pathname = usePathname()

  const searchParams = useSearchParams()

  const [pending] =
    useTransition()

  const isFirstRender = useRef(true)

  const [field, setField] = useState(
    options[0].value
  )

  const [value, setValue] = useState(
    searchParams.get(options[0].value) ?? ""
  )

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const timer = setTimeout(() => {
      const params = new URLSearchParams(
        searchParams.toString()
      )

      options.forEach((option) => {
        params.delete(option.value)
      })

      if (value.trim()) {
        params.set(field, value)
        params.set("page", "0")
      } else {
        params.delete("page")
      }

      const nextUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname

      router.replace(nextUrl)
    }, 500)

    return () => clearTimeout(timer)
  }, [value, field])

  return (
    <div className="flex gap-2">
      <Select
        value={field}
        onValueChange={setField}
      >
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        value={value}
        placeholder={placeholder}
        disabled={pending}
        onChange={(e) =>
          setValue(e.target.value)
        }
      />
    </div>
  )
}
