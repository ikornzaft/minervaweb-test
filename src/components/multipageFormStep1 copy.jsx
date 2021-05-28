import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormLabel, FormControl, Button, Input, Text } from '@chakra-ui/react';
import * as Yup from 'yup';

const stepOneValidationSchema = Yup.object({
  title: Yup.string().required('Es necesario incluir un título'),
  subtitle: Yup.string().required('Es necesario incluir un subtítulo'),
});

const MultipageFormStep1 = (props) => {
  const handleSubmit = (values) => {
    props.next(values);
  };

  return (
    <Formik
      validationSchema={stepOneValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          <Field name="title">
            {({ field }) => (
              <FormControl>
                <FormLabel htmlFor="title">Título</FormLabel>
                <Input {...field} id="title" placeholder="Título" />
                <ErrorMessage name="title">
                  {(msg) => (
                    <Text color="red" fontSize="sm">
                      {msg}
                    </Text>
                  )}
                </ErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="subtitle">
            {({ field }) => (
              <FormControl>
                <FormLabel marginTop={4} htmlFor="subtitle">Subtítulo</FormLabel>
                <Input {...field} id="subtitle" placeholder="Subtítulo" />
                <ErrorMessage name="subtitle">
                  {(msg) => (
                    <Text color="red" fontSize="sm">
                      {msg}
                    </Text>
                  )}
                </ErrorMessage>
              </FormControl>
            )}
          </Field>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Siguiente
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export { MultipageFormStep1 };
