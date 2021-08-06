import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Box,
  Button,
  createStandaloneToast,
} from '@chakra-ui/react';

import { FilesSelector } from '../createArticle/articleContent/filesSelector';

const FilesUploadModal = ({
  isOpen,
  onClose,
  handleChangeFilesContent,
  uploadedFiles,
  setUploadedFiles,
  title,
  index,
  setSendedAnswer,
}) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const param = useParams();
  const toast = createStandaloneToast();

  const handleAnswerSubmit = () => {
    handleChangeFilesContent(index, uploadedFiles);

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
          {title}
        </ModalHeader>
        <ModalBody>
          <FilesSelector setUploadedFiles={setUploadedFiles} uploadedFiles={uploadedFiles} />
        </ModalBody>
        <ModalCloseButton />
        <ModalFooter justifyContent="center">
          <Box paddingBottom={2}>
            <Button variant="primary" onClick={handleAnswerSubmit}>
              Confirmar
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { FilesUploadModal };
