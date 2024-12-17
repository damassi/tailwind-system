import { createElement, ElementType } from "react"

export const tailwindBreakpoints = ["sm", "md", "lg", "xl", "2xl"]

export type Responsive<T> = T | T[]

export type SpaceScale =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "8"
  | "10"
  | "12"
  | "16"
  | "20"
  | "24"
  | "32"
  | "40"
  | "48"
  | "56"
  | "64"
  | "auto"
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 8
  | 10
  | 12
  | 16
  | 20
  | 24
  | 32
  | 40
  | 48
  | 56
  | 64

export type BorderWidthScale = "0" | "2" | "4" | "8" | 0 | 2 | 4 | 8
export type BorderRadiusScale = "none" | "sm" | "md" | "lg" | "full" | 0

export type SpaceProps = {
  m?: Responsive<SpaceScale>
  mt?: Responsive<SpaceScale>
  mr?: Responsive<SpaceScale>
  mb?: Responsive<SpaceScale>
  ml?: Responsive<SpaceScale>
  mx?: Responsive<SpaceScale>
  my?: Responsive<SpaceScale>

  p?: Responsive<SpaceScale>
  pt?: Responsive<SpaceScale>
  pr?: Responsive<SpaceScale>
  pb?: Responsive<SpaceScale>
  pl?: Responsive<SpaceScale>
  px?: Responsive<SpaceScale>
  py?: Responsive<SpaceScale>
}

export type ColorProps = {
  textColor?: Responsive<string>
  backgroundColor?: Responsive<string>
  opacity?: Responsive<"0" | "25" | "50" | "75" | "100">
}

export type TypographyProps = {
  fontSize?: Responsive<string>
  fontWeight?: Responsive<string>
  textAlign?: Responsive<"left" | "center" | "right" | "justify">
}

export type BorderProps = {
  borderWidth?: Responsive<BorderWidthScale>
  borderRadius?: Responsive<BorderRadiusScale>
}

export type ShadowProps = {
  boxShadow?: Responsive<"sm" | "md" | "lg" | "xl" | "2xl" | "inner" | "none">
}

export type LayoutProps = {
  width?: Responsive<string>
  height?: Responsive<string>
}

export const space: Record<keyof SpaceProps, string> = {
  m: "m",
  mt: "mt",
  mr: "mr",
  mb: "mb",
  ml: "ml",
  mx: "mx",
  my: "my",
  p: "p",
  pt: "pt",
  pr: "pr",
  pb: "pb",
  pl: "pl",
  px: "px",
  py: "py",
}

export const color: Record<keyof ColorProps, string> = {
  textColor: "text",
  backgroundColor: "bg",
  opacity: "opacity",
}

export const typography: Record<keyof TypographyProps, string> = {
  fontSize: "text",
  fontWeight: "font",
  textAlign: "text",
}

export const border: Record<keyof BorderProps, string> = {
  borderWidth: "border",
  borderRadius: "rounded",
}

export const shadow: Record<keyof ShadowProps, string> = {
  boxShadow: "shadow",
}

export const layout: Record<keyof LayoutProps, string> = {
  width: "w",
  height: "h",
}

// Transform props to Tailwind classes
function transformProps(
  props: Record<string, any>,
  mappings: Record<string, string>[],
): string {
  const classes: string[] = []

  mappings.forEach((category) => {
    Object.entries(category).forEach(([key, prefix]) => {
      const value = props[key]

      if (value !== undefined) {
        if (Array.isArray(value)) {
          const paddedValues = [...value]
          while (paddedValues.length < tailwindBreakpoints.length) {
            paddedValues.push(paddedValues[paddedValues.length - 1])
          }
          paddedValues.forEach((v, index) => {
            classes.push(`${tailwindBreakpoints[index]}:${prefix}-${v}`)
          })
        } else {
          classes.push(`${prefix}-${value}`)
        }
      }
    })
  })

  return classes.join(" ")
}

export function createVariants<
  VariantKeys extends string,
  VariantConfig extends Record<VariantKeys, Partial<SpaceProps>>,
>(config: VariantConfig) {
  return config
}

// Main tailwindSystem function
export function tailwindSystem<T, Variants = {}>(
  elementOrMappings: string | Record<string, string>[],
  mappingsOrVariants?: Record<string, string>[] | Variants,
  variants?: Variants,
) {
  const element =
    typeof elementOrMappings === "string" ? elementOrMappings : "div"
  const mappings: Record<string, string>[] =
    typeof elementOrMappings === "string"
      ? (mappingsOrVariants as Record<string, string>[])
      : (elementOrMappings as Record<string, string>[])

  const resolvedVariants =
    typeof elementOrMappings === "string"
      ? variants
      : (mappingsOrVariants as Variants)

  return ({
    className = "",
    children,
    variant,
    ...props
  }: T & {
    className?: string
    children?: React.ReactNode
    variant?: keyof Variants
  }) => {
    const variantClasses = variant
      ? transformProps(resolvedVariants?.[variant] || {}, mappings)
      : ""

    const baseClasses = transformProps(props, mappings)

    const finalClassName = [variantClasses, baseClasses, className]
      .filter(Boolean)
      .join(" ")

    return createElement(element, { className: finalClassName }, children)
  }
}

const buttonVariants = createVariants({
  foo: {
    p: [2, 4],
    textColor: "white",
    backgroundColor: "blue-500",
  },
  bar: {
    m: [1, 2],
    textColor: "black",
    backgroundColor: "gray-500",
  },
})

const Button = tailwindSystem<
  SpaceProps &
    ColorProps &
    TypographyProps &
    BorderProps &
    ShadowProps &
    LayoutProps,
  typeof buttonVariants
>([space, color, typography, border, shadow, layout], buttonVariants)

const App = () => (
  <div>
    <Button p={[1, 2]} m="0">
      Responsive Button
    </Button>
    <Button variant="foo">Foo Variant</Button>
    <Button variant="bar" p={[2, 4]} boxShadow="lg">
      Bar Variant
    </Button>
  </div>
)
