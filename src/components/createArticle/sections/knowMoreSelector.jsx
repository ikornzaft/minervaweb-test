import React, { useState, useRef } from 'react';
import { FormControl, Button, VStack, Box, Stack, Text, Input, FormLabel } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { FiUpload } from 'react-icons/fi';
import { DisplayUploadedFiles } from './displayUploadedFiles';

const KnowMoreSelector = ({ knowMore, setKnowMore }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const knowMoreInputRef = useRef();
  const randomId = uuidv4();
  const today = new Date();

  const createFileName = (type, name) => {
    let fileName = '';
    let fileRoute = '';
    const year = today.getFullYear().toString();
    const month = today.getMonth() + 1;
    const date = year + month.toString().padStart(2, '0');
    if (type === 'application/pdf') {
      fileName = date + '/' + randomId + '.pdf';
      fileRoute = 'documentupload';
    }
    if (type.substring(0, 5) === 'image') {
      const splitedName = name.toLowerCase().split('.');
      const extension = splitedName[splitedName.length - 1];
      fileName = date + '/' + randomId + '.' + extension;
      fileRoute = 'imageupload';
    }
    if (type.substring(0, 5) === 'video') {
      const splitedName = name.toLowerCase().split('.');
      const extension = splitedName[splitedName.length - 1];
      fileName = date + '/' + randomId + '.' + extension;
      fileRoute = 'videoupload';
    }
    if (type.substring(0, 5) === 'audio') {
      const splitedName = name.toLowerCase().split('.');
      const extension = splitedName[splitedName.length - 1];
      fileName = date + '/' + randomId + '.' + extension;
      fileRoute = 'audioupload';
    }

    return { fileName, fileRoute };
  };

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const onFileUpload = async (e) => {
    const formData = new FormData();

    const { fileName, fileRoute } = createFileName(
      selectedFile.type,
      selectedFile.name
    );

    formData.append('fn', fileName);
    formData.append('file', selectedFile);

    await fetch(`http://afatecha.com:8080/minerva-server-web/${fileRoute}`, {
      method: 'POST',
      mode: 'cors',
      body: formData,
    });
    alert('The file upload with Ajax and Java was a success!');

    const newUploadedFile = {
      name: selectedFile.name,
      type: selectedFile.type,
      id: fileName,
    };

    setUploadedFiles((uploadedFiles) => [...uploadedFiles, newUploadedFile]);
    setSelectedFile(null);
  };

  return (
    <div>
      <VStack w="45%" p={4} bg="gray.50" borderRadius="md" borderStyle="solid" borderWidth="1px" marginBottom={4}>
        <Text fontSize="sm" color="gray.700">Subir un documento, imagen, video o audio</Text>
        <FormControl>
        <Stack w="100%" alignItems="center" justifyContent="flex-start">
        
        <FormLabel
          htmlFor="knowmore-input"
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
            knowMoreInputRef.current.click();
          }}
        >
          <Stack
            w="100%"
            h="100%"
            alignItems="center"
            justifyContent="center"
            wordBreak="break-all"
            wordWrap="break-word"
            textAlign="center"
            p={2}
          >
            {selectedFile ? (
              <Text fontSize="xs">{selectedFile.name}</Text>
            ) : (
              <Box as={FiUpload} size="40px" color="gray.600" />
            )}
          </Stack>
        </FormLabel>
        <Input
          id="knowmore-input"
          type="file"
          display="none"
          ref={knowMoreInputRef}
          onChange={onFileChange}
          placeholder="Selecciona un archivo"
        />
        {selectedFile ? (
          <Button type="button" colorScheme="blue" fontFamily="Poppins" fontWeight="400" size="xs" variant="outline" onClick={onFileUpload}>
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
              index={index}
            />
          );
      })}
    </div>
  );
};

export { KnowMoreSelector };
