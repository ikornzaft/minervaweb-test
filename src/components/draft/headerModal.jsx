import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  createStandaloneToast,
  FormLabel,
  FormControl,
  Button,
  Input,
  Text,
  Textarea,
  useDisclosure,
  VStack,
  Stack,
  HStack,
  Flex,
} from '@chakra-ui/react';

const HeaderModal = ({ isOpen, onClose, draftHeader, setDraftHeader }) => {
  const [descriptor, setDescriptor] = useState({ ...draftHeader.descriptor });
  const [image, setImage] = useState({ ...draftHeader.image });

  const handleChanges = () => {
    setDraftHeader({...draftHeader, descriptor: descriptor})
    onClose();
  }
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
          <Button onClick={handleChanges}>Confirmar cambios</Button>
        </ModalBody>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};

export { HeaderModal };
