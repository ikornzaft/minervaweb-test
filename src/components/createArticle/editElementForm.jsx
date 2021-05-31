import React from 'react';
import {
  Stack,
  ButtonGroup,
  Button,
  FormControl, 
  FormLabel,
  Input,
} from '@chakra-ui/react';

import { EditElementTextInput } from './editElementTextInput';

const EditElementForm = ({ firstFieldRef, onCancel, prevValue }) => {
  const handleSubmit = () => {
    console.log(prevValue);
  };
  return (
    <Stack spacing={4}>
    <FormControl>
      <FormLabel htmlFor="elementInput">Contenido</FormLabel>
      <Input ref={firstFieldRef} id="elementInput" value={prevValue} />
    </FormControl>
      <ButtonGroup d="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" colorScheme="teal" onSubmit={handleSubmit}>
          Modificar
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export { EditElementForm };
