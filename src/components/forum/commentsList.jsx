import React, { useEffect, useState } from 'react';
import { Box, VStack, HStack, Text, Heading } from '@chakra-ui/react';

import { DisplayContent } from './displayContent';

const CommentsList = ({ commentsArray }) => {
  const sortedArray = commentsArray.sort(
    (a, b) => new Date(b.logs.inserted.timestamp) - new Date(a.logs.inserted.timestamp)
  );

  console.log(sortedArray);

  return (
    <Box w="100%">
      <Box paddingX={6} paddingY={3}>
        {commentsArray.length > 1 ? (
          <Heading fontSize="md">{commentsArray.length} respuestas</Heading>
        ) : (
          <Heading fontSize="md">1 respuesta</Heading>
        )}
      </Box>
      {commentsArray.map((comment, index) => (
        <VStack key={index} alignItems="flex-start" paddingX={6} paddingY={3} w="100%">
          <HStack>
            <Text color="primary" fontFamily="Open Sans" fontSize="xs" fontWeight="700">
              {comment.logs.inserted.principal}
            </Text>
            <Text color="gray.500" fontSize="xs">
              - {comment.logs.inserted.timestamp}
            </Text>
          </HStack>
          <Text color="gray.700" fontSize="sm" marginTop="0 !important">
            {comment.resource.articleHeader.descriptor.description}
          </Text>

          <DisplayContent paragraphs={comment.resource.paragraphs} />
        </VStack>
      ))}
    </Box>
  );
};

export { CommentsList };
