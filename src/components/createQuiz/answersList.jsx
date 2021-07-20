import React, { useState } from 'react';
import { Stack, HStack, Radio, RadioGroup, Text, Box } from '@chakra-ui/react';

const AnswersList = ({ answersArray, setAnswersArray }) => {
  const [option, setOption] = useState(1);
  const selectRadio = (el) => {
    setOption(+el);
  };
  return (
    <Stack h="10rem" w="100%">
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
                p={2}
              >
                <HStack w={4} justifyContent="center">
                  <Radio colorScheme="blue" value={index}></Radio>
                </HStack>
                <HStack w="100%" justifyContent="flex-start" paddingX={2}>
                <Text fontSize="xs">
                  {answer} {index}
                </Text>
                </HStack>
                <HStack w={4} justifyContent="center">
                  <p>X</p>
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
