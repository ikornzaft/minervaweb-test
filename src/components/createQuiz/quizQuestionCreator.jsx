import React, { useState } from 'react';
import { Input, FormControl, FormLabel, Button } from '@chakra-ui/react';
import { WrongAnswersList } from './wrongAnswersList';

const QuizQuestionCreator = ({
  question,
  createQuestion,
  rightAnswer,
  createRightAnswer,
  wrongAnswers,
  createWrongAnswers,
  addNewQuestionToArray
}) => {

  const [currentWrongAnswer, setCurrentWrongAnswer] = useState("");

  const addNewWrongAnswer = () => {
    createWrongAnswers([...wrongAnswers, currentWrongAnswer]);
    setCurrentWrongAnswer("");
  }

  const handleNewQuestion = (el) => {

    addNewQuestionToArray();
    createQuestion("");
    createRightAnswer("");
    createWrongAnswers([]);
    setCurrentWrongAnswer("");
  }

  return (
    <>
    <FormControl>
      <FormLabel>Nueva pregunta</FormLabel>
      <Input type="text" value={question} onChange={e=>createQuestion(e.target.value)} />
      <FormLabel>Opción correcta</FormLabel>
      <Input type="text" value={rightAnswer} onChange={e=>createRightAnswer(e.target.value)} />
      <FormLabel>Opción incorrecta {wrongAnswers.length + 1}</FormLabel>
      <Input type="text" value={currentWrongAnswer} onChange={e=>setCurrentWrongAnswer(e.target.value)} />
      <Button onClick={addNewWrongAnswer}>Ingresar nueva opción incorrecta</Button>
      </FormControl>
      <WrongAnswersList wrongAnswers={wrongAnswers} />

      <Button onClick={handleNewQuestion}>Crear pregunta</Button>
</>
  )
}

export { QuizQuestionCreator }
