import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
  Text,
  HStack,
  Box,
} from '@chakra-ui/react';
import { CoverImageInput } from './coverImageInput';

const HeaderModal = ({ isOpen, onClose, draftHeader, setDraftHeader }) => {
  const [descriptor, setDescriptor] = useState({ ...draftHeader.descriptor });
  const [image, setImage] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const [selectedImageDescription, setSelectedImageDescription] = useState('');

  useEffect(() => {
    if (draftHeader.image) {
      setImage({ ...draftHeader.image });
      setSelectedImageDescription(draftHeader.image.descriptor.title);
    }
  }, []);

  const onDescriptionChange = (e) => {
    setSelectedImageDescription(e.target.value);
  };
  const onImageChange = (newImage) => {
    setImage(newImage);
  };
  const handleChanges = () => {
    setDraftHeader({ ...draftHeader, descriptor: descriptor });
    if (image) {
      setDraftHeader((prevState) => ({
        ...prevState,
        image: {
          locationType: 'relative',
          location: image.location,
          descriptor: {
            subtitle: image.name,
            title: selectedImageDescription,
          },
        },
      }));
    }
    onClose();
  };
  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding={2}>
        <ModalHeader
          alignSelf="center"
          color="gray.700"
          fontFamily="Poppins"
          fontWeight="300"
        >
          Editar encabezado
        </ModalHeader>
        <ModalBody textAlign="left" paddingX={10}>
          <Box paddingBottom={6}>
            <Text
              fontSize="sm"
              fontFamily="Open Sans"
              htmlFor="title"
              marginBottom="0"
            >
              Título
            </Text>
            <Input
              type="text"
              fontSize="sm"
              value={descriptor.title}
              onChange={(el) =>
                setDescriptor({ ...descriptor, title: el.target.value })
              }
            ></Input>
          </Box>
          <Box paddingBottom={6}>
            <Text
              fontSize="sm"
              fontFamily="Open Sans"
              htmlFor="title"
              marginBottom="0"
            >
              Subtítulo
            </Text>
            <Textarea
              fontSize="sm"
              value={descriptor.subtitle}
              h="8rem"
              onChange={(el) =>
                setDescriptor({ ...descriptor, subtitle: el.target.value })
              }
            />
          </Box>
          <HStack w="100%" justifyContent="center" paddingBottom={4}>
            <HStack
              p={4}
              bgColor="gray.50"
              w="25rem"
              borderRadius="md"
              borderWidth="1px"
              justifyContent="space-evenly"
            >
              <CoverImageInput
                image={image}
                setIsImage={setIsImage}
                onImageChange={onImageChange}
              />
              <Textarea
                fontSize="sm"
                backgroundColor="white"
                id="articleImgFooter"
                w="12rem"
                h="6rem"
                value={selectedImageDescription}
                placeholder="Descripción de la imágen"
                disabled={isImage ? false : true}
                onChange={onDescriptionChange}
              />
            </HStack>
          </HStack>
          <HStack w="100%" justifyContent="center" paddingY={4}>
            <Button
              fontFamily="Poppins"
              fontWeight="400"
              colorScheme="blue"
              onClick={handleChanges}
            >
              Confirmar cambios
            </Button>
          </HStack>
        </ModalBody>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};

export { HeaderModal };
