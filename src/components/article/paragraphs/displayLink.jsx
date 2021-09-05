import React from 'react';
import { Box, HStack, VStack, Text, LinkBox, LinkOverlay, Heading } from '@chakra-ui/react';
import ReactPlayer from 'react-player/youtube';
import { VscLinkExternal } from 'react-icons/vsc';

import { ParagraphReducer } from '../../common/paragraphReducer';

const DisplayLink = ({ linkLocation, title, subtitle }) => {
  if (linkLocation.substring(0, 4) !== 'http') linkLocation = `http://${linkLocation}`;

  const isYoutubeLink = () => {
    const splittedLink = linkLocation.split('.');

    if (splittedLink[1] === 'youtube' && splittedLink[2].includes('watch')) return true;

    return false;
  };

  const youtubePlayer = () => (
    <VStack borderRadius="lg" borderWidth="1px" p={2}>
      <ReactPlayer url={linkLocation} />
      <HStack justifyContent="center" textAlign="center" w="400px">
        <Box>
          {title ? (
            <Text color="gray.600" fontSize="xs" fontWeight="700">
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text color="gray.500" fontSize="xs">
              {subtitle}
            </Text>
          ) : null}
        </Box>
      </HStack>
    </VStack>
  );

  const otherLinks = () => (
    <VStack p={6} w="100%">
      <LinkBox _hover={{ bg: 'gray.50' }} w="90%">
        <LinkOverlay href={linkLocation} isExternal="true" />
        <HStack borderRadius="lg" borderWidth="1px" h="100px" justifyContent="flex-start">
          <Box alignSelf="center" as={VscLinkExternal} color="gray.600" h="80px" p={2} w="80px" />
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

  return <>{isYoutubeLink() ? youtubePlayer() : otherLinks()}</>;
};

export { DisplayLink };
