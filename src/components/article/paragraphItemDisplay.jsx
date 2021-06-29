import React, { useState } from 'react';
import {
  Image,
  Heading,
  HStack,
  Text,
  VStack,
  Box,
  IconButton,
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
  console.log(item);
  if (item.content.type === 'image') {
    return (
      <VStack w="100%" p={6}>
        <Image
          boxSize="400px"
          objectFit="cover"
          borderStyle="solid"
          borderRadius="lg"
          borderWidth="1px"
          src={item.content.location}
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

  if (item.content.link.toLowerCase().split('.')[1] === 'youtube') {
    return (
      <VStack p={2} borderRadius="lg" borderWidth="1px">
        <ReactPlayer url={item.content.link} />
        <Heading
          as="h3"
          size="xs"
          marginLeft={0}
          lineHeight="0.7rem"
          fontFamily="Open Sans"
        >
          {item.descriptor.title}
        </Heading>
        {item.descriptor.subtitle ? <Text as="h5" fontSize="xs" fontFamily="Open Sans" fontWeight="400">
          {ParagraphReducer(item.descriptor.subtitle)}
        </Text> : null}
      </VStack>
    );
  }

  if (item.content.type === 'audio') {
    const src = `http://www.afatecha.com/id/files/audio/${item.content.location}`;

    const handleAudioButton = (el) => {
      console.log(item.content.location)
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
                  color="gray.600"
                />
              ) : (
                <Box
                  as={RiPlayCircleLine}
                  alignSelf="center"
                  w="80px"
                  h="80px"
                  p={2}
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
          <ReactPlayer url={src} playing={audioIsPlaying} width="1px" />
        </HStack>
      </VStack>
    );
  }

  let icon;
  if (item.content.type === 'document') {
    icon = VscFile;
  } else if (item.content.type === 'audio') {
    icon = FiSpeaker;
  } else if (item.content.type === 'video') {
    icon = RiVideoLine;
  } else if (item.content.type === 'link') {
    icon = VscLinkExternal;
  }
  return (
    <VStack w="100%" p={6}>
      <HStack
        justifyContent="flex-start"
        w="90%"
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
    </VStack>
  );
};

export { ParagraphItemDisplay };
