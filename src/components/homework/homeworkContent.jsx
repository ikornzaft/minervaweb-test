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
  useDisclosure,
  createStandaloneToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';

import { CreateAreaBadge } from '../common/createAreaBadge';

import { HomeworkParagraph } from './homeworkParagraph';
import { FilesUploadModal } from './filesUploaderModal';

const HomeworkContent = ({ title, subtitle, paragraphs, workarea, date }) => {
  const param = useParams();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [answersArray, setAnswersArray] = useState([]);
  const [sendedAnswer, setSendedAnswer] = useState(false);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const examDate = new Date(date).toLocaleDateString('es-Es', options);
  const badge = CreateAreaBadge(workarea);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const toast = createStandaloneToast();

  const {
    isOpen: isOpenFileUploader,
    onOpen: onOpenFileUploader,
    onClose: onCloseFileUploader,
  } = useDisclosure();

  let textAnswerArray = [];

  const fileUploaderHandler = (e) => {
    onCloseFileUploader();
    onOpenFileUploader();
  };

  const handleAnswerSubmit = () => {
    console.log(answersArray);
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
        method: 'mods/homeworks/handlers/InsertHomeworkResponse',
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
        const res = await fetch(url, jsonMessage);

        if (res.status >= 400 && res.status < 600) setError('Bad response from server');
        const resJson = await res.json();

        console.log(resJson);
        if (resJson.error) {
          if (resJson.error.code === 707501) {
            toast({
              title: 'Esta tarea ya fue realizada',
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
          setSendedAnswer(true);
        }
      } catch (err) {
        setError(err);
        toast({
          title: 'Se produjo un error al enviar las respuesta',
          description: error,
          status: 'error',
          duration: 2500,
          isClosable: true,
        });
      } finally {
        setUploadedFiles([]);
        setIsLoading(false);
      }
    }
    fetchData();
  };

  const handleChangeTextAnswer = (id, value) => {
    const prevArray = answersArray;

    if (prevArray[id] && prevArray[id].files) {
      const prevArrayFiles = prevArray[id].files;

      prevArray[id] = {
        descriptor: {
          description: value,
        },
        files: prevArrayFiles,
      };
    } else {
      prevArray[id] = {
        descriptor: {
          description: value,
        },
      };
    }
    setAnswersArray(prevArray);
  };

  const handleChangeFilesContent = (id, value) => {
    const prevArray = answersArray;

    const prevArrayDescriptor = prevArray[id].descriptor;

    prevArray[id] = {
      descriptor: prevArrayDescriptor,
      files: value,
    };
    setAnswersArray(prevArray);
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
          <HomeworkParagraph
            key={index}
            answersArray={answersArray}
            handleChangeFilesContent={handleChangeFilesContent}
            handleChangeTextAnswer={handleChangeTextAnswer}
            paragraph={paragraph}
            paragraphIndex={index}
            paragraphsLength={paragraphs.length}
            setAnswersArray={setAnswersArray}
            setSendedAnswer={setSendedAnswer}
            setUploadedFiles={setUploadedFiles}
            uploadedFiles={uploadedFiles}
          />
        ))}
      </VStack>
      <HStack justifyContent="center" paddingY={3} w="100%">
        <Button isDisabled={sendedAnswer} variant="primary" w="11rem" onClick={handleAnswerSubmit}>
          Enviar respuestas
        </Button>
      </HStack>
      <FilesUploadModal
        handleChangeFilesContent={handleChangeFilesContent}
        isOpen={isOpenFileUploader}
        setSendedAnswer={setSendedAnswer}
        setUploadedFiles={setUploadedFiles}
        title="Enviar respuestas"
        uploadedFiles={uploadedFiles}
        onClose={onCloseFileUploader}
      />
    </Stack>
  );
};

export { HomeworkContent };
