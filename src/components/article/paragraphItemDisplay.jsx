import React, { useState } from 'react';
import {
  Image,
  Heading,
  HStack,
  Text,
  VStack,
  Box,
  IconButton,
  LinkOverlay,
  LinkBox
} from '@chakra-ui/react';
import ReactPlayer from 'react-player';
import { ParagraphReducer } from '../common/paragraphReducer';
import {
  RiVideoLine,
  RiPlayCircleLine,
  RiPauseCircleLine,
} from 'react-icons/ri';
import { VscFile, VscLinkExternal } from 'react-icons/vsc';
import { FiSpeaker } from 'react-icons/fi';

const ParagraphItemDisplay = ({ item }) => {
  const [audioIsPlaying, setAudioIsPlaying] = useState(false);
  if (item.content.link.type === 'image') {
    const imageLink = `http://www.afatecha.com/id/files/image/${item.content.link.location}`;
    return (
      <VStack w="100%" p={6}>
        <Image
          boxSize="400px"
          objectFit="cover"
          borderStyle="solid"
          borderRadius="lg"
          borderWidth="1px"
          src={imageLink}
        />
        <HStack justifyContent="center" w="400px">
          {item.descriptor.title ? (
            <Text fontSize="xs" color="gray.500">
              Imágen: {item.descriptor.title}
            </Text>
          ) : null}
        </HStack>
      </VStack>
    );
  }

  if (item.content.link.type === 'link') {
    const linkUrl = item.content.link.location;
    const splittedLink = linkUrl.split('.');
    if (splittedLink[1] === 'youtube') {
      return (
        <VStack p={2} borderRadius="lg" borderWidth="1px">
          <ReactPlayer url={item.content.link.location} />
        </VStack>
      );
    } 
  }

  if (item.content.link.type === 'audio') {
    const audioLink = `http://www.afatecha.com/id/files/audio/${item.content.link.location}`;

    const handleAudioButton = (el) => {
      setAudioIsPlaying(!audioIsPlaying);
    };
    return (
      <VStack w="100%" p={6}>
        <HStack
          justifyContent="flex-start"
          w="90%"
          h="100px"
          overflow="hidden"
          borderRadius="lg"
          borderWidth="1px"
          paddingX={2}
        >
          <IconButton
            w="80px"
            h="80px"
            aria-label="Play Audio"
            icon={
              audioIsPlaying ? (
                <Box
                  as={RiPauseCircleLine}
                  alignSelf="center"
                  w="80px"
                  h="80px"
                  p={2}
                  zIndex="1"
                  color="gray.600"
                />
              ) : (
                <Box
                  as={RiPlayCircleLine}
                  alignSelf="center"
                  w="80px"
                  h="80px"
                  p={2}
                  zIndex="1"
                  color="gray.600"
                />
              )
            }
            onClick={handleAudioButton}
          />
          <VStack w="90%" justifyContent="center">
            <Heading
              as="h3"
              size="sm"
              marginLeft={0}
              lineHeight="0.7rem"
              fontFamily="Open Sans"
            >
              {item.descriptor.title}
            </Heading>
            <Text as="h5" fontSize="sm" fontFamily="Open Sans" fontWeight="400">
              {ParagraphReducer(item.descriptor.subtitle)}
            </Text>
          </VStack>
          <ReactPlayer url={audioLink} playing={audioIsPlaying} width="1px" />
        </HStack>
      </VStack>
    );
  }

  let icon;
  if (item.content.link.type === 'document') {
    icon = VscFile;
  } else if (item.content.link.type === 'audio') {
    icon = FiSpeaker;
  } else if (item.content.link.type === 'video') {
    icon = RiVideoLine;
  } else if (item.content.link.type === 'link') {
    icon = VscLinkExternal;
  }
  return (
    <VStack w="100%" p={6}>
    <LinkBox w="90%">
    <LinkOverlay href={item.content.link.location} isExternal="true" />
      <HStack
        justifyContent="flex-start"
        
        h="100px"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Box
          as={icon}
          alignSelf="center"
          w="80px"
          h="80px"
          p={2}
          color="gray.600"
        />
        <VStack w="90%" justifyContent="center">
          <Heading
            as="h3"
            size="sm"
            marginLeft={0}
            lineHeight="0.7rem"
            fontFamily="Open Sans"
          >
            {item.descriptor.title}
          </Heading>
          <Text as="h5" fontSize="sm" fontFamily="Open Sans" fontWeight="400">
            {ParagraphReducer(item.descriptor.subtitle)}
          </Text>
        </VStack>
      </HStack>
      </LinkBox>
    </VStack>
  );
};

export { ParagraphItemDisplay };
