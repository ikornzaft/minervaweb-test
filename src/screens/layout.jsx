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
    {!isLoginOn ? null : <TopMenu />}
      <Stack maxHeight="100vh" overflow="auto" direction="column" alignItems="center" justifyContent="flex-start">
        {children}
      </Stack>
    </Container>
  );
};

export { Layout };
