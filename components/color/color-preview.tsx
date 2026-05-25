type ParsedColor = {
  color: string | null
  text: string
}

export function parseColorText(value: string): ParsedColor {
  const patterns = [
    /#(?:[0-9a-fA-F]{3}){1,2}\b/,
    /rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/,
    /rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(0|1|0?\.\d+)\s*\)/,
    /hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)/,
  ]

  for (const pattern of patterns) {
    const match = value.match(pattern)

    if (match) {
      const color = match[0]

      const text = value
        .replace(color, "")
        .replace(/\s+/g, " ")
        .trim()

      return {
        color,
        text,
      }
    }
  }

  return {
    color: null,
    text: value,
  }
}

type Props = {
  color: string
}

export function ColorPreview({ color }: Props) {
  return (
    <div
      className="h-4 w-4 rounded-full border"
      style={{ backgroundColor: color }}
    />
  )
}
