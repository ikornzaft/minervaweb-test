import React from 'react';
import {
  Stack,
  Image,
  Heading,
  Container,
  Text,
  Box,
  Badge,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { CreateAreaBadge } from '../common/createAreaBadge';
import { QuizParagraph } from './quizParagraph';

const QuizContent = ({ title, subtitle, paragraphs, workarea, date }) => {
  console.log(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const quizDate = new Date(date).toLocaleDateString('es-Es', options);
  const badge = CreateAreaBadge(workarea);

  return (
    <Stack
      maxWidth="45rem"
      w="45rem"
      paddingTop={localStorage.getItem('isEditor') === 'true' ? '20' : '12'}
      paddingBottom={6}
      alignItems="flex-start"
      textAlign="left"
    >
      <Stack textAlign="left" paddingBottom={2}>
      <Box paddingTop={2}>
                <Badge paddingX={2} colorScheme={badge.color}>
                  {badge.content}
                </Badge>
              </Box>
        <Box paddingTop={1}>
          <Text fontSize="xs" color="gray.500">
            Publicado: {quizDate}
          </Text>
        </Box>
        <Heading as="h1" fontSize="4xl">
          {title}
        </Heading>
        <Heading as="h4" size="sm" fontWeight="100" lineHeight="1.5rem">
          {subtitle}
        </Heading>
      </Stack>
      <VStack w="100%" justifyContent="center">
      {paragraphs.map((paragraph, index) => (
        <QuizParagraph paragraph={paragraph} paragraphIndex={index} />
      ))}
      </VStack>
    </Stack>
  );
};

export { QuizContent };
