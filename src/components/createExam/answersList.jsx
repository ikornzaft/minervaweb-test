import React, { useState } from 'react';
import { Stack, HStack, Radio, RadioGroup, Text, Button, IconButton } from '@chakra-ui/react';
import { FaRegTrashAlt } from 'react-icons/fa';

const AnswersList = ({ answersArray, setAnswersArray, option, setOption }) => {
  const selectRadio = (el) => {
    setOption(+el);
  };
  const deleteItem = (e) => {
    const linkToDeleteId = e.currentTarget.id;
    const filteredAnswers = answersArray.filter((item) => item !== answersArray[linkToDeleteId]);

    setAnswersArray(filteredAnswers);
    console.log(filteredAnswers, option);
  };

  return (
    <Stack w="100%">
      <RadioGroup value={option} onChange={selectRadio}>
        {answersArray.map((answer, index) => {
          return (
            <HStack key={index} paddingY={1} w="100%">
              <HStack
                alignItems="center"
                bg="gray.100"
                borderRadius="md"
                justifyContent="space-between"
                paddingX={4}
                paddingY={2}
                w="100%"
              >
                <HStack justifyContent="center" w={6}>
                  <Radio borderColor="gray.300" colorScheme="blue" value={index} />
                </HStack>
                <HStack justifyContent="flex-start" paddingX={2} textAlign="left" w="100%">
                  <Text fontSize="xs">{answer}</Text>
                </HStack>
                <HStack justifyContent="center" w={6}>
                  <IconButton
                    aria-label="delete answer"
                    icon={<FaRegTrashAlt />}
                    id={index}
                    size="sm"
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
