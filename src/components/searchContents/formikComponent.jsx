import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from './input';
import { SelectField } from '../common/selectField';
import { RadioButton } from '../common/radioButton';

function FormikComponent() {
  const initialValues = {
    email: '',
    selectOption: '',
    radioOption: '',
  };
  const options = [
    { key: 'Matemáticas', value: 'matematicas' },
    { key: 'Lenguaje', value: 'lenguaje' },
    { key: 'Sociales', value: 'sociales' },
  ];
  const radioOptions = [
    { key: 'Pendiente', value: 'rOption1'},
    { key: 'Entregada', value: 'rOption2'},
    { key: 'Corregida', value: 'rOption3'},
  ]
  const validationSchema = Yup.object({
    email: Yup.string().required('Required'),
    selectOption: Yup.string().required('Este campo es requerido'),
    radioOption: Yup.string().required('Este campo es requerido'),
  });
  const onSubmit = (values) => console.log('Form Data', values);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <SelectField
            label="Select a Topic"
            name="selectOption"
            options={options}
          />

          <Input type="email" label="Email" name="email" />
          <RadioButton label="Estado" name="radioOption" options={radioOptions} />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default FormikComponent;
