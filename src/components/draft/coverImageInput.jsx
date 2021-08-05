import React, { useRef, useState, useEffect } from 'react';
import {
  Stack,
  Button,
  Box,
  Input,
  Image,
  createStandaloneToast,
  Textarea,
  Text,
} from '@chakra-ui/react';
import { FiUpload } from 'react-icons/fi';

import { CreateFileName } from '../common/createFileName';

const CoverImageInput = ({ image, setIsImage, onImageChange }) => {
  const imageInputRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageDescription, setSelectedImageDescription] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);

  let url;
  let title;

  useEffect(() => {
    if (image) {
      if (image.location !== '') {
        setIsImage(true);
        image.location
          ? (url = `http://www.afatecha.com/id/files/image/${image.location}`)
          : (url = null);
        image.descriptor ? (title = image.descriptor.title) : (title = null);
        setThumbnail(url);
        setSelectedImageDescription(title);
      }
      image.descriptor ? (title = image.descriptor.title) : (title = null);
    }
  }, []);

  const onFileChange = (el) => {
    const file = el.target.files[0];

    if (file && file.type.substring(0, 5) === 'image') {
      const reader = new FileReader();

      reader.onloadend = () => {
        const readerResult = reader.result;

        setSelectedImage(file);
        setThumbnail(readerResult);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFileUpload = (el) => {
    const formData = new FormData();
    const { fileName, fileRoute } = CreateFileName(selectedImage.type, selectedImage.name);

    formData.append('fn', fileName);
    formData.append('file', selectedImage);

    const newUploadedImage = {
      location: fileName,
      name: selectedImage.name,
    };

    uploadFile(fileRoute, formData, newUploadedImage);
  };

  const uploadFile = async (route, data, newUploadedImage) => {
    setLoading(true);
    const toast = createStandaloneToast();

    try {
      await fetch(`http://afatecha.com:8080/minerva-server-web/${route}`, {
        method: 'POST',
        mode: 'no-cors',
        body: data,
      });
      onImageChange(newUploadedImage);

      toast({
        title: 'El archivo se subió correctamente',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      setSelectedImage(null);
      setSelectedImageDescription(null);
      setIsImage(true);
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

  const onDescriptionChange = (e) => {
    setSelectedImageDescription(e.target.value);
  };

  return (
    <Stack alignItems="center" justifyContent="flex-start">
      {thumbnail ? (
        <Image
          borderColor="gray.400"
          borderRadius="lg"
          borderStyle="dashed"
          borderWidth="2px"
          boxSize="120px"
          objectFit="cover"
          src={thumbnail}
          onClick={(el) => {
            el.preventDefault();
            imageInputRef.current.click();
          }}
        />
      ) : (
        <Stack
          _hover={{ bgColor: 'gray.300' }}
          bgColor="gray.200"
          borderColor="gray.400"
          borderRadius="lg"
          borderStyle="dashed"
          borderWidth="2px"
          cursor="pointer"
          fontSize="sm"
          h="120px"
          marginBottom={0}
          marginRight={0}
          w="120px"
          onClick={(el) => {
            el.preventDefault();
            imageInputRef.current.click();
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
            {loading ? <p>Loading...</p> : null}
            <Box as={FiUpload} color="gray.600" size="40px" />
          </Stack>
        </Stack>
      )}
      <Input
        ref={imageInputRef}
        accept="image/*"
        display="none"
        placeholder="Selecciona un archivo"
        type="file"
        onChange={onFileChange}
      />

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
    </Stack>
  );
};

export { CoverImageInput };
