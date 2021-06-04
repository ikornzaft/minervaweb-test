import React, { useState } from 'react';
import { Formik, Form } from 'formik';

import { Select } from '@chakra-ui/react';

const SearchForm = () => {

  const contentTypeOptions = [
    {key: 'Todos', value: 'all'},
    {key: 'Artículos', value: 'article'},
    {key: 'Exámenes', value: 'quiz'},
  ]
  return (
    <Formik initialValues={filterObject} validationSchema={validationSchema} onSubmit={onSubmit}>

      
    </Formik >
  )
}

export { SearchForm }
