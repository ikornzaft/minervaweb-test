import React from 'react';
import { Stack, Box, Heading, Text } from '@chakra-ui/layout';

const SectionElement = ({title, subtitle, icon}) => {
  return (
    <>
    <Stack
    width="40rem"
    height="5.5rem"
    bgColor="white"
    borderRadius="lg"
    justifyContent="flex-start"
    alignItems="flex-start"
    direction="row"
    borderWidth="1px"
    maxHeight="100px"
    _hover={{ bg: 'gray.50' }}
  >
    <Box
      as={icon}
      alignSelf="center"
      w="80px"
      h="80px"
      p={2}
      color="gray.600"
    />

    <Stack width="100%" justifyContent="flex-start">
      <Stack
        width="100%"
        direction="row"
        alignItems="center"
        paddingX={4}
      >
        <Stack paddingTop={3} alignItems="flex-start" spacing="1">
          <Heading
            as="h3"
            size="xs"
            marginLeft={0}
            lineHeight="1.2rem"
            fontFamily="Open Sans"
          >
            {title}
          </Heading>
          <Box textAlign="left" marginTop="0" paddingLeft={0}>
            <Text
              as="h5"
              fontSize="xs"
              fontFamily="Open Sans"
              fontWeight="400"
            >
              {subtitle}
            </Text>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  </Stack>
    </>
  )
}

export {SectionElement}
