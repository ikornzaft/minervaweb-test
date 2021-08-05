import React from 'react';
import { VStack, HStack, Heading, Text, Divider, Box } from '@chakra-ui/react';

import { DisplayKnowMore } from '../article/displayKnowMore';

import { CommentsList } from './commentsList';
import { NewCommentInput } from './newCommentInput';

const TopicContent = ({ topic, commentsNumber, setCommentsNumber, commentsArray }) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const requestDate = new Date(topic.logs.inserted.timestamp).toLocaleDateString('es-Es', options);
  const worker = topic.logs.inserted.principal;
  const message = topic.resource.articleHeader.descriptor.subtitle;
  const group = topic.resource.workgroup.publicId;
  const topicId = topic.header.publicId;

  return (
    <VStack>
      <VStack
        alignItems="flex-start"
        borderColor="gray.300"
        borderRadius="lg"
        borderWidth="1px"
        padding={6}
        w="45rem"
      >
        <Heading as="h1" fontSize="2xl">
          {topic.resource.articleHeader.descriptor.title}
        </Heading>
        <HStack>
          <Text color="primary" fontFamily="Open Sans" fontSize="xs" fontWeight="700">
            {worker}
          </Text>
          <Text color="gray.500" fontSize="xs">
            - {topic.logs.inserted.timestamp}
          </Text>
        </HStack>
        <Divider />
        <Box paddingY={2}>
          <Text color="gray.700" fontSize="sm">
            {message}
          </Text>
        </Box>
        {topic.resource.paragraphs.length > 0 ? (
          <VStack
            bg="gray.100"
            borderRadius="lg"
            borderWidth="1px"
            padding={2}
            paddingBottom={4}
            w="100%"
          >
            {' '}
            <DisplayKnowMore isTopic={false} sections={topic.resource.paragraphs} />{' '}
          </VStack>
        ) : null}
      </VStack>
      <NewCommentInput
        commentsNumber={commentsNumber}
        group={group}
        setCommentsNumber={setCommentsNumber}
        topicId={topicId}
      />
      {commentsArray.length > 0 ? (
        <CommentsList commentsArray={commentsArray} />
      ) : (
        <Box paddingX={6} paddingY={2} w="100%">
          <Heading fontSize="md">No hay respuestas aún.</Heading>
        </Box>
      )}
    </VStack>
  );
};

export { TopicContent };
