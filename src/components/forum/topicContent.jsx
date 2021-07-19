import React from 'react';
import { VStack, HStack, Heading, Text, Divider, Box } from '@chakra-ui/react';
import { DisplayKnowMore } from '../article/displayKnowMore';
import { CommentsList } from './commentsList';
import { NewCommentInput } from './newCommentInput';

const TopicContent = ({
  topic,
  commentsNumber,
  setCommentsNumber,
  commentsArray,
}) => {
  console.log(topic)
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const requestDate = new Date(
    topic.logs.inserted.timestamp
  ).toLocaleDateString('es-Es', options);
  const worker = topic.logs.inserted.principal;
  const message = topic.resource.articleHeader.descriptor.subtitle;
  const topicId = topic.header.publicId;

  return (
    <VStack>
      <VStack
        padding={6}
        alignItems="flex-start"
        w="45rem"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="gray.300"
      >
        <Heading as="h1" fontSize="2xl">
          {topic.resource.articleHeader.descriptor.title}
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
          <VStack padding={2} paddingBottom={4} bg="gray.100" borderRadius="lg" borderWidth="1px" w="100%">
            {' '}
            <DisplayKnowMore
              sections={topic.resource.paragraphs}
              isTopic={true}
            />{' '}
          </VStack>
        ) : null}
      </VStack>
      <NewCommentInput
        topicId={topicId}
        commentsNumber={commentsNumber}
        setCommentsNumber={setCommentsNumber}
      />
      {commentsArray.length > 0 ? (
        <CommentsList commentsArray={commentsArray} />
      ) : (
        <Box w="100%" paddingY={2} paddingX={6}>
          <Heading fontSize="md">No hay respuestas aún.</Heading>
        </Box>
      )}
    </VStack>
  );
};

export { TopicContent };
