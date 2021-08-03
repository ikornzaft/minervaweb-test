import React, { useEffect, useState } from 'react';
import { Box, VStack, HStack, Text, Heading } from '@chakra-ui/react';

const CommentsList = ({ commentsArray }) => {
  const sortedArray = commentsArray.sort(
    (a, b) =>
      new Date(b.logs.inserted.timestamp) - new Date(a.logs.inserted.timestamp)
  );

  return (
    <Box w="100%">
      <Box paddingY={3} paddingX={6}>
        {commentsArray.length > 1 ? (
          <Heading fontSize="md">{commentsArray.length} respuestas</Heading>
        ) : (
          <Heading fontSize="md">1 respuesta</Heading>
        )}
      </Box>
      {commentsArray.map((comment, index) => (
        <VStack
          key={index}
          paddingY={3}
          paddingX={6}
          alignItems="flex-start"
          w="100%"
        >
          <HStack>
            <Text
              fontSize="xs"
              fontFamily="Open Sans"
              fontWeight="700"
              color="primary"
            >
              {comment.logs.inserted.principal}
            </Text>
            <Text color="gray.500" fontSize="xs">
              - {comment.logs.inserted.timestamp}
            </Text>
          </HStack>
          <Text marginTop="0 !important" color="gray.700" fontSize="sm">
            {comment.resource.articleHeader.descriptor.description}
          </Text>
        </VStack>
      ))}
    </Box>
  );
};

export { CommentsList };
