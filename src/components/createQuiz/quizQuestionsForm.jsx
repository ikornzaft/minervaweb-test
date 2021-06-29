import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/react';
import { QuizQuestionCreator } from './quizQuestionCreator';

const QuizQuestionsForm = ({
  newQuizQuestionsArray,
  setNewQuizQuestionsArray,
  isOpen,
  onClose,
  modalTitle,
}) => {

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
    <>
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
            <QuizQuestionCreator
              addNewQuestionToArray={addNewQuestionToArray}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export { QuizQuestionsForm };
