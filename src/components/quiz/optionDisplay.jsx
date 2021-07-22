import React from 'react'
import { HStack, Text} from '@chakra-ui/react'

const OptionDisplay = ({option, optionIndex}) => {
  return (
    <HStack p={4} bg="gray.100" w="35rem" h="5rem" borderRadius="lg">
      <Text>{option.descriptor.title}</Text>
    </HStack>
  )
}

export { OptionDisplay }
