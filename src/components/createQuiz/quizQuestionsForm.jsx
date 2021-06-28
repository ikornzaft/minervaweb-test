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
  const [question, setQuestion] = useState('');
  const [rightAnswer, setRightAnswer] = useState('');
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const createQuestion = (e) => {
    setQuestion(e);
  };

  const createRightAnswer = (e) => {
    setRightAnswer(e);
  };

  const createWrongAnswers = (e) => {
    setWrongAnswers(e);
  };

  const addNewQuestionToArray = () => {
    const newEntry = {
      question: question,
      rightAnswer: rightAnswer,
      wrongAnswers: wrongAnswers,
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
              question={question}
              createQuestion={createQuestion}
              rightAnswer={rightAnswer}
              createRightAnswer={createRightAnswer}
              wrongAnswers={wrongAnswers}
              createWrongAnswers={createWrongAnswers}
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
