import React from 'react';
import { Box, Spinner } from '@chakra-ui/react';

const BlueSpinner = () => {
  return (
    <Box height="50vh" paddingTop={24}>
      <Spinner color="blue.500" emptyColor="gray.200" size="xl" speed="0.65s" thickness="4px" />
    </Box>
  );
};

export { BlueSpinner };
