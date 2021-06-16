import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { HStack, Select, Text } from '@chakra-ui/react';

const AreaSelector = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <HStack className="form-control">
    <Field name={name} {...rest}>
      {({ field }) => (
        <Select borderRadius="md" size="sm" placeholder={label} id={name} {...field}>
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.key}
              </option>
            );
          })}
        </Select>
      )}
    </Field>
    <ErrorMessage name={name}>
      {(msg) => (
        <Text color="red" fontSize="xs" fontFamily="Open Sans" position="absolute" left="390px">
          {msg}
        </Text>
      )}
    </ErrorMessage>
    </HStack>
  );
};

export { AreaSelector };
