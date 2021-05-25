import React, { useState } from 'react';
import { MultipageFormStep1 } from './multipageFormStep1';
import { LABELS } from '../locals/sp/labels';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Input,
} from '@chakra-ui/react';

const MultipageFormModal = ({
  isOpen,
  onClose,
  modalTitle,
  closeButtonText,
  secondButtonText,
  secondButtonAction,
}) => {
  const [formStep, setFormStep] = useState(2);
  const renderStep = () => {
    if (formStep === 1) {
      return (
        <MultipageFormStep1
          firstFieldLabel={
            LABELS.TOP_MENU.MENU.RIGHT_DRAWER.NEW_ACTIVITY_MODAL.FORM_INPUT_1
          }
          firstFieldType="text"
          firstFieldId="nombre_actividad"
          buttonText={
            LABELS.TOP_MENU.MENU.RIGHT_DRAWER.NEW_ACTIVITY_MODAL.FORM_BUTTON
          }
        />
      );
    }
    if (formStep === 2) {
      return <h1>HOLA</h1>;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(e.target);
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding={2}>
        <ModalHeader alignSelf="center">{modalTitle}</ModalHeader>
        <ModalBody textAlign="center">
          <form method="GET" onSubmit={handleSubmit}>
            {renderStep()}
            <Input variant="filled" type="text"></Input>
          </form>
        </ModalBody>
        <ModalCloseButton />
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            {closeButtonText ? closeButtonText : 'Cerrar'}
          </Button>

            <Button variant="ghost" type="submit" onClick={handleSubmit}>
              Enviar
            </Button>

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { MultipageFormModal };
