import React from 'react';
import { Image, HStack, Text } from '@chakra-ui/react';

const DisplayImage = ({ linkLocation, title }) => {
  const imageSrc = `http://www.afatecha.com/id/files/image/${linkLocation}`;

  return (
    <>
      <Image
        boxSize="400px"
        objectFit="scale-down"
        borderStyle="solid"
        borderRadius="lg"
        borderWidth="1px"
        src={imageSrc}
      />
      <HStack justifyContent="center" w="400px">
        {title ? (
          <Text fontSize="xs" color="gray.500">
            Imágen: {title}
          </Text>
        ) : null}
      </HStack>
    </>
  );
};

export { DisplayImage };
