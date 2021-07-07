import React, {useState} from 'react';
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
  console.log(draftHeader)
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
          <Input type="text" value={draftHeader.descriptor.title}></Input>
          <Textarea value={draftHeader.descriptor.subtitle}></Textarea>
        </ModalBody>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};

export { HeaderModal };
