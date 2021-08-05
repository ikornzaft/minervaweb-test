import React from 'react';
import { Box, HStack, VStack, Text, LinkBox, LinkOverlay, Heading } from '@chakra-ui/react';
import { VscFile } from 'react-icons/vsc';

import { ParagraphReducer } from '../../common/paragraphReducer';

const DisplayDocument = ({ linkLocation, title, subtitle }) => {
  const documentLink = `http://www.afatecha.com/id/files/document/${linkLocation}`;

  return (
    <VStack p={2} w="100%">
      <LinkBox _hover={{ bg: 'gray.50' }} w="100%">
        <LinkOverlay href={documentLink} isExternal="true" />
        <HStack borderRadius="lg" borderWidth="1px" h="100px" justifyContent="flex-start">
          <Box alignSelf="center" as={VscFile} color="gray.600" h="80px" p={2} w="80px" />
          <VStack alignItems="flex-start" justifyContent="center" w="90%">
            {title ? (
              <Heading as="h3" fontFamily="Open Sans" lineHeight="0.7rem" marginLeft={0} size="xs">
                {title}
              </Heading>
            ) : null}
            {subtitle ? (
              <Text as="h5" fontFamily="Open Sans" fontSize="xs" fontWeight="400">
                {ParagraphReducer(subtitle)}
              </Text>
            ) : null}
          </VStack>
        </HStack>
      </LinkBox>
    </VStack>
  );
};

export { DisplayDocument };
