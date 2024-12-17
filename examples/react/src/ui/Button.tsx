import {
  createVariants,
  space,
  SpaceProps,
  TypographyProps,
  tailwindSystem,
  typography,
} from "@lib/tailwindSystem"

const buttonVariants = createVariants({
  small: {
    p: 1,
    textColor: "black",
    fontSize: "3",
    backgroundColor: "blue-500",
  },
  large: {
    p: 5,
    textColor: "black",
    fontSize: "5",
    backgroundColor: "gray-500",
  },
})

export const Button = tailwindSystem<
  SpaceProps & TypographyProps,
  typeof buttonVariants
>("button", [space, typography], buttonVariants)
