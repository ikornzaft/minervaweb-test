import React from 'react';
import { Link } from 'react-router-dom';
import { VStack, HStack, Text } from '@chakra-ui/react';

const DisplayContent = ({ paragraphs }) => {
  const DisplayItem = (item) => {
    if (item.article)
      return (
        <Link to={`/article/${item.article.entity.publicId}`}>
          <HStack
            bg="gray.100"
            borderWidth="1px"
            borderRadius="md"
            paddingY={2}
            paddingX={10}
            cursor="pointer"
            _hover={{ bg: 'gray.200' }}
          >
            <Text fontSize="sm">Ver artículo: </Text>
            <Text fontSize="sm" fontWeight="700">
              {item.descriptor.title}
            </Text>
          </HStack>
        </Link>
      );
    if (item.content.link.type === 'link') {
      console.log(item);
      return (
        <Link to="">
          <HStack
            bg="gray.100"
            borderWidth="1px"
            borderRadius="md"
            paddingY={2}
            paddingX={10}
            cursor="pointer"
            _hover={{ bg: 'gray.200' }}
          >
            <Text fontSize="sm">Link: </Text>
            <Text fontSize="sm" fontWeight="700">
              {item.descriptor.title}
            </Text>
          </HStack>
          <p>LINK</p>
        </Link>
      );
    }
  };

  return <VStack>{paragraphs.map((item) => DisplayItem(item))}</VStack>;
};

export { DisplayContent };
