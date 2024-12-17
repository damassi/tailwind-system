import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import {
  tailwindSystem,
  createVariants,
  space,
  color,
  border,
  typography,
  shadow,
  layout,
  SpaceProps,
  ColorProps,
  TypographyProps,
  BorderProps,
  ShadowProps,
  LayoutProps,
} from "./tailwindSystem"

// Sample variants
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

describe("tailwindSystem", () => {
  test("renders component with basic props", () => {
    const { container } = render(<Button p="4" m="2" />)
    expect(container.firstChild).toHaveClass("p-4 m-2")
  })

  test("renders responsive props", () => {
    const { container } = render(<Button p={[1, 2]} m={[2, 4]} />)
    expect(container.firstChild).toHaveClass("sm:p-1 md:p-2 sm:m-2 md:m-4")
  })

  test("pads responsive props with the last value", () => {
    const { container } = render(<Button p={[1, 2]} />)
    expect(container.firstChild).toHaveClass(
      "sm:p-1 md:p-2 lg:p-2 xl:p-2 2xl:p-2",
    )
  })

  test("applies variant classes correctly", () => {
    const { container } = render(<Button variant="foo" />)
    expect(container.firstChild).toHaveClass(
      "sm:p-2 md:p-4 text-white bg-blue-500",
    )
  })

  test("applies variant and utility props together", () => {
    const { container } = render(<Button variant="bar" p="8" />)
    expect(container.firstChild).toHaveClass(
      "sm:m-1 md:m-2 text-black bg-gray-500 p-8",
    )
  })

  test("handles unknown variants gracefully", () => {
    const { container } = render(<Button variant={"unknown" as any} />)
    expect(container.firstChild).not.toHaveClass()
  })

  test("handles className overrides", () => {
    const { container } = render(<Button className="custom-class" />)
    expect(container.firstChild).toHaveClass("custom-class")
  })

  test("renders children correctly", () => {
    const { getByText } = render(<Button>Hello World</Button>)
    expect(getByText("Hello World")).toBeInTheDocument()
  })
})
