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
import ReactPlayer from 'react-player/youtube';
import { ParagraphReducer } from '../../common/paragraphReducer';
import { VscLinkExternal } from 'react-icons/vsc';

const DisplayLink = ({ linkLocation, title, subtitle }) => {
  if (linkLocation.substring(0, 4) !== 'http') linkLocation = `http://${linkLocation}`;

  const isYoutubeLink = () => {
    const splittedLink = linkLocation.split('.');
    if (splittedLink[1] === 'youtube') return true;
    return false;
  };

  const youtubePlayer = () => (
    <VStack p={2} borderRadius="lg" borderWidth="1px">
      <ReactPlayer url={linkLocation} />
      <HStack justifyContent="center" textAlign="center" w="400px">
        <Box>
          {title ? (
            <Text fontSize="xs" fontWeight="700" color="gray.600">
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text fontSize="xs" color="gray.500">
              {subtitle}
            </Text>
          ) : null}
        </Box>
      </HStack>
    </VStack>
  );

  const otherLinks = () => (
    <VStack w="100%" p={6}>
      <LinkBox w="90%" _hover={{ bg: 'gray.50' }}>
        <LinkOverlay href={linkLocation} isExternal="true" />
        <HStack
          justifyContent="flex-start"
          h="100px"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Box
            as={VscLinkExternal}
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

  return <>{isYoutubeLink() ? youtubePlayer() : otherLinks()}</>;
};

export { DisplayLink };
