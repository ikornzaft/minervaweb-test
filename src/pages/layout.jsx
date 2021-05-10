import React from 'react';
import {Container, Stack, Flex,Text} from '@chakra-ui/react';

import {TopMenu} from '../components/topMenu';

const Layout = ({children, isLoginOn}) => {

  return (
    <Container maxWidth="container.lg" alignSelf="center" backgroundColor="gray.50" padding="0px">
      <Stack direction="column">
      {!isLoginOn ? null : <TopMenu />}
        <Stack backgroundColor="gray.50">
        {children}
        </Stack>
      </Stack>
    </Container>
  );
};

export { Layout };