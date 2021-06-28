import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  createStandaloneToast,
  FormLabel,
  FormControl,
  Button,
  Input,
  Text,
  Textarea,
  useDisclosure,
  VStack,
  Stack,
  HStack,
  Flex,
  Box,
} from '@chakra-ui/react';
import { AreaSelector } from './areaSelector';
import { QuizHeaderForm } from './quizHeaderForm';
import { QuizQuestionsForm } from './quizQuestionsForm';

const QuizForm = ({ isOpen, onClose, modalTitle }) => {
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [newQuizWorkarea, setNewQuizWorkarea] = useState(null);
  const [newQuizQuestionsArray, setNewQuizQuestionsArray] = useState([]);

  const changeWorkArea = (e) => {
    setNewQuizWorkarea(e);
  }
  const changeQuizTitle = (e) => {
    setNewQuizTitle(e);
  }

  const changeQuestionsArray = (e) => {
    setNewQuizQuestionsArray(e);
  }

  useEffect(() => {
    console.log(newQuizQuestionsArray)
  }, [newQuizQuestionsArray])


  return (
    <>
      <Modal isOpen={isOpen} size="6xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding={2}>
          <ModalHeader
            alignSelf="center"
            color="gray.700"
            fontFamily="Poppins"
            fontWeight="300"
          >
            {modalTitle}
          </ModalHeader>
          <ModalBody textAlign="center">
            <AreaSelector newQuizWorkarea={newQuizTitle} setNewQuizWorkarea={changeWorkArea} />
            <QuizHeaderForm newQuizTitle={newQuizTitle} setNewQuizTitle={changeQuizTitle} />
            <QuizQuestionsForm newQuizQuestionsArray={newQuizQuestionsArray} setNewQuizQuestionsArray={changeQuestionsArray} />
          </ModalBody>


          <ModalCloseButton />
        </ModalContent>
      </Modal>

    </>
  );
};

export { QuizForm }
