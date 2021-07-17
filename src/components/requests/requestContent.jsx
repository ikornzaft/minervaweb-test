import React from 'react';
import { VStack, HStack, Heading, Text, Divider, Box } from '@chakra-ui/react';
import { RequestReference } from './requestReference';
import { CommentsList } from './commentsList';
import { NewCommentInput } from './newCommentInput';

const RequestContent = ({
  question,
  commentsNumber,
  setCommentsNumber,
  commentsArray,
}) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const requestDate = new Date(
    question.logs.inserted.timestamp
  ).toLocaleDateString('es-Es', options);
  const worker = question.resource.worker.publicId;
  const request = question.resource.paragraphs[0].descriptor.title;
  const questionId = question.header.publicId;
  const area = question.resource.workarea.publicId;

  return (
    <VStack>
      <VStack
        padding={6}
        alignItems="flex-start"
        w="43rem"
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
              articleId={
                question.resource.paragraphs[0].content.link.location.articleId
              }
              articleParagraph={
                question.resource.articleHeader.descriptor.subtitle
              }
            />
          </HStack>
        ) : null}
      </VStack>
      {commentsArray.length > 0 ? <CommentsList commentsArray={commentsArray} /> : <Box w="100%" paddingY={2} paddingX={6}><Heading fontSize="md">No hay respuestas aún.</Heading></Box>}
      <NewCommentInput
        questionId={questionId}
        area={area}
        commentsNumber={commentsNumber}
        setCommentsNumber={setCommentsNumber}
      />
    </VStack>
  );
};

export { RequestContent };
