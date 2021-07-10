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
        <ModalBody textAlign="center">
          <Input
            type="text"
            value={descriptor.title}
            onChange={(el) =>
              setDescriptor({ ...descriptor, title: el.target.value })
            }
          ></Input>
          <Textarea
            value={descriptor.subtitle}
            onChange={(el) =>
              setDescriptor({ ...descriptor, subtitle: el.target.value })
            }
          ></Textarea>
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
            value={selectedImageDescription}
            placeholder="Descripción de la imágen"
            disabled={isImage ? false : true}
            onChange={onDescriptionChange}
          />
          <Button onClick={handleChanges}>Confirmar cambios</Button>
        </ModalBody>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};

export { HeaderModal };
