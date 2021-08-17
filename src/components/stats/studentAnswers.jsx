import React from 'react';
import { VStack, Text, Box } from '@chakra-ui/react';

const StudentAnswers = ({ questions, answers, student }) => {
  return (
    <VStack>
      {answers
        ? questions?.map((el, index) => (
            <Box key={index} paddingBottom={4} w="22rem">
              <Text color="gray.500" fontSize="xs">
                Pregunta {index}:
              </Text>
              <Text color="gray.500" fontSize="sm">
                {el.descriptor.title}
              </Text>
              <Box>
                <Text color="gray.700" fontSize="sm">
                  {answers[student]?.resource.paragraphs[index]}
                </Text>
              </Box>
            </Box>
          ))
        : null}
    </VStack>
  );
};

export { StudentAnswers };
