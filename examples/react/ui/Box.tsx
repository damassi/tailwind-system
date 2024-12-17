import {
  border,
  BorderProps,
  color,
  ColorProps,
  createVariants,
  layout,
  LayoutProps,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
  tailwindSystem,
  typography,
  TypographyProps,
} from "@lib/tailwindSystem"

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

export const Box = tailwindSystem<
  SpaceProps &
    ColorProps &
    TypographyProps &
    BorderProps &
    ShadowProps &
    LayoutProps,
  typeof buttonVariants
>([space, color, typography, border, shadow, layout], buttonVariants)
