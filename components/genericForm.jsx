import React from 'react';
import { Stack, Flex, FormControl, Button } from '@chakra-ui/react';
import { GenericFormField } from './genericFormField';

const GenericForm = ({
  firstFieldLabel,
  firstFieldPlaceholder,
  firstFieldType,
  firstFieldId,
  secondFieldLabel,
  secondFieldPlaceholder,
  secondFieldType,
  secondFieldId,
  buttonText,
  onSubmit,
}) => {
  return (
    <Flex backgroundColor="white" width="100%" padding={4} justifyContent="center">
      <Stack alignItems="center" padding={2}>
        <form method="GET" onSubmit={onSubmit}>
          <Stack
            alignSelf="center"
            textAlign="center"
            boxShadow="md"
            rounded="lg"
            bg="gray.50"
            maxWidth={500}
            spacing={5}
            margin="auto"
            marginTop={2}
            marginBottom={2}
            padding={2}
          >
            <GenericFormField
              fieldLabel={firstFieldLabel}
              fieldPlaceholder={firstFieldPlaceholder}
              fieldType={firstFieldType}
              fieldId={firstFieldId}
            />
            {secondFieldLabel ? (
              <GenericFormField
                fieldLabel={secondFieldLabel}
                fieldPlaceholder={secondFieldPlaceholder}
                fieldType={secondFieldType}
                fieldId={secondFieldId}
              />
            ) : null}
            <FormControl padding={2}>
              <Button fontSize="sm" colorScheme="blue" type="submit" margin="5">
                {buttonText}
              </Button>
            </FormControl>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
};

export { GenericForm };
