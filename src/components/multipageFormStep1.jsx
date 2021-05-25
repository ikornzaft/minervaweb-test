import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const stepOneValidationSchema = Yup.object({
  title: Yup.string().required().label('Título'),
  subtitle: Yup.string().required().label('Subtítulo'),
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
      {({ errors }) => (
        <Form>
          <p>Título</p>
          <Field name="title" />
          <ErrorMessage name="title" />
          <p>Subtítulo</p>
          <Field name="subtitle" />
          <ErrorMessage name="subtitle" />

          <button type="submit">Siguiente</button>
        </Form>
      )}
    </Formik>
  );
};

export { MultipageFormStep1 };
