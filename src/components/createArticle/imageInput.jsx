import React, { useRef, useState } from 'react';
import {
  FormControl,
  Image,
  FormLabel,
  Input,
  HStack,
  VStack,
  Button,
  Field,
  Textarea,
  Text,
  createStandaloneToast,
} from '@chakra-ui/react';

import { CreateFileName } from '../common/createFileName';

const ImageInput = ({ coverImage, setCoverImage }) => {
  const imgInputRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageDescription, setSelectedImageDescription] = useState(null);
  const [missingImageDescription, setMissingImageDescription] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [thumbnails, setThumbnails] = useState(null);

  const uploadFile = async (route, data, newUploadedImage) => {
    if (selectedImageDescription) {
      setLoading(true);
      const toast = createStandaloneToast();

      try {
        await fetch(`http://afatecha.com:8080/minerva-server-web/${route}`, {
          method: 'POST',
          mode: 'no-cors',
          body: data,
        });
        setCoverImage(newUploadedImage);
        toast({
          title: 'El archivo se subió correctamente',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        setSelectedImage(null);
        setSelectedImageDescription(null);
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
    } else {
      setMissingImageDescription(true);
    }
  };

  const onDescriptionChange = (e) => {
    if (e.target.value !== '') {
      setMissingImageDescription(false);
    } else {
      setMissingImageDescription(true);
    }
    setSelectedImageDescription(e.target.value);
  };

  const onFileUpload = () => {
    const formData = new FormData();

    const { fileName, fileRoute } = CreateFileName(selectedImage.type, selectedImage.name);

    formData.append('fn', fileName);
    formData.append('file', selectedImage);

    const newUploadedImage = {
      image: {
        descriptor: {
          title: selectedImageDescription,
          subtitle: selectedImage.name,
        },
        locationType: 'relative',
        location: fileName,
      },
    };

    uploadFile(fileRoute, formData, newUploadedImage);
  };

  return (
    <HStack
      alignItems="flex-end"
      bgColor="gray.50"
      borderRadius="md"
      borderStyle="solid"
      borderWidth="1px"
      marginTop={4}
      padding={2}
      w="25rem"
    >
      <FormControl
        alignItems="center"
        display="flex"
        h="100%"
        justifyContent="space-evenly"
        textAlign="center"
        w="100%"
      >
        {thumbnails ? (
          <Image
            borderColor="gray.400"
            borderRadius="lg"
            borderStyle="dashed"
            borderWidth="2px"
            boxSize="150px"
            objectFit="cover"
            src={thumbnails}
            onClick={() => {
              imgInputRef.current.click();
            }}
          />
        ) : (
          <FormLabel
            _hover={{ bgColor: 'gray.300' }}
            bgColor="gray.200"
            borderColor="gray.400"
            borderRadius="lg"
            borderStyle="dashed"
            borderWidth="2px"
            boxSize="150px"
            cursor="pointer"
            fontSize="sm"
            htmlFor={'articleImg'}
            marginBottom={0}
            marginRight={0}
            paddingX={4}
            paddingY={12}
            textAlign="center"
            onChange={(e) => {
              imgInputRef.current.click();
            }}
          >
            Agregar imagen principal
          </FormLabel>
        )}
        <Input
          ref={imgInputRef}
          accept="image/*"
          display="none"
          id="articleImg"
          type="file"
          onChange={(event) => {
            setSelectedImageDescription('');
            const file = event.target.files[0];

            if (file && file.type.substring(0, 5) === 'image') {
              const reader = new FileReader();

              reader.onloadend = () => {
                const readerResult = reader.result;

                setSelectedImage(file);
                setThumbnails(readerResult);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        <VStack h="100%" justifyContent="space-evenly">
          <Textarea
            backgroundColor="white"
            fontSize="sm"
            id="articleImgFooter"
            placeholder="Descripción de la imágen"
            value={selectedImageDescription}
            w="12rem"
            onChange={onDescriptionChange}
          />
          {missingImageDescription ? (
            <Text color="red" fontSize="xs" position="absolute">
              Ingresa una descripción
            </Text>
          ) : null}
          <Button
            colorScheme="blue"
            disabled={selectedImage ? false : true}
            fontFamily="Poppins"
            fontWeight="400"
            size="xs"
            type="button"
            variant="outline"
            onClick={onFileUpload}
          >
            {' '}
            Subir imágen
          </Button>
        </VStack>
      </FormControl>
    </HStack>
  );
};

export { ImageInput };
