import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { HStack, Select, Text } from '@chakra-ui/react';

const AreaSelector = (props) => {
  const { label, name, options, area, setArea, ...rest } = props;

  return (
    <HStack className="form-control">
      <Field name={name} {...rest}>
        {({ field }) => {
          setArea(field.value);

          return (
            <Select
              borderRadius="md"
              id={name}
              placeholder={label}
              size="sm"
              onChange={(e) => {
                console.log(e.target.value);
              }}
              {...field}
            >
              {options.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.key}
                  </option>
                );
              })}
            </Select>
          );
        }}
      </Field>
      <ErrorMessage name={name}>
        {(msg) => (
          <Text color="red" fontFamily="Open Sans" fontSize="xs" left="390px" position="absolute">
            {msg}
          </Text>
        )}
      </ErrorMessage>
    </HStack>
  );
};

export { AreaSelector };
