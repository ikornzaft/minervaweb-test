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
        <ModalHeader alignSelf="center" color="gray.700" fontFamily="Poppins" fontWeight="300">
          Editar encabezado
        </ModalHeader>
        <ModalBody paddingX={10} textAlign="left">
          <Box paddingBottom={6}>
            <Text fontFamily="Open Sans" fontSize="sm" htmlFor="title" marginBottom="0">
              Título
            </Text>
            <Input
              fontSize="sm"
              type="text"
              value={descriptor.title}
              onChange={(el) => setDescriptor({ ...descriptor, title: el.target.value })}
            />
          </Box>
          <Box paddingBottom={6}>
            <Text fontFamily="Open Sans" fontSize="sm" htmlFor="title" marginBottom="0">
              Subtítulo
            </Text>
            <Textarea
              fontSize="sm"
              h="8rem"
              value={descriptor.subtitle}
              onChange={(el) => setDescriptor({ ...descriptor, subtitle: el.target.value })}
            />
          </Box>
          <HStack justifyContent="center" paddingBottom={4} w="100%">
            <HStack
              bgColor="gray.50"
              borderRadius="md"
              borderWidth="1px"
              justifyContent="space-evenly"
              p={4}
              w="25rem"
            >
              <CoverImageInput
                image={image}
                setIsImage={setIsImage}
                onImageChange={onImageChange}
              />
              <Textarea
                backgroundColor="white"
                disabled={isImage ? false : true}
                fontSize="sm"
                h="6rem"
                id="articleImgFooter"
                placeholder="Descripción de la imágen"
                value={selectedImageDescription}
                w="12rem"
                onChange={onDescriptionChange}
              />
            </HStack>
          </HStack>
          <HStack justifyContent="center" paddingY={4} w="100%">
            <Button
              colorScheme="blue"
              fontFamily="Poppins"
              fontWeight="400"
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
