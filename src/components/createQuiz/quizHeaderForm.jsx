import React from 'react';
import { Input, FormControl, FormLabel } from '@chakra-ui/react';

const QuizHeaderForm = ({ setNewQuizTitle }) => {
  return (
    <FormControl>
      <FormLabel fontSize="14px" paddingLeft={5}>
        Título de la autoevaluación
      </FormLabel>
      <Input type="text" width="36rem" onChange={(e) => setNewQuizTitle(e.target.value)} />
    </FormControl>
  );
};

export { QuizHeaderForm };
