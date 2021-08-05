import React, { useEffect, useState } from 'react';
import { VStack, HStack, Text, Heading, Button, Tooltip } from '@chakra-ui/react';
import { FaRegTrashAlt } from 'react-icons/fa';

import { ParagraphReducer } from '../../common/paragraphReducer';

const DisplayUploadedFiles = ({ file, index, uploadedFiles, setUploadedFiles }) => {
  const defineType = (e) => {
    if (e.image) return 'image';
    if (e.document) return 'document';
    if (e.audio) return 'audio';
    if (e.video) return 'video';
  };

  const deleteItem = (e) => {
    console.log(index);
    //const elementToDelete = options[index].key;

    const filteredFiles = uploadedFiles.filter((file, _index) => _index !== index);

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
        <Button id={file.content.location} margin="0" size="xs" onClick={deleteItem}>
          <FaRegTrashAlt />
        </Button>
      </Tooltip>
    </HStack>
  );
};

export { DisplayUploadedFiles };
