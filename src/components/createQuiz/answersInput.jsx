import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  HStack,
  VStack,
  Textarea,
  Box,
} from '@chakra-ui/react';
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

  return (
    <VStack w="100%">
      <Box w="100%">
        <FormLabel
          fontSize="sm"
          fontFamily="Open Sans"
          htmlFor="answer"
          marginBottom="0"
        >
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
          as={HiPlusCircle}
          h="50px"
          w="50px"
          color="primary"
          onClick={addAnswer}
          _hover={{ color: darken('primary', 10) }}
        />
      </HStack>
      <AnswersList
        answersArray={answersArray}
        setAnswersArray={setAnswersArray}
        option={option}
        setOption={setOption}
      />
    </VStack>
  );
};

export { AnswersInput };
