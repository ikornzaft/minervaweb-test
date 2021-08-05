import React from 'react';
import { Box, Spinner } from '@chakra-ui/react';

const BlueSpinner = () => {
  return (
    <Box paddingTop={24} height="50vh">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Box>
  );
};

export { BlueSpinner };
