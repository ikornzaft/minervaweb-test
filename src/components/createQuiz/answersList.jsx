import React, { useState } from 'react';
import {
  Stack,
  HStack,
  Radio,
  RadioGroup,
  Text,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { FaRegTrashAlt } from 'react-icons/fa';

const AnswersList = ({ answersArray, setAnswersArray, option, setOption }) => {
  const selectRadio = (el) => {
    setOption(+el);
  };
  const deleteItem = (e) => {
    const linkToDeleteId = e.currentTarget.id;
    const filteredAnswers = answersArray.filter(
      (item) => item !== answersArray[linkToDeleteId]
    );
    setAnswersArray(filteredAnswers);
    console.log(filteredAnswers, option);
  };
  return (
    <Stack w="100%">
      <RadioGroup onChange={selectRadio} value={option}>
        {answersArray.map((answer, index) => {
          return (
            <HStack w="100%" paddingY={1}>
              <HStack
                bg="gray.100"
                w="100%"
                borderRadius="md"
                justifyContent="space-between"
                alignItems="center"
                paddingY={2}
                paddingX={4}
              >
                <HStack w={6} justifyContent="center">
                  <Radio borderColor="gray.300" colorScheme="blue" value={index}></Radio>
                </HStack>
                <HStack
                  w="100%"
                  justifyContent="flex-start"
                  textAlign="left"
                  paddingX={2}
                >
                  <Text fontSize="xs">{answer}</Text>
                </HStack>
                <HStack w={6} justifyContent="center">
                  <IconButton
                    aria-label="delete answer"
                    size="sm"
                    id={index}
                    icon={<FaRegTrashAlt />}
                    onClick={deleteItem}
                  />
                </HStack>
              </HStack>
            </HStack>
          );
        })}
      </RadioGroup>
    </Stack>
  );
};

export { AnswersList };
