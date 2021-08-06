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

  const handleChangeTextAnswer = (id, value) => {
    const prevArray = answersArray;

    prevArray[id] = value;
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
        <Button isDisabled={sendedAnswer} variant="primary" w="11rem" onClick={fileUploaderHandler}>
          Subir archivo
        </Button>
      </HStack>
      <FilesUploadModal
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
