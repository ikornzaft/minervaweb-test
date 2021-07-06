import React from 'react'
import {HStack} from '@chakra-ui/react'

const DraftMenu = () => {
  return (
    <HStack
          h="82px"
          borderBottomWidth="1px"
          borderBottomColor="gray.300"
          w="100vw"
          bg="gray.50"
          position="fixed"
        ></HStack>
  )
}

export {DraftMenu}
