import React, { useState } from 'react';
import {
  Stack,
  Heading,
  Text,
  Box,
  Badge,
  HStack,
  VStack,
  Button,
  createStandaloneToast,
} from '@chakra-ui/react';

import { CreateAreaBadge } from '../common/createAreaBadge';

import { QuizParagraph } from './quizParagraph';

const QuizContent = ({ title, subtitle, paragraphs, workarea, date }) => {
  const [answersArray, setAnswersArray] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [result, setResult] = useState('');
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const quizDate = new Date(date).toLocaleDateString('es-Es', options);
  const badge = CreateAreaBadge(workarea);

  const toast = createStandaloneToast();

  const checkAnswers = () => {
    if (answersArray.length !== paragraphs.length) {
      toast({
        title: '¡Debes responder todas las preguntas!',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
    } else {
      setIsDone(true);
    }
  };

  const DisplayResult = () => {
    const resultArray = answersArray.filter(
      (el) => paragraphs[el.id].content.options[el.value].answer === false
    );

    if (resultArray.length < 1)
      return (
        <VStack justifyContent="center" p={12} textAlign="center" w="100%">
          <Heading color="gray.700" fontSize="xx-large">
            ¡Perfecto!
          </Heading>
          <Heading color="gray.500" fontSize="xl">
            Todas las respuestas fueron correctas.
          </Heading>
        </VStack>
      );

    return (
      <VStack justifyContent="center" p={12} textAlign="center" w="100%">
        <Heading color="gray.700" fontSize="xx-large">
          Tu resultado:
        </Heading>
        <Heading color="gray.500" fontSize="xl">
          Respondiste correctamente {answersArray.length - resultArray.length} de{' '}
          {answersArray.length} preguntas.
        </Heading>
      </VStack>
    );
  };

  const reset = () => {
    setAnswersArray([]);
    setIsDone(false);
  };

  return (
    <Stack
      alignItems="flex-start"
      maxWidth="45rem"
      paddingBottom={6}
      paddingTop={localStorage.getItem('isEditor') === 'true' ? '20' : '12'}
      textAlign="left"
      w="45rem"
    >
      <Stack paddingBottom={2} textAlign="left">
        <Box paddingTop={2}>
          <Badge colorScheme={badge.color} paddingX={2}>
            {badge.content}
          </Badge>
        </Box>
        <Box paddingTop={1}>
          <Text color="gray.500" fontSize="xs">
            Publicado: {quizDate}
          </Text>
        </Box>
        <Heading as="h1" fontSize="4xl">
          {title}
        </Heading>
        <Heading as="h4" fontWeight="100" lineHeight="1.5rem" size="sm">
          {subtitle}
        </Heading>
      </Stack>
      {isDone ? (
        <DisplayResult />
      ) : (
        <VStack justifyContent="center" spacing="20px" w="100%">
          {paragraphs.map((paragraph, index) => (
            <QuizParagraph
              key={index}
              answersArray={answersArray}
              paragraph={paragraph}
              paragraphIndex={index}
              setAnswersArray={setAnswersArray}
            />
          ))}
        </VStack>
      )}
      <HStack justifyContent="center" paddingY={4} w="100%">
        <Button variant="primary" w="14rem" onClick={isDone ? reset : checkAnswers}>
          {isDone ? 'Intentarlo nuevamente' : 'Comprobar respuestas'}
        </Button>
      </HStack>
    </Stack>
  );
};

export { QuizContent };
