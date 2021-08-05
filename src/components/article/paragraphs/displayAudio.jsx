import React from 'react';
import { VStack, Heading, Text } from '@chakra-ui/react';
import ReactPlayer from 'react-player/file';

import { ParagraphReducer } from '../../common/paragraphReducer';

const DisplayAudio = ({ linkLocation, title, subtitle }) => {
  const audioLink = `http://www.afatecha.com/id/files/audio/${linkLocation}`;

  return (
    <VStack p={2} w="100%">
      <VStack
        _hover={{ bg: 'gray.50' }}
        borderRadius="lg"
        borderWidth="1px"
        h="100px"
        justifyContent="flex-end"
        p={2}
        w="100%"
      >
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
        <ReactPlayer controls="true" height="30%" url={audioLink} width="90%" />
      </VStack>
    </VStack>
  );
};

export { DisplayAudio };
