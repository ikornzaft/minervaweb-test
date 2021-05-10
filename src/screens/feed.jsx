import React from 'react';
import { Container, Stack, Heading, Box, Image, Text } from '@chakra-ui/react';

const Feed = () => {
  return (
    <Container
      maxWidth="container.lg"
      alignSelf="center"
      backgroundColor="gray.50"
      padding="0px"
    >
      <Stack direction="column" textAlign="center">
        <Stack backgroundColor="gray.50" alignItems="center" padding={2} paddingBottom={8} spacing={6} >
          <Heading>Este es el feed</Heading>
          <Box backgroundColor="white" width="80%" padding={4} >
            <Stack alignItems="center" padding={2}>
              <Image
                boxSize="500px"
                objectFit="cover"
                height="300px"
                src="https://source.unsplash.com/1600x900/?nature,water"
                alt="Random Image"
              />
              <Heading as="h3" size="md">
                Artículo traído del server
              </Heading>
              <Container>
                <Text>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Laboriosam rerum iure a aut obcaecati doloribus natus
                  explicabo possimus magni, ipsa cum iste officia esse eum quia
                  eaque reiciendis veniam? Dignissimos.
                </Text>
              </Container>
            </Stack>
          </Box>
          <Box backgroundColor="white" width="80%" padding={4}>
            <Stack alignItems="center" padding={2}>
              <Image
                boxSize="500px"
                objectFit="cover"
                height="300px"
                src="https://source.unsplash.com/1600x900/?city,building"
                alt="Random Image"
              />
              <Heading as="h3" size="md">
                Artículo traído del server
              </Heading>
              <Container>
                <Text>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Laboriosam rerum iure a aut obcaecati doloribus natus
                  explicabo possimus magni, ipsa cum iste officia esse eum quia
                  eaque reiciendis veniam? Dignissimos.
                </Text>
              </Container>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};

export { Feed };
