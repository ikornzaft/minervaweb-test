import React, { useState, useEffect } from 'react';
import {
  Stack,
  ButtonGroup,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Input
} from '@chakra-ui/react';

const EditElementForm = ({
  paragraphList,
  setParagraphList,
  elementId,
  onCancel,
  forceRender,
  setForceRender,
  isImage,
}) => {
  const [currentValue, setCurrentValue] = useState(paragraphList[elementId]);
  useEffect(() => {
    setCurrentValue(paragraphList[elementId]);
  }, [paragraphList]);
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
          {isImage === 'true' ? (
            <Input
              id="elementInput"
              name="elementInput"
              type="file"
              onChange={(event) => {
                const file = event.target.files[0];
                if (file && file.type.substring(0, 5) === 'image') {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const readerResult = reader.result;
                    const result = {image: readerResult}
                    setCurrentValue(result);
                    
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          ) : (
            <Textarea
              id="elementInput"
              name="elementInput"
              type="text"
              value={currentValue}
              onChange={handleChange}
            />
          )}
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
