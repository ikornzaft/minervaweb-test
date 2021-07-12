import React from 'react';
import { VStack, Heading, Text } from '@chakra-ui/react';
import ReactPlayer from 'react-player/file';
import { ParagraphReducer } from '../../common/paragraphReducer';

const DisplayAudio = ({ linkLocation, title, subtitle }) => {
  const audioLink = `http://www.afatecha.com/id/files/audio/${linkLocation}`;
  return (
    <VStack w="100%" p={2}>
      <VStack
        justifyContent="flex-end"
        w="100%"
        p={2}
        h="100px"
        borderRadius="lg"
        borderWidth="1px"
        _hover={{ bg: 'gray.50' }}
      >
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
        <ReactPlayer url={audioLink} controls="true" height="30%" width="90%" />
      </VStack>
    </VStack>
  );
};

export { DisplayAudio };
