import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
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
} from '@chakra-ui/react';
import { QuizQuestionCreator } from './quizQuestionCreator';

const QuizQuestionsForm = ({
  newQuizQuestionsArray,
  setNewQuizQuestionsArray,
  isOpen,
  onClose,
  modalTitle,
}) => {
  const [question, setQuestion] = useState('');
  const addNewQuestionToArray = (question, answersArray) => {

    const newEntry = {
      descriptor: {
        title: question,
        subtitle: '',
      },
      content: {
        options: answersArray,
      }
    };

    setNewQuizQuestionsArray(newEntry);
  };

  return (

      <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={2} height="20rem">
          <ModalHeader
            alignSelf="center"
            color="gray.700"
            fontFamily="Poppins"
            fontWeight="300"
          >
            {modalTitle}
          </ModalHeader>
          <ModalBody textAlign="center" h="20rem">
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
              <FormControl
                h={20}
              >
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
                  onChange={el=>setQuestion(el.target.value)}
                />
              </FormControl>
            </TabPanel>

            <TabPanel></TabPanel>

            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
        <Box paddingTop={12}>
        <Button variant="primary" w="12rem" onClick={el=> console.log(question)} >Agregar pregunta</Button>
        </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

  );
};

export { QuizQuestionsForm };
