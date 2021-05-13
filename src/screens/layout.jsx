import React from 'react';
import { Container, Stack } from '@chakra-ui/react';

import { TopMenu } from '../components/topMenu';

const Layout = ({ children, isLoginOn }) => {
  return (
    <Stack width="100vw" maxHeight="100vh" overflow="hidden" spacing="0">
      {!isLoginOn ? null : <TopMenu />}
      <Container
        minWidth="container.lg"
        height="100vh"
        boxShadow="inner"
        alignSelf="center"
        bgGradient="linear(120deg, blue.50, teal.100, blue.200)"
        padding="0px"
        overflow="auto"
      >
        {children}
      </Container>
    </Stack>
  );
};

export { Layout };
