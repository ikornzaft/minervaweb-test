import React from 'react';
import { VStack, Text, Box } from '@chakra-ui/react';

const StudentAnswers = ({ questions, answers, student }) => {
  console.log(answers[student]);
  console.log(questions);

  return (
    <VStack>
      {questions?.map((el, index) => (
        <Box key={index} w="25rem">
          <Text>{el.descriptor.title}</Text>
          <Box bg="white" borderColor="gray.300" borderRadius="lg" borderWidth="1px" p={4}>
            <Text>{answers[student]?.resource.paragraphs[index]}</Text>
          </Box>
        </Box>
      ))}
    </VStack>
  );
};

export { StudentAnswers };
