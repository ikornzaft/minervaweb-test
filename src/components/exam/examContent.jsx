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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { CreateAreaBadge } from '../common/createAreaBadge';
import { ExamParagraph } from './examParagraph';

const ExamContent = ({ title, subtitle, paragraphs, workarea, date }) => {
  const [answersArray, setAnswersArray] = useState([]);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const examDate = new Date(date).toLocaleDateString('es-Es', options);
  const badge = CreateAreaBadge(workarea);

  let textAnswerArray = [];
  const handleChangeTextAnswer = (id, value) => {
    textAnswerArray[id] = value;
    console.log(textAnswerArray);
  };

  const submitAnswers = () => {
    console.log('Enviando...');
  };

  function AlertDialogExample() {
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef()
    return (
      <HStack w="100%" justifyContent="center" paddingY={4}>
        <Button w="12rem" variant="primary" onClick={() => setIsOpen(true)}>
          Enviar respuestas
        </Button>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Enviar respuestas
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Se enviarán las respuestas para su corrección.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancelar
                </Button>
                <Button colorScheme="blue" onClick={onClose} ml={3}>
                  Enviar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </HStack>
    )
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
            Publicado: {examDate}
          </Text>
        </Box>
        <Heading as="h1" fontSize="4xl">
          {title}
        </Heading>
        <Heading as="h4" size="sm" fontWeight="100" lineHeight="1.5rem">
          {subtitle}
        </Heading>
      </Stack>

      <VStack w="100%" justifyContent="center" spacing="20px">
        {paragraphs.map((paragraph, index) => (
          <ExamParagraph
            paragraph={paragraph}
            paragraphIndex={index}
            answersArray={answersArray}
            setAnswersArray={setAnswersArray}
            handleChangeTextAnswer={handleChangeTextAnswer}
          />
        ))}
      </VStack>
      <AlertDialogExample />
    </Stack>
  );
};

export { ExamContent };
