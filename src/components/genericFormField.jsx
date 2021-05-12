import React from 'react';
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
} from '@chakra-ui/react';

const GenericFormField = ({
  fieldLabel,
  fieldPlaceholder,
  fieldType,
  fieldId,
}) => {
  return (
    <FormControl>
      <FormLabel fontSize="sm" htmlFor="nombre">
        {fieldLabel}
      </FormLabel>
      <InputGroup>
        <Input
          isRequired
          fontSize="sm"
          type={fieldType}
          id={fieldId}
          placeholder={fieldPlaceholder}
          errorBorderColor="red.300"
        />
      </InputGroup>
    </FormControl>
  );
};

export { GenericFormField };
