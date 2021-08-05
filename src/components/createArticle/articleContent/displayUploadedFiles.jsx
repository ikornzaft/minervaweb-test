import React, { useEffect, useState } from 'react';
import {
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Tooltip,
} from '@chakra-ui/react';
import { ParagraphReducer } from '../../common/paragraphReducer';
import { FaRegTrashAlt } from 'react-icons/fa';

const DisplayUploadedFiles = ({
  file,
  index,
  uploadedFiles,
  setUploadedFiles,
}) => {
  const defineType = (e) => {
    if (e.image) return 'image';
    if (e.document) return 'document';
    if (e.audio) return 'audio';
    if (e.video) return 'video';
  };

  const deleteItem = (e) => {
    console.log(index);
    //const elementToDelete = options[index].key;

    const filteredFiles = uploadedFiles.filter(
      (file, _index) => _index !== index
    );
    setUploadedFiles(filteredFiles);
  };

  return (
    <HStack width="100%" marginBottom={2}>
      <VStack width="100%" p={3} bg="gray.100" borderRadius="md">
        <Heading as="h4" fontSize="md">
          {file.descriptor.title}
        </Heading>
        <Text fontSize="xs">{file.descriptor.subtitle}</Text>
      </VStack>
      <Tooltip label="Eliminar archivo" bg="white" color="gray.700">
        <Button
          id={file.content.location}
          margin="0"
          size="xs"
          onClick={deleteItem}
        >
          <FaRegTrashAlt />
        </Button>
      </Tooltip>
    </HStack>
  );
};

export { DisplayUploadedFiles };
