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
  const [selectedImageDescription, setSelectedImageDescription] =
    useState(null);
  const [missingImageDescription, setMissingImageDescription] = useState(false)
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
          mode: 'cors',
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
    if (e.target.value !== "") {
      setMissingImageDescription(false);
    } else {
      setMissingImageDescription(true);
    }
    setSelectedImageDescription(e.target.value);
  };

  const onFileUpload = () => {
    const formData = new FormData();

    const { fileName, fileRoute } = CreateFileName(
      selectedImage.type,
      selectedImage.name
    );

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
      marginTop={4}
      padding={2}
      w="25rem"
      bgColor="gray.50"
      borderRadius="md"
      alignItems="flex-end"
      borderStyle="solid"
      borderWidth="1px"
    >
      <FormControl
        display="flex"
        w="100%"
        h="100%"
        justifyContent="space-evenly"
        alignItems="center"
        textAlign="center"
      >
        {thumbnails ? (
          <Image
            src={thumbnails}
            boxSize="150px"
            borderStyle="dashed"
            borderColor="gray.400"
            borderRadius="lg"
            borderWidth="2px"
            objectFit="cover"
            onClick={() => {
              imgInputRef.current.click();
            }}
          />
        ) : (
          <FormLabel
            htmlFor={'articleImg'}
            bgColor="gray.200"
            boxSize="150px"
            borderStyle="dashed"
            borderWidth="2px"
            borderRadius="lg"
            borderColor="gray.400"
            textAlign="center"
            paddingY={12}
            paddingX={4}
            marginBottom={0}
            marginRight={0}
            fontSize="sm"
            _hover={{ bgColor: 'gray.300' }}
            cursor="pointer"
            onChange={(e) => {
              imgInputRef.current.click();
            }}
          >
            Agregar imagen principal
          </FormLabel>
        )}
        <Input
          type="file"
          id="articleImg"
          display="none"
          accept="image/*"
          ref={imgInputRef}
          onChange={(event) => {
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
        fontSize="sm"
        backgroundColor="white"
        id="articleImgFooter"
        w="12rem"
        placeholder="Descripción de la imágen"
        onChange={onDescriptionChange}
        />
        {missingImageDescription ? <Text position="absolute" fontSize="xs" color="red">Ingresa una descripción</Text> : null}
        <Button
          type="button"
          colorScheme="blue"
          fontFamily="Poppins"
          fontWeight="400"
          size="xs"
          disabled={selectedImage ? false : true}
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
