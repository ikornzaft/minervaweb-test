import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  const param = useParams();
  const [answersArray, setAnswersArray] = useState([]);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const examDate = new Date(date).toLocaleDateString('es-Es', options);
  const badge = CreateAreaBadge(workarea);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const toast = createStandaloneToast();

  let textAnswerArray = [];

  const handleChangeTextAnswer = (id, value) => {
    const prevArray = answersArray;

    prevArray[id] = value;
    setAnswersArray(prevArray);
  };

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const submitAnswers = () => {
    const url = 'http://afatecha.com:8080/minerva-server-web/minerva/perform';
    const credentials = localStorage.getItem('credentials');
    const jsonMessage = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        id: 'msgid-1',
        target: 'soa@service/minerva',
        method: 'mods/exams/handlers/InsertExamResponse',
        requester: 'root:YWNhY2lhITIwMTc=',
        principal: credentials,

        message: {
          resource: {
            paragraphs: answersArray,
            worker: { publicId: localStorage.getItem('userName') },
          },
          entityRef: { publicId: param.id },
        },
      }),
    };

    async function fetchData() {
      try {
        setIsLoading(true);
        console.log(answersArray);
        const res = await fetch(url, jsonMessage);

        if (res.status >= 400 && res.status < 600) setError('Bad response from server');
        const resJson = await res.json();

        if (resJson.error) {
          if (resJson.error.code === 707501) {
            toast({
              title: 'Este examen ya fue realizado',
              description: error,
              status: 'error',
              duration: 2500,
              isClosable: true,
            });
          }
        } else {
          toast({
            title: 'Respuestas enviadas.',
            status: 'success',
            duration: 2500,
            isClosable: true,
          });
        }
        console.log(resJson);
      } catch (err) {
        setError(err);
        toast({
          title: 'Se produjo un error al enviar las respuestas',
          description: error,
          status: 'error',
          duration: 2500,
          isClosable: true,
        });
      } finally {
        setAnswersArray([]);
        setIsLoading(false);
      }
    }
    fetchData();

    onClose(); // FALTARÍA MARCAR LA ACTIVIDAD COMO COMPLETADA
  };

  function AlertDialogExample(textAnswerArray) {
    const cancelRef = React.useRef();

    return (
      <HStack justifyContent="center" paddingY={4} w="100%">
        <Button variant="primary" w="12rem" onClick={handleOpenDialog}>
          Enviar respuestas
        </Button>

        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Enviar respuestas
              </AlertDialogHeader>

              <AlertDialogBody>Se enviarán las respuestas para su corrección.</AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancelar
                </Button>
                <Button colorScheme="blue" ml={3} onClick={submitAnswers}>
                  Enviar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </HStack>
    );
  }

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
            Publicado: {examDate}
          </Text>
        </Box>
        <Heading as="h1" fontSize="4xl">
          {title}
        </Heading>
        <Heading as="h4" fontWeight="100" lineHeight="1.5rem" size="sm">
          {subtitle}
        </Heading>
      </Stack>

      <VStack justifyContent="center" spacing="20px" w="100%">
        {paragraphs.map((paragraph, index) => (
          <ExamParagraph
            key={index}
            answersArray={answersArray}
            handleChangeTextAnswer={handleChangeTextAnswer}
            paragraph={paragraph}
            paragraphIndex={index}
            setAnswersArray={setAnswersArray}
          />
        ))}
      </VStack>
      <AlertDialogExample />
    </Stack>
  );
};

export { ExamContent };
