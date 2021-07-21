import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
}) => {
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const [answersArray, setAnswersArray] = useState([]);
  const [option, setOption] = useState(0);

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
      console.log(newEntry);
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
              >
                Respuestas
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Box h="8rem">
                  <FormLabel
                    fontSize="sm"
                    fontFamily="Open Sans"
                    htmlFor="question"
                  >
                    Pregunta
                  </FormLabel>
                  <Textarea
                    fontSize="sm"
                    h="6rem"
                    id="question"
                    onChange={(el) => setQuestion(el.target.value)}
                  />
                </Box>
              </TabPanel>

              <TabPanel>
                <Box paddingBottom={2}>
                  <Text fontSize="sm">Seleccionar imágen (opcional)</Text>
                </Box>
                <CoverImageInput
                  image={image}
                  setIsImage={setIsImage}
                  onImageChange={onImageChange}
                />
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
        <ModalFooter>
          <HStack w="100%" justifyContent="center">
            <Button variant="primary" w="12rem" onClick={addNewQuestionToArray}>
              Agregar pregunta
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { QuizQuestionsForm };
