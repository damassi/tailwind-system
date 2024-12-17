// @ts-ignore
import React from "react";

type SpaceScale =
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
  | 64;
type GapScale = SpaceScale | "px";

type BorderWidthScale = "0" | "2" | "4" | "8" | 0 | 2 | 4 | 8;

type BorderRadiusScale =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "full"
  | 0
  | "0.125rem"
  | "0.25rem"
  | "0.5rem"
  | "0.75rem"
  | "9999px";

type OpacityScale = "0" | "25" | "50" | "75" | "100" | 0 | 25 | 50 | 75 | 100;

export type SpaceProps = {
  m?: SpaceScale;
  mt?: SpaceScale;
  mr?: SpaceScale;
  mb?: SpaceScale;
  ml?: SpaceScale;
  mx?: SpaceScale;
  my?: SpaceScale;

  p?: SpaceScale;
  pt?: SpaceScale;
  pr?: SpaceScale;
  pb?: SpaceScale;
  pl?: SpaceScale;
  px?: SpaceScale;
  py?: SpaceScale;

  gap?: GapScale;
  spaceX?: GapScale;
  spaceY?: GapScale;
};

export type ColorProps = {
  textColor?:
    | "black"
    | "white"
    | "gray-50"
    | "gray-100"
    | "gray-500"
    | "red-500"
    | "blue-500"
    | "green-500";
  backgroundColor?:
    | "black"
    | "white"
    | "gray-50"
    | "gray-100"
    | "gray-500"
    | "red-500"
    | "blue-500"
    | "green-500";
  opacity?: OpacityScale;
};

export type TypographyProps = {
  fontSize?:
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl";
  fontWeight?:
    | "thin"
    | "light"
    | "normal"
    | "medium"
    | "bold"
    | "extrabold"
    | "black";
  textAlign?: "left" | "center" | "right" | "justify";
  lineHeight?: "none" | "tight" | "snug" | "normal" | "relaxed" | "loose";
  letterSpacing?: "tighter" | "tight" | "normal" | "wide" | "wider" | "widest";
};

export type BorderProps = {
  borderWidth?: BorderWidthScale;
  borderRadius?: BorderRadiusScale;
};

export type ShadowProps = {
  boxShadow?: "sm" | "md" | "lg" | "xl" | "2xl" | "inner" | "none";
};

export type LayoutProps = {
  width?: SpaceScale | "full" | "screen";
  height?: SpaceScale | "full" | "screen";
};

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
  gap: "gap",
  spaceX: "space-x",
  spaceY: "space-y",
};

export const color: Record<keyof ColorProps, string> = {
  textColor: "text",
  backgroundColor: "bg",
  opacity: "opacity",
};

export const typography: Record<keyof TypographyProps, string> = {
  fontSize: "text",
  fontWeight: "font",
  textAlign: "text",
  lineHeight: "leading",
  letterSpacing: "tracking",
};

export const border: Record<keyof BorderProps, string> = {
  borderWidth: "border",
  borderRadius: "rounded",
};

export const shadow: Record<keyof ShadowProps, string> = {
  boxShadow: "shadow",
};

export const layout: Record<keyof LayoutProps, string> = {
  width: "w",
  height: "h",
};

function transformPropsToTailwind(
  props: Record<string, any>,
  mappings: Record<string, string>[]
): string {
  const classes: string[] = [];

  mappings.forEach((category) => {
    Object.entries(category).forEach(([key, prefix]) => {
      let value = props[key];

      if (value !== undefined) {
        // Normalize numeric values into strings
        if (typeof value === "number") {
          value = String(value);
        }
        classes.push(`${prefix}-${value}`);
      }
    });
  });

  return classes.join(" ");
}

export function composeTailwindComponent<T>(
  ...mappings: Record<string, string>[]
) {
  return ({
    className = "",
    children,
    ...props
  }: T & { className?: string; children?: React.ReactNode }) => {
    const tailwindClasses = transformPropsToTailwind(props, mappings);
    const finalClassName = `${tailwindClasses} ${className}`.trim();

    return <div className={finalClassName}>{children}</div>;
  };
}

const Box = composeTailwindComponent<
  SpaceProps & ColorProps & TypographyProps & BorderProps & ShadowProps
>(space, color, typography, border, shadow);

const Flex = composeTailwindComponent<SpaceProps & LayoutProps>(space, layout, {
  flexDirection: "flex",
});

const FooBox = (
  <Box
    m={1}
    p={4}
    textColor="blue-500"
    backgroundColor="gray-100"
    borderWidth={2}
    borderRadius="lg"
    fontSize="xl"
    boxShadow="md"
  >
    Hello, Tailwind Box!
  </Box>
);
