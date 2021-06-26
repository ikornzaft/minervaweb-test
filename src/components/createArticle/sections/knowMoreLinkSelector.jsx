import React, { useState } from 'react';
import {
  FormControl,
  Button,
  VStack,
  Box,
  Stack,
  Text,
  Input,
  Textarea,
  FormLabel,
  createStandaloneToast,
} from '@chakra-ui/react';
import { CreateFileName } from '../../common/createFileName';
import { FiUpload } from 'react-icons/fi';
import { DisplayUploadedFiles } from './displayUploadedFiles';

const KnowMoreLinkSelector = ({ knowMoreLinks, setKnowMoreLinks }) => {
  const [links, setLinks] = useState(null);
  const [addedLink, setAddedLink] = useState(null);
  const [addedLinkTitle, setAddedLinkTitle] = useState(null);
  const [addedLinkDescription, setAddedLinkDescription] = useState(null);

  const onLinkChange = (e) => {
    setAddedLink(e.target.value);
  };

  const onTitleChange = (e) => {
    setAddedLinkTitle(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setAddedLinkDescription(e.target.value);
  };

  const onLinkAdd = () => {
    const formData = new FormData();

    const newLink = {
      descriptor: {
        title: addedLinkTitle,
        subtitle: addedLinkDescription,
      },
      document: {
        type: "link",
        locationType: 'absolute',
        location: addedLink,
      },
    };

    setKnowMoreLinks((knowMoreLinks) => [...knowMoreLinks, newLink]);
  };

  return (
    <VStack justifyContent="center" paddingTop={4}>
      <VStack
        w="90%"
        p={4}
        bg="gray.50"
        borderRadius="md"
        borderStyle="solid"
        borderWidth="1px"
        marginBottom={4}
      >
        <Text fontSize="sm" color="gray.700">
          Ingresa un link
        </Text>
        <FormControl>
          <Stack w="100%" alignItems="center" justifyContent="flex-start">
            <VStack w="100%" alignItems="flex-start">
            <Input
              id="knowmore-link-input"
              type="text"
              bg="white"
              size="sm"
              onChange={onLinkChange}
              placeholder="http://"
            />
            <Text fontSize="xs" color="gray.600" >
          Título
        </Text>
            <Input
            id="knowmore-link-title"
            type="text"
            bg="white"
            size="sm"
            onChange={onTitleChange}
          />
          <Text fontSize="xs" color="gray.600">
          Descripción
        </Text>
          <Textarea
          id="knowmore-link-description"
          bg="white"
          size="sm"
          type="textarea"
          onChange={onDescriptionChange}
        />
            </VStack>

              <Button
                type="button"
                colorScheme="blue"
                fontFamily="Poppins"
                fontWeight="400"
                size="xs"
                variant="outline"
                onClick={onLinkAdd}
              >
                {' '}
                Agregar Link
              </Button>

          </Stack>
        </FormControl>
      </VStack>
      {/*uploadedFiles.map((file, index) => {
        if (file !== '')
          return (
            <DisplayUploadedFiles
              file={file}
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              index={index}
            />
          );
      })*/}
    </VStack>
  );
};

export { KnowMoreLinkSelector };
