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
import { CreateFileName } from '../../common/createFileName';
import { LABELS } from '../../../locals/sp/labels';
import { FiUpload } from 'react-icons/fi';

const EditElementFormFile = ({
  description,
  setDescription,
  fileName,
  setFileName,
  location,
  setLocation,
  type,
  setType,
}) => {
  const [selectedFile, setSelectedFile] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const FileInputRef = useRef();

  const defineFileType = (type) => {
    if (type.substring(0, 5) === 'image') return 'image';
    if (type.substring(0, 5) === 'video') return 'video';
    if (type.substring(0, 5) === 'audio') return 'audio';
    if (
      type.substring(0, 4) === 'text' ||
      type.substring(0, 11) === 'application'
    )
      return 'document';
    return 'document';
  };

  const uploadFile = async (route, data) => {
    setLoading(true);
    const toast = createStandaloneToast();
    try {
      await fetch(`http://afatecha.com:8080/minerva-server-web/${route}`, {
        method: 'POST',
        mode: 'no-cors',
        body: data,
      });
      toast({
        title: 'El archivo se subió correctamente',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
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
    setType(defineFileType(e.target.files[0].type));
    setSelectedFile(e.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();

    const { fileName, fileRoute } = CreateFileName(
      type,
      fileName
    );

    formData.append('fn', fileName);
    formData.append('file', selectedFile);


    uploadFile(fileRoute, formData);
  };

  return (
    <VStack justifyContent="center" paddingTop={4}>
      <VStack
        w="60%"
        p={4}
        bg="gray.50"
        borderRadius="md"
        borderStyle="solid"
        borderWidth="1px"
        marginBottom={4}
      >
        <Text fontSize="sm" color="gray.700">
          Subir un documento, imagen, video o audio
        </Text>
        <FormControl>
          <Stack w="100%" alignItems="center" justifyContent="flex-start">
            <FormLabel
              htmlFor="file-input"
              bgColor="gray.200"
              cursor="pointer"
              w="120px"
              h="120px"
              fontSize="sm"
              borderStyle="dashed"
              borderWidth="2px"
              borderRadius="lg"
              borderColor="gray.400"
              marginBottom={0}
              marginRight={0}
              _hover={{ bgColor: 'gray.300' }}
              onChange={(e) => {
                FileInputRef.current.click();
              }}
            >
              <Stack
                w="100%"
                h="100%"
                alignItems="center"
                justifyContent="center"
                wordBreak="break-all"
                wordwrap="break-word"
                textAlign="center"
                p={2}
              >
                {loading ? (
                  <p>
                    {LABELS.CREATE_ARTICLE.EDIT_PARAGRAPHS.FILE_FORM.LOADING}
                  </p>
                ) : null}
                {selectedFile ? (
                  <Text fontSize="xs">{selectedFile.name}</Text>
                ) : (
                  <Box as={FiUpload} size="40px" color="gray.600" />
                )}
              </Stack>
            </FormLabel>
            <Input
              id="file-input"
              type="file"
              display="none"
              ref={FileInputRef}
              onChange={onFileChange}
              placeholder="Selecciona un archivo"
            />
            {selectedFile ? (
              <Textarea
                size="xs"
                type="text"
                id="elementDescription"
                name="elementDescription"
                value={description}
                onChange={el => setDescription(el.target.value)}
                placeholder="Escribe una descripción"
              />
            ) : null}
            {selectedFile ? (
              <Button
                type="button"
                colorScheme="blue"
                fontFamily="Poppins"
                fontWeight="400"
                size="xs"
                variant="outline"
                onClick={el => setDescription(el.target.value)}
              >
                {' '}
                {LABELS.CREATE_ARTICLE.EDIT_PARAGRAPHS.FILE_FORM.UPLOAD_BUTTON}
              </Button>
            ) : null}
          </Stack>
        </FormControl>
      </VStack>
    </VStack>
  );
};

export { EditElementFormFile };
