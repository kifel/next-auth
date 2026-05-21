export function ApiError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null

  return (
    <div className="rounded-md bg-destructive/10 p-3">
      {errors.map((err, i) => (
        <p key={i} className="text-sm text-destructive">
          {err}
        </p>
      ))}
    </div>
  )
}
