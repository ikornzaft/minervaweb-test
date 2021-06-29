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
          <VStack key={index} bg="gray.200" marginBottom={2}>
            <Text>Pregunta {index + 1}: {question.descriptor.title}</Text>
          </VStack>
        );
      })}
    </div>
  );
};

export { QuizQuestionsList };
