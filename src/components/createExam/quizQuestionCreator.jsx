import React, { useState } from 'react';
import {
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import { WrongAnswersList } from './wrongAnswersList';

const QuizQuestionCreator = ({ addNewQuestionToArray, onClose }) => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [rightAnswer, setRightAnswer] = useState('');
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [currentWrongAnswer, setCurrentWrongAnswer] = useState('');

  const addNewWrongAnswer = () => {
    setWrongAnswers([...wrongAnswers, currentWrongAnswer]);
    setCurrentWrongAnswer('');
  };

  const handleNewQuestion = () => {
    const answersArray = wrongAnswers.map((answer) => {
      return {
        descriptor: {
          title: answer,
        },
        answer: false,
      };
    });

    const rightAnswerObj = {
      descriptor: {
        title: rightAnswer,
      },
      answer: true,
    };

    answersArray.push(rightAnswerObj);

    addNewQuestionToArray(question, answersArray);
    setQuestion('');
    setRightAnswer('');
    setWrongAnswers([]);
    setCurrentWrongAnswer('');
    onClose();
  };

  return (
    <>
      <FormControl>
        <FormLabel>Nueva pregunta</FormLabel>
        <Textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <FormLabel>Respuesta correcta</FormLabel>
        <Input
          type="text"
          value={rightAnswer}
          onChange={(e) => setRightAnswer(e.target.value)}
        />
        <FormLabel>Opción incorrecta {wrongAnswers.length + 1}</FormLabel>
        <Input
          type="text"
          value={currentWrongAnswer}
          onChange={(e) => setCurrentWrongAnswer(e.target.value)}
        />
        <Button onClick={addNewWrongAnswer}>
          Ingresar nueva opción incorrecta
        </Button>
      </FormControl>
      <WrongAnswersList wrongAnswers={wrongAnswers} />

      <Button onClick={handleNewQuestion}>Crear pregunta</Button>
    </>
  );
};

export { QuizQuestionCreator };
