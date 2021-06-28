import React from 'react';
import { VStack, Text } from '@chakra-ui/react';

const QuizQuestionsList = ({
  newQuizQuestionsArray,
  setNewQuizQuestionsArray,
}) => {
  console.log(newQuizQuestionsArray);
  return (
    <div>
      PREGUNTAS
      {newQuizQuestionsArray.map((question, index) => {
        console.log(question);
        return (
          <VStack bg="gray.200" marginBottom={2}>
            <Text>Pregunta {index + 1}: {question.question}</Text>
            <Text>Respuesta correcta: {question.rightAnswer}</Text>
            <Text>Respuestas inorrectas: {question.wrongAnswers.map((wrongAnswer, index) => (<Text>{index + 1}: {wrongAnswer}</Text>))}</Text>
          </VStack>
        );
      })}
    </div>
  );
};

export { QuizQuestionsList };
