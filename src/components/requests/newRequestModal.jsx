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

const NewRequestModal = ({ isOpen, onClose }) => {
  
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
          Crear nueva consulta
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
           </Box> 
          
          <HStack w="100%" justifyContent="center" paddingY={4}>
          <Button 
          fontFamily="Poppins"
          fontWeight="400"
          colorScheme="blue"
          onClick={el=>console.log(el.target.value)}>Crear consulta</Button>
          </HStack>
        </ModalBody>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
}

export { NewRequestModal }
