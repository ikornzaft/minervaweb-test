import React from 'react';
import { useParams } from 'react-router-dom';
import { VStack, Text, Box } from '@chakra-ui/react';

import { DisplayContent } from '../forum/displayContent';

const StudentAnswers = ({ questions, answers, student }) => {
  const param = useParams();

  const DisplayAnswer = (index) => {
    if (answers[student]?.resource.paragraphs[index].files) {
      return (
        <Box paddingTop={4}>
          <DisplayContent paragraphs={answers[student]?.resource.paragraphs[index].files} />
        </Box>
      );
    } else {
      return (
        <Text color="gray.700" fontSize="sm">
          {answers[student]?.resource.paragraphs[index].descriptor.description}
        </Text>
      );
    }
  };

  return (
    <VStack>
      {answers
        ? questions?.map((el, index) => (
            <Box key={index} paddingBottom={4} w="22rem">
              <Text color="gray.500" fontSize="xs">
                Pregunta {index + 1}:
              </Text>
              <Text color="gray.500" fontSize="sm">
                {el.descriptor.title}
              </Text>
              <Box>
                {param.id.slice(0, 1) === 'H' ? (
                  DisplayAnswer(index)
                ) : (
                  <Text color="gray.700" fontSize="sm">
                    {answers[student]?.resource.paragraphs[index]}
                  </Text>
                )}
              </Box>
            </Box>
          ))
        : null}
    </VStack>
  );
};

export { StudentAnswers };
