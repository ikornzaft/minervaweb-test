import React from 'react';
import { HStack, Text } from '@chakra-ui/react';

const WrongAnswersList = ({ wrongAnswers }) => {
  return (
    <div>
      {wrongAnswers.map((wrongAnswer, index) => {
        return (
          <HStack key={index}>
            <Text>
              Resuesta incorrecta {index + 1}: {wrongAnswer}
            </Text>
          </HStack>
        );
      })}
    </div>
  );
};

export { WrongAnswersList };
