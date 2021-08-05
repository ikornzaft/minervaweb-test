import React from 'react';
import { Stack, Box, Heading, Text } from '@chakra-ui/layout';

const SectionElement = ({ title, subtitle, icon }) => {
  return (
    <>
      <Stack
        _hover={{ bg: 'gray.50' }}
        alignItems="flex-start"
        bgColor="white"
        borderRadius="lg"
        borderWidth="1px"
        direction="row"
        height="5.5rem"
        justifyContent="flex-start"
        maxHeight="100px"
        width="40rem"
      >
        <Box alignSelf="center" as={icon} color="gray.600" h="80px" p={2} w="80px" />

        <Stack justifyContent="flex-start" width="100%">
          <Stack alignItems="center" direction="row" paddingX={4} width="100%">
            <Stack alignItems="flex-start" paddingTop={3} spacing="1">
              <Heading as="h3" fontFamily="Open Sans" lineHeight="1.2rem" marginLeft={0} size="xs">
                {title}
              </Heading>
              <Box marginTop="0" paddingLeft={0} textAlign="left">
                <Text as="h5" fontFamily="Open Sans" fontSize="xs" fontWeight="400">
                  {subtitle}
                </Text>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export { SectionElement };
