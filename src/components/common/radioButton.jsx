import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { RadioGroup, Radio, Text } from '@chakra-ui/react';

const RadioButton = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div>
    <label forHtml="name">{label}</label>
      <Field as={RadioGroup}  name={name} {...rest}>
        
      {options.map((option) => {
        return (
          <Radio value={option.value}>{option.key}</Radio>
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
};

export { RadioButton };
