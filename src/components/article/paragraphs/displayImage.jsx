import React from 'react';
import { Image, HStack, Text } from '@chakra-ui/react';

const DisplayImage = ({ linkLocation, title }) => {
  const imageSrc = `http://www.afatecha.com/id/files/image/${linkLocation}`;

  return (
    <>
      <Image
        borderRadius="lg"
        borderStyle="solid"
        borderWidth="1px"
        boxSize="400px"
        objectFit="scale-down"
        src={imageSrc}
      />
      <HStack justifyContent="center" w="400px">
        {title ? (
          <Text color="gray.500" fontSize="xs">
            Imágen: {title}
          </Text>
        ) : null}
      </HStack>
    </>
  );
};

export { DisplayImage };
