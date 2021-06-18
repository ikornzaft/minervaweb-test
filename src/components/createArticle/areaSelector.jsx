import React, { useEffect } from 'react';
import { Field, ErrorMessage } from 'formik';
import { HStack, Select, Text } from '@chakra-ui/react';

const AreaSelector = (props) => {
  const { label, name, options, area, setArea, ...rest } = props;
  return (
    <HStack className="form-control">
    <Field name={name} {...rest}>
      {({ field }) => {
        setArea(field.value);
        console.log(area);
        return (
        <Select borderRadius="md" size="sm" placeholder={label} onChange={e => {console.log(e.target.value)}} id={name} {...field}>
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.key}
              </option>
            );
          })}
        </Select>
      )}
    }
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
