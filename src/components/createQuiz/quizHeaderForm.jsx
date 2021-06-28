import React from 'react';
import { Input, FormControl, FormLabel } from '@chakra-ui/react';

const QuizHeaderForm = ({ setNewQuizTitle }) => {
  return (
    <FormControl>
      <FormLabel>Título de la autoevaluación</FormLabel>
      <Input type="text" onChange={(e) => setNewQuizTitle(e.target.value)} />
    </FormControl>
  );
};

export { QuizHeaderForm };
