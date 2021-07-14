import React from 'react';
import { VStack, HStack, Heading, Text, Divider, Box } from '@chakra-ui/react';
import { RequestReference } from './requestReference';

const RequestContent = ({ question }) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const requestDate = new Date(
    question.logs.inserted.timestamp
  ).toLocaleDateString('es-Es', options);
  const worker = question.resource.worker.publicId;
  const request = question.resource.paragraphs[0].descriptor.title;

  return (
    <VStack
      padding={6}
      alignItems="flex-start"
      w="100%"
      borderRadius="lg"
      borderWidth="1px"
    >
      <Heading as="h1" fontSize="2xl">
        {question.resource.articleHeader.descriptor.title}
      </Heading>
      <HStack>
        <Text
          fontSize="xs"
          fontFamily="Open Sans"
          fontWeight="700"
          color="primary"
        >
          {worker}
        </Text>
        <Text color="gray.500" fontSize="xs">
          - {requestDate}
        </Text>
      </HStack>
      <Divider />
      <Box paddingY={2}>
        <Text color="gray.700" fontSize="sm">
          {request}
        </Text>
      </Box>
      {question.resource.paragraphs[0].content ? (
        <HStack
          bg="gray.100"
          borderRadius="lg"
          borderWidth="1px"
          w="100%"
        >
          <RequestReference
            articleId={
              question.resource.paragraphs[0].content.link.location.articleId
            }
            articleParagraph={question.resource.articleHeader.descriptor.subtitle}
          />
        </HStack>
      ) : null}
    </VStack>
  );
};

export { RequestContent };
