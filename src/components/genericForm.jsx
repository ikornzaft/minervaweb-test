import React from 'react';
import {
  Stack,
  Box,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  Button,
} from '@chakra-ui/react';

const GenericForm = () => {
  const handleSubmit = (e) => console.log(e);
  return (
    <Box backgroundColor="white" width="80%" padding={4}>
      <Stack alignItems="center" padding={2}>
        <form method="GET" onSubmit={handleSubmit}>
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
            <FormControl>
              <FormLabel fontSize="sm" htmlFor="nombre">
                ¿Todo bien?
              </FormLabel>
              <InputGroup>
                <Input
                  isRequired
                  fontSize="sm"
                  type="text"
                  id="nombre"
                  placeholder="Si/No/Otra cosa"
                  errorBorderColor="red.300"
                />
              </InputGroup>
            </FormControl>
            <FormControl padding={2}>
              <Button fontSize="sm" colorScheme="blue" type="submit" margin="5">
                Enviar
              </Button>
            </FormControl>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export { GenericForm };
