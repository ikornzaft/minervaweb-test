import React from 'react';
import { Container, Stack, Heading, Box, FormControl, FormLabel, InputGroup, Input, Button } from '@chakra-ui/react';

const Form = () => {
  const handleSubmit = (e) => {
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
          spacing={6}
        >
          <Heading>Esto es un form</Heading>
          <Box backgroundColor="white" width="80%" padding={4}>
            <Stack alignItems="center" padding={2}>
              <form method="POST" onSubmit={handleSubmit}>
                <Stack
                  alignSelf="center"
                  textAlign="center"
                  boxShadow="md"
                  rounded="lg"
                  bg="gray.50"
                  maxWidth={500}
                  spacing={5}
                  margin="auto"
                  marginTop={16}
                  marginBottom={16}
                  padding={5}
                >
                  <FormControl>
                    <FormLabel fontSize="sm" htmlFor="nombre">
                      Nombre
                    </FormLabel>
                    <InputGroup>
                      <Input
                        isRequired
                        fontSize="sm"
                        type="text"
                        id="nombre"
                        placeholder="Tu nombre"
                        errorBorderColor="red.300"
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="sm" htmlFor="nombre">
                      Apellido
                    </FormLabel>
                    <InputGroup>
                      <Input
                        isRequired
                        fontSize="sm"
                        type="text"
                        id="apellido"
                        placeholder="Tu apellido"
                        errorBorderColor="red.300"
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl padding={2}>
                    <Button
                      fontSize="sm"
                      colorScheme="blue"
                      type="submit"
                      margin="5"
                    >
                      Enviar
                    </Button>
                  </FormControl>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};

export { Form };
