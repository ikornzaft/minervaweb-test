import React from 'react';
import { Stack } from '@chakra-ui/react';

import { TopMenu } from '../components/navigation/topMenu';

const Layout = ({ children, isLoginOn }) => {
  return (
    <Stack width="100vw" maxHeight="100vh" spacing="0">
      {!isLoginOn ? null : <TopMenu />}

        {children}
    </Stack>
  );
};

export { Layout };
