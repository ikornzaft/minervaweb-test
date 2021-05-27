import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Text,
} from '@chakra-ui/react';
import * as Yup from 'yup';

const stepTwoValidationSchema = Yup.object({
  paragraph: Yup.string().required().label('Párrafo'),
});

const MultipageFormStep2 = (props) => {
  const handleSubmit = (values) => {
    props.next(values, true);
  };

  return (
    <Formik
      validationSchema={stepTwoValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form>
          <Field name="paragraph">
            {({ field }) => (
              <FormControl>
                <FormLabel htmlFor="paragraph">Párrafo</FormLabel>
                <Input {...field} id="paragraph" placeholder="Párrafo" />
                <ErrorMessage name="paragraph">{msg => <Text color="red" fontSize="sm">{msg}</Text>}</ErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
          mt={4}
          colorScheme="teal"
          isLoading={formikProps.isSubmitting}
          type="button"
          onClick={() => props.prev(formikProps.values)}
        >
          Anterior
        </Button>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={formikProps.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export { MultipageFormStep2 };

/*
        <Field name="paragraph" />
        <Input id="paragraph" placeholder="paragraph"/ >
        <ErrorMessage name="paragraph">{msg => <Text color="red">{msg}</Text>}</ErrorMessage>
        */
