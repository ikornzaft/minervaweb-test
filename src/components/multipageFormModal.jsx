import React, { useState } from 'react';
import { MultipageFormStep1 } from './multipageFormStep1';
import StepTwo from './multipageFormStep2';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from '@chakra-ui/react';

const MultipageFormModal = ({
  isOpen,
  onClose,
  modalTitle,
}) => {
  const [data, setData] = useState({
    title: '',
    subtitle: '',
  });

  const [currentStep, setCurrentStep] = useState(0);

  const makeRequest = (formData) => {
    console.log('Form submitted', formData);
    setCurrentStep(0);

  };

  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (final) {
      makeRequest(newData);
      onClose();
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <MultipageFormStep1 next={handleNextStep} data={data} />,
    <StepTwo next={handleNextStep} data={data} prev={handlePrevStep} />,
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding={2}>
        <ModalHeader alignSelf="center">{modalTitle}</ModalHeader>
        <ModalBody textAlign="center">
            {steps[currentStep]}
        </ModalBody>
        <ModalCloseButton />
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export { MultipageFormModal };
