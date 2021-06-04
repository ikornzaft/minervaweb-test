import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Select, Text } from '@chakra-ui/react';
import TextError from '../searchContents/textError';

function SelectField(props) {
  const { label, name, options, ...rest } = props;

  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field
        as={Select}
        placeholder="Materia"
        errorBorderColor="red"
        id={name}
        name={name}
        {...rest}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name}>
        {(msg) => (
          <Text color="red" fontSize="xs">
            {msg}
          </Text>
        )}
      </ErrorMessage>
    </div>
  );
}

export { SelectField };
