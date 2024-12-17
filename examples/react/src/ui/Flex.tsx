import { boxMixins, BoxProps } from "@example/ui/Box"
import {
  flex,
  FlexProps as BaseFlexProps,
  tailwindSystem,
} from "@lib/tailwindSystem"

type FlexProps = BoxProps & BaseFlexProps

const BaseFlex = tailwindSystem<FlexProps>([...boxMixins, flex])

export const Flex: React.FC<React.PropsWithChildren<FlexProps>> = (props) => {
  return <BaseFlex display="flex" {...props} />
}
