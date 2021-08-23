import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Box,
  Text,
  HStack,
  VStack,
  Switch,
  IconButton,
} from '@chakra-ui/react';

import { CoverImageInput } from '../draft/coverImageInput';

import { AnswersInput } from './answersInput';

const HomeworkQuestionsForm = ({
  homeworkQuestionsArray,
  changeQuestionsArray,
  isOpen,
  onClose,
  modalTitle,
  prevImage,
  prevQuestion,
  prevAnswers,
  prevAllowsFiles,
  truePrevAnswer,
  buttonText,
}) => {
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const [isChoice, setIsChoice] = useState(false);
  const [allowsFiles, setAllowsFiles] = useState(false);
  const [answersArray, setAnswersArray] = useState([]);
  const [option, setOption] = useState(0);

  useEffect(() => {
    setImage(prevImage);
    setQuestion(prevQuestion);
    if (prevAnswers) {
      setAnswersArray(prevAnswers.map((el) => el.descriptor.title));
      if (prevAnswers.length > 0) setIsChoice(true);
    }
    if (prevAllowsFiles) setAllowsFiles(true);
    setOption(truePrevAnswer);
  }, [prevImage, prevQuestion, prevAnswers]);

  const addNewQuestionToArray = () => {
    if (question !== '') {
      let options;
      const newArray = answersArray.map((answer, index) => {
        let isTrue;

        index === option ? (isTrue = true) : (isTrue = false);
        const obj = {
          answer: isTrue,
          descriptor: {
            title: answer,
          },
        };

        return obj;
      });
      let newEntry;
      let allowsFileUpload;

      isChoice ? (options = newArray) : (options = []);
      allowsFiles ? (allowsFileUpload = 'files') : (allowsFileUpload = 'noFiles');

      if (image) {
        newEntry = {
          descriptor: {
            title: question,
            subtitle: allowsFileUpload,
          },
          content: {
            options: options,
            link: {
              locationType: 'relative',
              location: image.location,
              type: 'image',
            },
          },
        };
      } else {
        newEntry = {
          descriptor: {
            title: question,
            subtitle: allowsFileUpload,
          },
          content: {
            options: newArray,
          },
        };
      }
      changeQuestionsArray(newEntry);
      setQuestion('');
      setImage(null);
      setAnswersArray([]);
      setIsChoice(false);
      setOption(0);
      onClose();
    }
  };

  const onImageChange = (newImage) => {
    setImage(newImage);
  };

  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={2}>
        <ModalHeader alignSelf="center" color="gray.700" fontFamily="Poppins" fontWeight="300">
          {modalTitle}
        </ModalHeader>
        <ModalBody textAlign="center">
          <Tabs>
            <TabList justifyContent="center">
              <Tab fontFamily="Open Sans" fontSize="sm" paddingY={1} width="12rem">
                Consigna
              </Tab>
              <Tab fontFamily="Open Sans" fontSize="sm" paddingY={1} width="12rem">
                Imágen
              </Tab>
              <Tab
                fontFamily="Open Sans"
                fontSize="sm"
                isDisabled={isChoice ? false : true}
                paddingY={1}
                width="12rem"
              >
                Respuestas
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Box h="8rem">
                  <FormLabel fontFamily="Open Sans" htmlFor="question">
                    <Text fontSize="sm">Consigna</Text>
                  </FormLabel>
                  <Textarea
                    fontSize="sm"
                    h="6rem"
                    id="question"
                    value={question}
                    onChange={(el) => setQuestion(el.target.value)}
                  />
                  <FormControl alignItems="center" display="flex" paddingTop={2}>
                    <FormLabel htmlFor="is_choice" mb="0">
                      <Text fontSize="sm">¿Es múltiple choice?</Text>
                    </FormLabel>
                    <Switch
                      id="is_choice"
                      isChecked={isChoice ? true : false}
                      size="sm"
                      onChange={(el) => {
                        setIsChoice(!isChoice);
                        setAllowsFiles(false);
                        console.log(isChoice);
                      }}
                    />
                  </FormControl>
                  <FormControl alignItems="center" display="flex">
                    <FormLabel htmlFor="allows_file_upload" mb="0">
                      <Text fontSize="sm">¿Permite subir archivos como respuesta?</Text>
                    </FormLabel>
                    <Switch
                      id="allows_file_upload"
                      isChecked={allowsFiles ? true : false}
                      size="sm"
                      onChange={(el) => {
                        setAllowsFiles(!allowsFiles);
                        setIsChoice(false);
                      }}
                    />
                  </FormControl>
                </Box>
              </TabPanel>

              <TabPanel>
                <HStack justifyContent="center" w="100%">
                  <VStack
                    bg="gray.50"
                    borderRadius="md"
                    borderStyle="solid"
                    borderWidth="1px"
                    marginBottom={4}
                    p={4}
                    w="60%"
                  >
                    <Box paddingBottom={2}>
                      <Text fontSize="sm">Seleccionar imágen (opcional)</Text>
                    </Box>
                    <CoverImageInput
                      image={image}
                      setIsImage={setIsImage}
                      onImageChange={onImageChange}
                    />
                  </VStack>
                </HStack>
              </TabPanel>
              <TabPanel>
                {answersArray ? (
                  <VStack>
                    <AnswersInput
                      answersArray={answersArray}
                      option={option}
                      setAnswersArray={setAnswersArray}
                      setOption={setOption}
                    />
                  </VStack>
                ) : null}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalCloseButton />
        <ModalFooter>
          <HStack justifyContent="center" paddingTop={4} w="100%">
            <Button variant="primary" w="12rem" onClick={addNewQuestionToArray}>
              {buttonText}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { HomeworkQuestionsForm };
