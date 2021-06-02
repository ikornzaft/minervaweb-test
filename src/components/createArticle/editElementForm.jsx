import React, { useState, useEffect } from 'react';
import {
  Stack,
  ButtonGroup,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

import { EditElementTextInput } from './editElementTextInput';

const EditElementForm = ({
  paragraphList,
  setParagraphList,
  elementId,
  onCancel,
  forceRender,
  setForceRender
}) => {

  const [currentValue, setCurrentValue] = useState(paragraphList[elementId]);
  useEffect(() => {
    setCurrentValue(paragraphList[elementId])  
  }, [paragraphList])
  const handleChange = (e) => {
    setCurrentValue(e.target.value);
  };

  const handleSubmit = (e) => {
    paragraphList[elementId] = currentValue;
    setForceRender(!forceRender);
    onCancel();
  };
  return (
    <Stack spacing={4}>
      <form method="GET" onSubmit={handleSubmit}>
      <FormControl>
          <FormLabel htmlFor="elementInput">Contenido</FormLabel>
          <Input
            id="elementInput"
            name="elementInput"
            type="text"
            value={currentValue}
            onChange={handleChange}
      />
      </FormControl>
        <ButtonGroup d="flex" justifyContent="flex-end">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Modificar
          </Button>
        </ButtonGroup>
      </form>
    </Stack>
  );
};

export { EditElementForm };
