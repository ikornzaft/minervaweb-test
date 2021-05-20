import React from 'react';
import { Container, Stack } from '@chakra-ui/react';

import { TopMenu } from '../components/topMenu';

const Layout = ({ children, isLoginOn }) => {
  return (
    <Stack width="100vw" maxHeight="100vh" spacing="0">
      {!isLoginOn ? null : <TopMenu />}
      <Container
        minWidth="container.lg"
        alignSelf="center"
        padding="0px"
        overflow="auto"
        bg="red"
      >
        {children}
      </Container>
    </Stack>
  );
};

export { Layout };
