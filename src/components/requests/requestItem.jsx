import React, { useState, useEffect } from 'react';
import {
  Stack,
  Badge,
  Text,
  Heading,
  Box,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { CreateAreaBadge } from '../common/createAreaBadge';
import { ParagraphReducer } from '../common/paragraphReducer';

const RequestItem = ({ question }) => {
  console.log(question);
  const badge = CreateAreaBadge(question.workarea.publicId);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const requestDate = new Date(question.inserted.timestamp).toLocaleDateString(
    'es-Es',
    options
  );
  const articleTitle = question.contentHeader.descriptor.title;
  const request = question.contentHeader.descriptor.description;
  const worker = question.inserted.principal;
  return (
    <VStack
      width="50rem"
      bgColor="gray.50"
      borderRadius="lg"
      justifyContent="flex-start"
      alignItems="flex-start"
      direction="row"
      borderStyle="solid"
      borderWidth="1px"
      _hover={{ bg: 'gray.100' }}
    >
      return (
      <>
        <VStack
          direction="row"
          w="100%"
          justifyContent="flex-start"
          alignItems="flex-start"
          paddingX={6}
          marginX={2}
        >
          <HStack paddingTop={4}>
            <Box paddingRight={2}>
              <Heading
                as="h3"
                size="sm"
                marginLeft={0}
                lineHeight="0.7rem"
                color="gray.700"
                fontFamily="Open Sans"
              >
                {articleTitle}
              </Heading>
            </Box>
            <Badge paddingX={2} colorScheme={badge.color}>
              {badge.content}
            </Badge>
          </HStack>
          <HStack paddingBottom={1}>
            <Text color="gray.500" fontSize="xs">
              Publicado por{' '}
            </Text>
            <Text
              fontSize="xs"
              marginLeft="4px !important"
              fontFamily="Open Sans"
              fontWeight="700"
              color="primary"
            >
              {worker}
            </Text>
            <Text color="gray.500" fontSize="xs" marginLeft="4px !important">
              {' '}
              el {requestDate}
            </Text>
          </HStack>
          <Stack textAlign="left" paddingBottom={4}>
            <Text as="h5" fontSize="sm" fontWeight="400">
              {ParagraphReducer(request)}
            </Text>
          </Stack>
        </VStack>
      </>
      ); })}
    </VStack>
  );
};

export { RequestItem };
