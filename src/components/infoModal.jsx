import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Heading,
  Container,
  Text,
  ModalCloseButton,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

const InfoModal = ({isOpen, onClose, modalTitle, modalContent}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding={4}>
        <Heading alignSelf="center" as="h4" size="sm">
          {modalTitle}
        </Heading>
        <Container paddingTop={4}>
          <Text>
            {modalContent}
          </Text>
        </Container>
        <ModalCloseButton />
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>

          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { InfoModal };
