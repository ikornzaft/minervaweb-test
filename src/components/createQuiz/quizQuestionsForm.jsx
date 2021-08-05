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
  IconButton,
} from '@chakra-ui/react';

import { CoverImageInput } from '../draft/coverImageInput';

import { AnswersInput } from './answersInput';
import { QuizQuestionCreator } from './quizQuestionCreator';

const QuizQuestionsForm = ({
  quizQuestionsArray,
  changeQuestionsArray,
  isOpen,
  onClose,
  modalTitle,
  prevImage,
  prevQuestion,
  prevAnswers,
  truePrevAnswer,
  buttonText,
}) => {
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const [answersArray, setAnswersArray] = useState([]);
  const [option, setOption] = useState(0);

  useEffect(() => {
    setImage(prevImage);
    setQuestion(prevQuestion);
    if (prevAnswers) setAnswersArray(prevAnswers);
    setOption(truePrevAnswer);
  }, [prevImage, prevQuestion, prevAnswers, truePrevAnswer]);

  const addNewQuestionToArray = () => {
    if (question !== '') {
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

      if (image) {
        newEntry = {
          descriptor: {
            title: question,
            subtitle: '',
          },
          content: {
            options: newArray,
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
            subtitle: '',
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
                Pregunta
              </Tab>
              <Tab fontFamily="Open Sans" fontSize="sm" paddingY={1} width="12rem">
                Imágen
              </Tab>
              <Tab fontFamily="Open Sans" fontSize="sm" paddingY={1} width="12rem">
                Respuestas
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Box h="8rem">
                  <FormLabel fontFamily="Open Sans" fontSize="sm" htmlFor="question">
                    Pregunta
                  </FormLabel>
                  <Textarea
                    fontSize="sm"
                    h="6rem"
                    id="question"
                    value={question}
                    onChange={(el) => setQuestion(el.target.value)}
                  />
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
                <VStack>
                  <AnswersInput
                    answersArray={answersArray}
                    option={option}
                    setAnswersArray={setAnswersArray}
                    setOption={setOption}
                  />
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalCloseButton />
        <ModalFooter>
          <HStack justifyContent="center" w="100%">
            <Button variant="primary" w="12rem" onClick={addNewQuestionToArray}>
              {buttonText}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { QuizQuestionsForm };
