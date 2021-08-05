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
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

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
          <HomeworkParagraph
            key={index}
            paragraph={paragraph}
            paragraphIndex={index}
            paragraphsLength={paragraphs.length}
            answersArray={answersArray}
            setAnswersArray={setAnswersArray}
            handleChangeTextAnswer={handleChangeTextAnswer}
          />
        ))}
      </VStack>
      <HStack justifyContent="center" w="100%" paddingY={3}>
        <Button
          w="11rem"
          variant="primary"
          isDisabled={sendedAnswer}
          onClick={fileUploaderHandler}
        >
          Enviar respuestas
        </Button>
      </HStack>
      <FilesUploadModal
        isOpen={isOpenFileUploader}
        onClose={onCloseFileUploader}
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
        setSendedAnswer={setSendedAnswer}
        title="Enviar respuestas"
      />
    </Stack>
  );
};

export { HomeworkContent };
