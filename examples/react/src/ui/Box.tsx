import {
  border,
  BorderProps,
  color,
  ColorProps,
  display,
  DisplayProps,
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

export type BoxProps = SpaceProps &
  BorderProps &
  ColorProps &
  DisplayProps &
  LayoutProps &
  ShadowProps &
  TypographyProps

export const boxMixins = [
  border,
  color,
  display,
  layout,
  shadow,
  space,
  typography,
]

export const Box = tailwindSystem<BoxProps>(boxMixins)
