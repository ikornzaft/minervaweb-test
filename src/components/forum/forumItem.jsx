import React, { useState, useEffect } from 'react';
import { Stack, Text, Heading, Box, HStack, VStack } from '@chakra-ui/react';

import { ParagraphReducer } from '../common/paragraphReducer';

const ForumItem = ({ topic }) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const topicDate = new Date(topic.inserted.timestamp).toLocaleDateString('es-Es', options);
  const topicTitle = topic.contentHeader.descriptor.title;
  const topicMessage = topic.contentHeader.descriptor.subtitle;
  const worker = topic.inserted.principal;

  return (
    <VStack
      _hover={{ bg: 'gray.100' }}
      alignItems="flex-start"
      bgColor="gray.50"
      borderRadius="lg"
      borderStyle="solid"
      borderWidth="1px"
      direction="row"
      justifyContent="flex-start"
      width="50rem"
    >
      return (
      <>
        <VStack
          alignItems="flex-start"
          direction="row"
          justifyContent="flex-start"
          marginX={2}
          paddingX={6}
          w="100%"
        >
          <HStack paddingTop={4}>
            <Box paddingRight={2}>
              <Heading
                as="h3"
                color="gray.700"
                fontFamily="Open Sans"
                lineHeight="0.7rem"
                marginLeft={0}
                size="sm"
              >
                {topicTitle}
              </Heading>
            </Box>
          </HStack>
          <HStack paddingBottom={1}>
            <Text color="gray.500" fontSize="xs">
              Publicado por{' '}
            </Text>
            <Text
              color="primary"
              fontFamily="Open Sans"
              fontSize="xs"
              fontWeight="700"
              marginLeft="4px !important"
            >
              {worker}
            </Text>
            <Text color="gray.500" fontSize="xs" marginLeft="4px !important">
              {' '}
              el {topicDate}
            </Text>
          </HStack>
          <Stack paddingBottom={4} textAlign="left">
            <Text as="h5" fontSize="sm" fontWeight="400">
              {ParagraphReducer(topicMessage)}
            </Text>
          </Stack>
        </VStack>
      </>
      );
    </VStack>
  );
};

export { ForumItem };
