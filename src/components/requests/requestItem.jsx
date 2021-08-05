import React, { useState, useEffect } from 'react';
import { Stack, Badge, Text, Heading, Box, HStack, VStack } from '@chakra-ui/react';

import { CreateAreaBadge } from '../common/createAreaBadge';
import { ParagraphReducer } from '../common/paragraphReducer';

const RequestItem = ({ question }) => {
  const badge = CreateAreaBadge(question.workarea.publicId);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const requestDate = new Date(question.inserted.timestamp).toLocaleDateString('es-Es', options);
  const articleTitle = question.contentHeader.descriptor.title;
  const request = question.contentHeader.descriptor.description;
  const worker = question.inserted.principal;

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
                {articleTitle}
              </Heading>
            </Box>
            <Badge colorScheme={badge.color} paddingX={2}>
              {badge.content}
            </Badge>
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
              el {requestDate}
            </Text>
          </HStack>
          <Stack paddingBottom={4} textAlign="left">
            <Text as="h5" fontSize="sm" fontWeight="400">
              {ParagraphReducer(request)}
            </Text>
          </Stack>
        </VStack>
      </>
      );
    </VStack>
  );
};

export { RequestItem };
