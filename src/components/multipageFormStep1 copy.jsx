import React from 'react';
import { Stack, Flex, Box, FormControl, Button } from '@chakra-ui/react';
import { GenericFormField } from './genericFormField';

const MultipageFormStep1 = ({
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
    <Box backgroundColor="red" padding={1} width="100%" justifyContent="center">
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
    </Box>
  );
};

export { MultipageFormStep1 };
