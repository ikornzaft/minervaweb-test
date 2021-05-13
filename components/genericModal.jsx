import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

const GenericModal = ({
  isOpen,
  onClose,
  modalTitle,
  modalContent,
  closeButtonText,
  secondButtonText,
  secondButtonAction,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding={4}>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalBody textAlign="center">{modalContent}</ModalBody>
        <ModalCloseButton />
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            {closeButtonText ? closeButtonText : 'Cerrar'}
          </Button>
          {secondButtonText ? (
            <Button variant="ghost" onClick={secondButtonAction}>
              {secondButtonText}
            </Button>
          ) : null}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { GenericModal };
