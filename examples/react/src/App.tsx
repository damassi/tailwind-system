import "./App.css"

import { Box } from "@example/ui/Box"
import { Button } from "@example/ui/Button"
import { Flex } from "@example/ui/Flex"

export const App = () => {
  return (
    <>
      <title>Tailwind System Example 2</title>

      <Box p={4} backgroundColor="gray-100">
        <Flex>
          <Box mr={2}>Rsbuild with React</Box>
          <Box>And tailwind-system</Box>
        </Flex>
        <Flex flexDirection="col" mt={4}>
          <Button variant="small">Small button</Button>
          <Button variant="large">Large button</Button>
        </Flex>
      </Box>
    </>
  )
}
