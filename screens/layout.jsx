import React from 'react';
import { Container, Stack } from '@chakra-ui/react';

import { TopMenu } from '../components/topMenu';

const Layout = ({ children, isLoginOn }) => {
  return (
    <Container
      maxWidth="container.xl"
      height="100vh"
      boxShadow="inner"
      alignSelf="center"
      bgGradient="linear(120deg, blue.50, teal.100, blue.200)"
      padding="0px"
    >
      <Stack direction="column">
        {!isLoginOn ? null : <TopMenu />}
        <Stack height="90vh" alignItems="center" justifyContent="center">{children}</Stack>
      </Stack>
    </Container>
  );
};

export { Layout };
