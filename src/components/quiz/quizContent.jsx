import React, {useState } from 'react';
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
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { CreateAreaBadge } from '../common/createAreaBadge';
import { QuizParagraph } from './quizParagraph';

const QuizContent = ({ title, subtitle, paragraphs, workarea, date }) => {
  console.log(date);
  const [answersArray, setAnswersArray] = useState([]);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const quizDate = new Date(date).toLocaleDateString('es-Es', options);
  const badge = CreateAreaBadge(workarea);

  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)

  const CheckAnswers = () => {
    console.log(paragraphs)
    console.log(answersArray)
    const resultArray = answersArray.filter(el => paragraphs[el.id].content.options[el.value].answer === false);
    console.log(resultArray)
    if (answersArray.length !== paragraphs.length) return <Text>¡Debes responder todas las preguntas!</Text>
    if (resultArray.length < 1) return <Text>¡Perfecto! Todas las respuestas fueron correctas.</Text>;
    return <Text>Respondiste correctamente {answersArray.length - resultArray.length} de {answersArray.length} preguntas</Text>
  }

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
        <QuizParagraph paragraph={paragraph} paragraphIndex={index} answersArray={answersArray} setAnswersArray={setAnswersArray} />
      ))}
      </VStack>
      <HStack w="100%" justifyContent="center" paddingY={4}>
      <Button w="14rem" variant="primary" onClick={() => setIsOpen(true)}>
        Comprobar respuestas
      </Button>
      </HStack>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Tu resultado:
            </AlertDialogHeader>

            <AlertDialogBody>
            <HStack w="100%" justifyContent="center">
              {CheckAnswers()}
              </HStack>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>
                Cerrar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Stack>
  );
};

export { QuizContent };