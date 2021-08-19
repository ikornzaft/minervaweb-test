import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Flex,
} from '@chakra-ui/react';

import { QuizzesSelector } from './quizzesSelector';

const TodoInputModal = ({
  isOpen,
  onClose,
  sectionsList,
  setSectionsList,
  selectedQuizzes,
  setSelectedQuizzes,
  workAreas,
}) => {
  const submitTodoSection = () => {
    const newList = [...sectionsList];

    newList[1].contents = selectedQuizzes;
    setSectionsList(newList);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          alignSelf="center"
          color="gray.700"
          fontFamily="Poppins"
          fontWeight="300"
          paddingBottom={2}
        >
          Agregar a Secciones
        </ModalHeader>
        <ModalBody textAlign="center">
          <QuizzesSelector
            selectedQuizzes={selectedQuizzes}
            setSelectedQuizzes={setSelectedQuizzes}
            workAreas={workAreas}
          />
        </ModalBody>
        <ModalCloseButton />
        <ModalFooter>
          <Flex justifyContent="center" paddingBottom={2} paddingX={4} w="100%">
            <Button
              colorScheme="blue"
              fontFamily="Poppins"
              fontWeight="400"
              mt={4}
              onClick={submitTodoSection}
            >
              Confirmar contenido
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { TodoInputModal };
