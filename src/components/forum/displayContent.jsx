import React from 'react';
import { Link } from 'react-router-dom';
import { VStack, HStack, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';

const DisplayContent = ({ paragraphs }) => {
  const DisplayItem = (item) => {
    if (item.article)
      return (
        <Link to={`/article/${item.article.entity.publicId}`}>
          <HStack
            borderWidth="1px"
            borderRadius="md"
            paddingY={2}
            paddingX={8}
            cursor="pointer"
            _hover={{ bg: 'gray.100' }}
          >
            <Text fontSize="xs">Ver artículo: </Text>
            <Text fontSize="xs" fontWeight="700">
              {item.descriptor.title}
            </Text>
          </HStack>
        </Link>
      );
    console.log(item);
    let resourceLink;
    if (item.content.link.locationType === 'absolute') {
      resourceLink = item.content.link.location;
      if (resourceLink.substring(0, 4) !== 'http')
        resourceLink = `http://${resourceLink}`;
      return (
        <LinkBox>
          <HStack
            borderWidth="1px"
            borderRadius="md"
            paddingY={2}
            paddingX={6}
            cursor="pointer"
            _hover={{ bg: 'gray.100' }}
          >
            <LinkOverlay href={resourceLink} isExternal="true" />
            <Text fontSize="xs">Link: </Text>
            <Text fontSize="xs" fontWeight="700">
              {item.descriptor.title}
            </Text>
          </HStack>
        </LinkBox>
      );
    }
    resourceLink = `http://www.afatecha.com/id/files/${item.content.link.type}/${item.content.link.location}`;
    console.log('aaah');
    return (
      <LinkBox>
        <HStack
          borderWidth="1px"
          borderRadius="md"
          paddingY={2}
          paddingX={6}
          cursor="pointer"
          _hover={{ bg: 'gray.100' }}
        >
          <LinkOverlay href={resourceLink} isExternal="true" />
          <Text fontSize="xs">Adjunto: </Text>
          <Text fontSize="xs" fontWeight="700">
            {item.descriptor.title}
          </Text>
        </HStack>
      </LinkBox>
    );
  };

  return (
    <VStack alignItems="flex-start">
      {paragraphs.map((item) => DisplayItem(item))}
    </VStack>
  );
};

export { DisplayContent };
