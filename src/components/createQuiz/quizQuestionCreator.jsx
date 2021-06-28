import React, { useState } from 'react';
import { Input, FormControl, FormLabel, Button } from '@chakra-ui/react';

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
  }

  const handleNewQuestion = (el) => {
    addNewQuestionToArray();
  }

  return (
    <>
    <FormControl>
      <FormLabel>Nueva pregunta</FormLabel>
      <Input type="text" onChange={e=>createQuestion(e.target.value)} />
      <FormLabel>Opción correcta</FormLabel>
      <Input type="text" onChange={e=>createRightAnswer(e.target.value)} />
      <FormLabel>Opción incorrecta</FormLabel>
      <Input type="text" onChange={e=>setCurrentWrongAnswer(e.target.value)} />
      <Button onClick={addNewWrongAnswer}>Ingresar nueva opción incorrecta</Button>
      </FormControl>

      <Button onClick={handleNewQuestion}>Crear pregunta</Button>
</>
  )
}

export { QuizQuestionCreator }
