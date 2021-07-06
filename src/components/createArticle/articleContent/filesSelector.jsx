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
import { FiUpload } from 'react-icons/fi';
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
    if (
      type.substring(0, 4) === 'text' ||
      type.substring(0, 11) === 'application'
    )
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
        title: "El archivo se subió correctamente",
        status: "success",
        duration: 2000,
        isClosable: true,
      })
      setSelectedFile(null);
      setSelectedFileDescription(null);
    } catch (err) {
      setError(err);
      toast({
        title: "Ocurrió un error al subir el archivo",
        status: "error",
        duration: 2000,
        isClosable: true,
      })
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

    const { fileName, fileRoute } = CreateFileName(
      selectedFile.type,
      selectedFile.name
    );

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
        }
      },
    };

    uploadFile(fileRoute, formData, newUploadedFile);
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
              onClick={(e) => {
                e.preventDefault();
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
              
              {loading ? <p>Subiendo...</p> : null}
              {console.log(selectedFile)}
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
                onChange={onDescriptionChange}
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
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
            />
          );
      })}
    </VStack>
  );
};

export { FilesSelector };
