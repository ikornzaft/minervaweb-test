import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { FormControl, Select, Text } from '@chakra-ui/react';

const AreaSelector = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-control">
      <Field as="select" id={name} name={name} {...rest}>
        {({ field }) => (
          <FormControl h={24} overflow="hidden" padding="0">
            <Select placeholder={label}>
              {options.map((option) => {
                return <option value={option.route}>{option.key}</option>;
              })}
            </Select>
            <ErrorMessage name={name}>
              {(msg) => (
                <Text color="red" fontSize="xs" fontFamily="Open Sans">
                  {msg}
                </Text>
              )}
            </ErrorMessage>
          </FormControl>
        )}
      </Field>
    </div>
  );
};

export { AreaSelector };
