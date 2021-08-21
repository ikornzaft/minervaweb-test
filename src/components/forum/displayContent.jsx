import React from 'react';
import { Link } from 'react-router-dom';
import { VStack, HStack, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';

const DisplayContent = ({ paragraphs }) => {
  const DisplayItem = (item) => {
    if (item.article)
      return (
        <Link to={`/article/${item.article.entity.publicId}`}>
          <HStack
            _hover={{ bg: 'gray.100' }}
            borderRadius="md"
            borderWidth="1px"
            cursor="pointer"
            paddingX={8}
            paddingY={2}
          >
            <Text fontSize="xs">Ver artículo: </Text>
            <Text fontSize="xs" fontWeight="700">
              {item.descriptor.title}
            </Text>
          </HStack>
        </Link>
      );
    let resourceLink;

    if (item.content) {
      if (item?.content?.link?.locationType === 'absolute') {
        resourceLink = item.content.link.location;
        if (resourceLink.substring(0, 4) !== 'http') resourceLink = `http://${resourceLink}`;

        return (
          <LinkBox>
            <HStack
              _hover={{ bg: 'gray.100' }}
              borderRadius="md"
              borderWidth="1px"
              cursor="pointer"
              paddingX={6}
              paddingY={2}
            >
              <LinkOverlay href={resourceLink} isExternal="true" />
              <Text fontSize="xs">Link: </Text>
              <Text fontSize="xs" fontWeight="700">
                {item.descriptor.title}
              </Text>
            </HStack>
          </LinkBox>
        );
      } else {
        resourceLink = `http://www.afatecha.com/id/files/${item.content.link.type}/${item.content.link.location}`;

        return (
          <LinkBox>
            <HStack
              _hover={{ bg: 'gray.100' }}
              borderRadius="md"
              borderWidth="1px"
              cursor="pointer"
              paddingX={6}
              paddingY={2}
            >
              {item.content || item.article ? (
                <LinkOverlay href={resourceLink} isExternal="true" />
              ) : null}
              <Text fontSize="xs">Adjunto: </Text>
              <Text fontSize="xs" fontWeight="700">
                {item.descriptor.title ? item.descriptor.title : item.descriptor.subtitle}
              </Text>
            </HStack>
          </LinkBox>
        );
      }
    }
  };

  return <VStack alignItems="flex-start">{paragraphs.map((item) => DisplayItem(item))}</VStack>;
};

export { DisplayContent };
