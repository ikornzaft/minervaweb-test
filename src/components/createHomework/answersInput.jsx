import React, { useState } from 'react';
import { FormControl, FormLabel, HStack, VStack, Textarea, Box } from '@chakra-ui/react';
import { HiPlusCircle } from 'react-icons/hi';
import { darken } from '@chakra-ui/theme-tools';

import { AnswersList } from './answersList';

const AnswersInput = ({ answersArray, setAnswersArray, option, setOption }) => {
  const [actualAnswer, setActualAnswer] = useState('');

  const addAnswer = () => {
    if (actualAnswer !== '') {
      setAnswersArray([...answersArray, actualAnswer]);
      setActualAnswer('');
    }
  };

  console.log(answersArray);
  console.log(Array.isArray(answersArray));

  return (
    <VStack w="100%">
      <Box w="100%">
        <FormLabel fontFamily="Open Sans" fontSize="sm" htmlFor="answer" marginBottom="0">
          Agregar respuesta
        </FormLabel>
      </Box>
      <HStack w="100%">
        <Textarea
          fontSize="sm"
          id="answer"
          value={actualAnswer}
          onChange={(el) => setActualAnswer(el.target.value)}
        />
        <Box
          _hover={{ color: darken('primary', 10) }}
          as={HiPlusCircle}
          color="primary"
          h="50px"
          w="50px"
          onClick={addAnswer}
        />
      </HStack>
      {answersArray ? (
        <AnswersList
          answersArray={answersArray}
          option={option}
          setAnswersArray={setAnswersArray}
          setOption={setOption}
        />
      ) : null}
    </VStack>
  );
};

export { AnswersInput };
