import React from 'react';
import {
  Box,
  HStack,
  VStack,
  Text,
  LinkBox,
  LinkOverlay,
  Heading,
} from '@chakra-ui/react';
import { ParagraphReducer } from '../../common/paragraphReducer';
import { VscFile } from 'react-icons/vsc';

const DisplayDocument = ({ linkLocation, title, subtitle }) => {
  const documentLink = `http://www.afatecha.com/id/files/document/${linkLocation}`;

  return (
    <VStack w="100%" p={2}>
      <LinkBox w="100%" _hover={{ bg: 'gray.50' }}>
        <LinkOverlay href={documentLink} isExternal="true" />
        <HStack
          justifyContent="flex-start"
          h="100px"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Box
            as={VscFile}
            alignSelf="center"
            w="80px"
            h="80px"
            p={2}
            color="gray.600"
          />
          <VStack w="90%" justifyContent="center" alignItems="flex-start">
            {title ? (
              <Heading
                as="h3"
                size="xs"
                marginLeft={0}
                lineHeight="0.7rem"
                fontFamily="Open Sans"
              >
                {title}
              </Heading>
            ) : null}
            {subtitle ? (
              <Text
                as="h5"
                fontSize="xs"
                fontFamily="Open Sans"
                fontWeight="400"
              >
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
