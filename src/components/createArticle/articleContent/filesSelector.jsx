import React, { useState, useRef } from 'react';
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
import { FiUpload } from 'react-icons/fi';

import { CreateFileName } from '../../common/createFileName';

import { DisplayUploadedFiles } from './displayUploadedFiles';

// en el objeto que paso debería tener disponible un método MODCORS

const FilesSelector = ({ uploadedFiles, setUploadedFiles }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileDescription, setSelectedFileDescription] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const FileInputRef = useRef();

  const defineFileType = (type) => {
    if (type.substring(0, 5) === 'image') return 'image';
    if (type.substring(0, 5) === 'video') return 'video';
    if (type.substring(0, 5) === 'audio') return 'audio';
    if (type.substring(0, 4) === 'text' || type.substring(0, 11) === 'application')
      return 'document';

    return 'document';
  };

  const uploadFile = async (route, data, newUploadedFile) => {
    setLoading(true);
    const toast = createStandaloneToast();

    try {
      await fetch(`http://afatecha.com:8080/minerva-server-web/${route}`, {
        method: 'POST',
        mode: 'no-cors',
        body: data,
      });
      setUploadedFiles([...uploadedFiles, newUploadedFile]);
      setFiles([...files, newUploadedFile]);
      toast({
        title: 'El archivo se subió correctamente',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      setSelectedFile(null);
      setSelectedFileDescription(null);
    } catch (err) {
      setError(err);
      toast({
        title: 'Ocurrió un error al subir el archivo',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const onFileChange = (e) => {
    defineFileType(e.target.files[0].type);
    setSelectedFile(e.target.files[0]);
  };

  const onDescriptionChange = (e) => {
    setSelectedFileDescription(e.target.value);
  };

  const onFileUpload = () => {
    const formData = new FormData();

    const { fileName, fileRoute } = CreateFileName(selectedFile.type, selectedFile.name);

    formData.append('fn', fileName);
    formData.append('file', selectedFile);

    const newUploadedFile = {
      descriptor: {
        title: selectedFileDescription,
        subtitle: selectedFile.name,
      },
      content: {
        link: {
          type: defineFileType(selectedFile.type),
          locationType: 'relative',
          location: fileName,
        },
      },
    };

    uploadFile(fileRoute, formData, newUploadedFile);
  };

  return (
    <VStack justifyContent="center" paddingTop={4}>
      <VStack
        bg="gray.50"
        borderRadius="md"
        borderStyle="solid"
        borderWidth="1px"
        marginBottom={4}
        p={4}
        w="60%"
      >
        <Text color="gray.700" fontSize="sm">
          Subir un documento, imagen, video o audio
        </Text>
        <FormControl>
          <Stack alignItems="center" justifyContent="flex-start" w="100%">
            <FormLabel
              _hover={{ bgColor: 'gray.300' }}
              bgColor="gray.200"
              borderColor="gray.400"
              borderRadius="lg"
              borderStyle="dashed"
              borderWidth="2px"
              cursor="pointer"
              fontSize="sm"
              h="120px"
              htmlFor="file-input"
              marginBottom={0}
              marginRight={0}
              w="120px"
              onClick={(e) => {
                e.preventDefault();
                FileInputRef.current.click();
              }}
            >
              <Stack
                alignItems="center"
                h="100%"
                justifyContent="center"
                p={2}
                textAlign="center"
                w="100%"
                wordBreak="break-all"
                wordwrap="break-word"
              >
                {loading ? <p>Subiendo...</p> : null}
                {selectedFile ? (
                  <Text fontSize="xs">{selectedFile.name}</Text>
                ) : (
                  <Box as={FiUpload} color="gray.600" size="40px" />
                )}
              </Stack>
            </FormLabel>
            <Input
              ref={FileInputRef}
              display="none"
              id="file-input"
              placeholder="Selecciona un archivo"
              type="file"
              onChange={onFileChange}
            />
            {selectedFile ? (
              <Textarea
                id="elementDescription"
                name="elementDescription"
                placeholder="Escribe una descripción"
                size="xs"
                type="text"
                onChange={onDescriptionChange}
              />
            ) : null}
            {selectedFile ? (
              <Button
                colorScheme="blue"
                fontFamily="Poppins"
                fontWeight="400"
                size="xs"
                type="button"
                variant="outline"
                onClick={onFileUpload}
              >
                {' '}
                Subir archivo
              </Button>
            ) : null}
          </Stack>
        </FormControl>
      </VStack>
      {uploadedFiles.map((file, index) => {
        if (file !== '')
          return (
            <DisplayUploadedFiles
              file={file}
              index={index}
              setUploadedFiles={setUploadedFiles}
              uploadedFiles={uploadedFiles}
            />
          );
      })}
    </VStack>
  );
};

export { FilesSelector };
