"use client"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import {
  Field,
  FieldLabel,
} from "./ui/field"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

import { useSearchParams } from "next/navigation"

type Props = {
  page: {
    number: number
    totalPages: number
    size: number
  }
}

export function DataTablePagination({
  page,
}: Props) {
  const searchParams = useSearchParams()

  const currentPage = page.number
  const totalPages = page.totalPages
  const currentSize = page.size

  function createPageUrl(pageNumber: number) {
    const params = new URLSearchParams(
      searchParams.toString()
    )

    params.set("page", String(pageNumber))
    params.set("size", String(currentSize))

    return `?${params.toString()}`
  }

  function handleSizeChange(size: string) {
    const params = new URLSearchParams(
      searchParams.toString()
    )

    params.set("page", "0")
    params.set("size", size)

    window.location.href = `?${params.toString()}`
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="select-rows-per-page">
          Rows per page
        </FieldLabel>

        <Select
          value={currentSize.toString()}
          onValueChange={handleSizeChange}
        >
          <SelectTrigger
            className="w-20"
            id="select-rows-per-page"
          >
            <SelectValue />
          </SelectTrigger>

          <SelectContent align="start">
            <SelectGroup>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          {currentPage > 0 && (
            <PaginationItem>
              <PaginationPrevious
                href={createPageUrl(currentPage - 1)}
                prefetch={false}
              />
            </PaginationItem>
          )}

          {Array.from(
            { length: totalPages },
            (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href={createPageUrl(index)}
                  isActive={index === currentPage}
                  prefetch={false}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          {currentPage < totalPages - 1 && (
            <PaginationItem>
              <PaginationNext
                prefetch={false}
                href={createPageUrl(currentPage + 1)}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  )
}
