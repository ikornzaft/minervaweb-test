import React from 'react';
import {
  Container,
  Stack,
  Heading,
  Box,
} from '@chakra-ui/react';
import { GenericForm } from '../components/genericForm';
import { LABELS } from '../locals/sp/labels';

const Form = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <Container
      maxWidth="container.lg"
      alignSelf="center"
      backgroundColor="gray.50"
      padding="0px"
    >
      <Stack direction="column" textAlign="center">
        <Stack
          backgroundColor="gray.50"
          alignItems="center"
          padding={2}
          paddingBottom={8}
          spacing={4}
        >
          <Heading>{LABELS.FORM.TITLE}</Heading>
          <Box backgroundColor="white" width="80%" padding={4}>
            <Stack alignItems="center" padding={2}>
              <GenericForm
                firstFieldLabel={LABELS.FORM.FIRST_FIELD.TEXT}
                firstFieldPlaceholder={LABELS.FORM.FIRST_FIELD.PLACEHOLDER}
                firstFieldType='text'
                firstFieldId='nombre'
                secondFieldLabel={LABELS.FORM.SECOND_FIELD.TEXT}
                secondFieldPlaceholder={LABELS.FORM.SECOND_FIELD.PLACEHOLDER}
                secondFieldType='text'
                secondFieldId='apellido'
                buttonText={LABELS.FORM.BUTTON_TEXT}
                onSubmit={handleSubmit}
              />
              
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};

export { Form };
