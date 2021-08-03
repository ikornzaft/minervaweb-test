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

const ExamQuestionsForm = ({
  examQuestionsArray,
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
  const [isChoice, setIsChoice] = useState(false);
  const [answersArray, setAnswersArray] = useState([]);
  const [option, setOption] = useState(0);

  useEffect(() => {
    setImage(prevImage);
    setQuestion(prevQuestion);
    if (prevAnswers) {
      setAnswersArray(prevAnswers);
      if (prevAnswers.length > 0) setIsChoice(true);
    }

    setOption(truePrevAnswer);
  }, [prevImage, prevQuestion, prevAnswers, truePrevAnswer]);

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

      isChoice ? (options = newArray) : (options = []);

      if (image) {
        newEntry = {
          descriptor: {
            title: question,
            subtitle: '',
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
        <ModalHeader
          alignSelf="center"
          color="gray.700"
          fontFamily="Poppins"
          fontWeight="300"
        >
          {modalTitle}
        </ModalHeader>
        <ModalBody textAlign="center">
          <Tabs>
            <TabList justifyContent="center">
              <Tab
                fontSize="sm"
                width="12rem"
                fontFamily="Open Sans"
                paddingY={1}
              >
                Pregunta
              </Tab>
              <Tab
                fontSize="sm"
                width="12rem"
                fontFamily="Open Sans"
                paddingY={1}
              >
                Imágen
              </Tab>
              <Tab
                fontSize="sm"
                width="12rem"
                fontFamily="Open Sans"
                paddingY={1}
                isDisabled={isChoice ? false : true}
              >
                Respuestas
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Box h="8rem">
                  <FormLabel fontFamily="Open Sans" htmlFor="question">
                    <Text fontSize="sm">Pregunta</Text>
                  </FormLabel>
                  <Textarea
                    fontSize="sm"
                    h="6rem"
                    id="question"
                    value={question}
                    onChange={(el) => setQuestion(el.target.value)}
                  />
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="is_choice" mb="0">
                      <Text fontSize="sm">¿Es múltiple choice?</Text>
                    </FormLabel>
                    <Switch
                      id="is_choice"
                      size="sm"
                      isChecked={isChoice ? true : false}
                      onChange={(el) => setIsChoice(!isChoice)}
                    />
                  </FormControl>
                </Box>
              </TabPanel>

              <TabPanel>
                <HStack w="100%" justifyContent="center">
                  <VStack
                    w="60%"
                    p={4}
                    bg="gray.50"
                    borderRadius="md"
                    borderStyle="solid"
                    borderWidth="1px"
                    marginBottom={4}
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
                    setAnswersArray={setAnswersArray}
                    option={option}
                    setOption={setOption}
                  />
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalCloseButton />
        <ModalFooter>
          <HStack w="100%" justifyContent="center">
            <Button variant="primary" w="12rem" onClick={addNewQuestionToArray}>
              {buttonText}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { ExamQuestionsForm };
