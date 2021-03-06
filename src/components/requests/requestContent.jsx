import React from 'react';
import { VStack, HStack, Heading, Text, Divider, Box } from '@chakra-ui/react';

import { RequestReference } from './requestReference';
import { CommentsList } from './commentsList';
import { NewCommentInput } from './newCommentInput';

const RequestContent = ({ question, commentsNumber, setCommentsNumber, commentsArray }) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const requestDate = new Date(question.logs.inserted.timestamp).toLocaleDateString(
    'es-Es',
    options
  );
  const worker = question.resource.worker.publicId;
  const request = question.resource.paragraphs[0].descriptor.title;
  const questionId = question.header.publicId;
  const area = question.resource.workarea.publicId;

  return (
    <VStack>
      <VStack
        alignItems="flex-start"
        borderColor="gray.300"
        borderRadius="lg"
        borderWidth="1px"
        padding={6}
        w="43rem"
      >
        <Heading as="h1" fontSize="2xl">
          {question.resource.articleHeader.descriptor.title}
        </Heading>
        <HStack>
          <Text color="primary" fontFamily="Open Sans" fontSize="xs" fontWeight="700">
            {worker}
          </Text>
          <Text color="gray.500" fontSize="xs">
            - {question.logs.inserted.timestamp}
          </Text>
        </HStack>
        <Divider />
        <Box paddingY={2}>
          <Text color="gray.700" fontSize="sm">
            {request}
          </Text>
        </Box>
        {question.resource.paragraphs[0].content ? (
          <HStack bg="gray.100" borderRadius="lg" borderWidth="1px" w="100%">
            <RequestReference
              articleId={question.resource.paragraphs[0].content.link.location.articleId}
              articleParagraph={question.resource.articleHeader.descriptor.subtitle}
            />
          </HStack>
        ) : null}
      </VStack>
      <NewCommentInput
        area={area}
        commentsNumber={commentsNumber}
        questionId={questionId}
        setCommentsNumber={setCommentsNumber}
      />
      {commentsArray.length > 0 ? (
        <CommentsList commentsArray={commentsArray} />
      ) : (
        <Box paddingX={6} paddingY={2} w="100%">
          <Heading fontSize="md">No hay respuestas a??n.</Heading>
        </Box>
      )}
    </VStack>
  );
};

export { RequestContent };
