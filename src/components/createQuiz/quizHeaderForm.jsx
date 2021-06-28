import React from 'react';
import { Input, FormControl, FormLabel } from '@chakra-ui/react';

const QuizHeaderForm = ({ setNewQuizTitle }) => {
  return (
    <FormControl>
      <FormLabel paddingLeft={5} fontSize="14px">Título de la autoevaluación</FormLabel>
      <Input type="text" width="36rem" onChange={(e) => setNewQuizTitle(e.target.value)} />
    </FormControl>
  );
};

export { QuizHeaderForm };
