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
        <VStack justifyContent="center" textAlign="center" p={12} w="100%">
          <Heading color="gray.700" fontSize="xx-large">
            ¡Perfecto!
          </Heading>
          <Heading color="gray.500" fontSize="xl">
            Todas las respuestas fueron correctas.
          </Heading>
        </VStack>
      );
    return (
      <VStack justifyContent="center" textAlign="center" p={12} w="100%">
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
      {isDone ? (
        <DisplayResult />
      ) : (
        <VStack w="100%" justifyContent="center">
          {paragraphs.map((paragraph, index) => (
            <QuizParagraph
              paragraph={paragraph}
              paragraphIndex={index}
              answersArray={answersArray}
              setAnswersArray={setAnswersArray}
            />
          ))}
        </VStack>
      )}
      <HStack w="100%" justifyContent="center" paddingY={4}>
        <Button
          w="14rem"
          variant="primary"
          onClick={isDone ? reset : checkAnswers}
        >
          {isDone ? 'Intentarlo nuevamente' : 'Comprobar respuestas'}
        </Button>
      </HStack>
    </Stack>
  );
};

export { QuizContent };
