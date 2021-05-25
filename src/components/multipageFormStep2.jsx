import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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
      {({ values }) => (
        <Form>
          <p>Párrafo</p>
          <Field type="text" name="paragraph" />
          <ErrorMessage name="paragraph" />

          <button type="button" onClick={() => props.prev(values)}>
            Atrás
          </button>
          <button type="submit">Crear</button>
        </Form>
      )}
    </Formik>
  );
};

export default MultipageFormStep2;
