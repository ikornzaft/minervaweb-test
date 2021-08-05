import React, { useEffect, useState } from 'react';
import { VStack, HStack, Text, Heading, Button, Tooltip } from '@chakra-ui/react';
import { FaRegTrashAlt } from 'react-icons/fa';

const DisplayUploadedFiles = ({ file, index, uploadedFiles, setUploadedFiles }) => {
  const deleteItem = (e) => {
    const fileToDeleteId = e.currentTarget.id;
    const filteredFiles = uploadedFiles.filter(
      (file) => file.content.link.location !== fileToDeleteId
    );

    setUploadedFiles(filteredFiles);
  };

  return (
    <HStack marginBottom={2} width="100%">
      <VStack bg="gray.100" borderRadius="md" p={3} width="100%">
        <Heading as="h4" fontSize="md">
          {file.descriptor.title}
        </Heading>
        <Text fontSize="xs">{file.descriptor.subtitle}</Text>
      </VStack>
      <Tooltip bg="white" color="gray.700" label="Eliminar archivo">
        <Button id={file.content.link.location} margin="0" size="xs" onClick={deleteItem}>
          <FaRegTrashAlt />
        </Button>
      </Tooltip>
    </HStack>
  );
};

export { DisplayUploadedFiles };
