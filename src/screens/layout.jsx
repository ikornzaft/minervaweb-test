import React from 'react';
import { Stack } from '@chakra-ui/react';

import { TopMenu } from '../components/navigation/topMenu';

const Layout = ({ children, isLoginOn, setLoginOn }) => {
  return (
    <Stack maxHeight="100vh" spacing="0" width="100vw">
      {!isLoginOn ? null : <TopMenu isLoginOn={isLoginOn} setLoginOn={setLoginOn} />}

      {children}
    </Stack>
  );
};

export { Layout };
