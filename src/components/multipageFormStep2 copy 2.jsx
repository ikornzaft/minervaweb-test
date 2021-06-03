import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import {
  FormControl,
  FormLabel,
  Button,
  Textarea,
  Text,
} from '@chakra-ui/react';
import * as Yup from 'yup';

const stepTwoValidationSchema = Yup.object({
  paragraph: Yup.string().required().label('Párrafo'),
});

const MultipageFormStep2 = (props) => {
  const handleSubmit = (values) => {
    console.log(values);
    props.next(values, true);
  };

  return (
    <Formik
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="paragraphs">
            {({ insert, remove, push }) => (
              <div>
                {values.paragraphs.length > 0 &&
                  values.paragraphs.map((paragraph, index) => (
                    <div className="row" key={index}>
                      <div className="col">
                        <FormLabel htmlFor={`paragraphs.${index}.paragraph`}>
                          Párrafo {index + 1} 
                        </FormLabel>
                        <Field
                          name={`paragraphs.${index}.paragraph`}
                          type="text"
                        />
                        <ErrorMessage
                          name={`paragraphs.${index}.paragraph`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <Button
                          type="button"
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          X
                        </Button>
                      </div>
                    </div>
                  ))}
                <Button
                mt={4}
                colorScheme="teal"
                  type="button"
                  onClick={() => push({ paragraph:'' })}
                >
                  Agregar párrafo
                </Button>
              </div>
            )}
          </FieldArray>
          <Button
          mt={4}
          colorScheme="teal"
          type="button"
          onClick={() => props.prev(values)}
        >
          Anterior
        </Button>
          <Button type="submit">Confirmar</Button>
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
