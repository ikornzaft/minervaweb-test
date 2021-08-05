import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FilesSelector } from '../createArticle/articleContent/filesSelector';
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

const FilesUploadModal = ({
  isOpen,
  onClose,
  uploadedFiles,
  setUploadedFiles,
  title,
  setSendedAnswer,
}) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const param = useParams();
  const toast = createStandaloneToast();

  const handleAnswerSubmit = () => {
    const url = 'http://afatecha.com:8080/minerva-server-web/minerva/perform';
    const credentials = localStorage.getItem('credentials');
    const jsonMessage = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        id: 'msgid-1',
        target: 'soa@service/minerva',
        method: 'mods/homeworks/handlers/InsertHomeworkResponse',
        requester: 'root:YWNhY2lhITIwMTc=',
        principal: credentials,

        message: {
          resource: {
            paragraphs: uploadedFiles,
            worker: { publicId: localStorage.getItem('userName') },
          },
          entityRef: { publicId: param.id },
        },
      }),
    };

    async function fetchData() {
      try {
        console.log('enviando');
        setIsLoading(true);
        const res = await fetch(url, jsonMessage);
        if (res.status >= 400 && res.status < 600)
          setError('Bad response from server');
        const resJson = await res.json();
        console.log(resJson);
        if (resJson.error) {
          if (resJson.error.code === 707501) {
            toast({
              title: 'Esta tarea ya fue realizado',
              description: error,
              status: 'error',
              duration: 2500,
              isClosable: true,
            });
          }
        } else {
          toast({
            title: 'Respuesta enviada.',
            status: 'success',
            duration: 2500,
            isClosable: true,
          });
          setSendedAnswer(true);
        }
      } catch (err) {
        setError(err);
        toast({
          title: 'Se produjo un error al enviar la respuesta',
          description: error,
          status: 'error',
          duration: 2500,
          isClosable: true,
        });
      } finally {
        setUploadedFiles([]);
        setIsLoading(false);
      }
    }
    fetchData();

    onClose();
  };

  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          alignSelf="center"
          paddingBottom={2}
          color="gray.700"
          fontFamily="Poppins"
          fontWeight="300"
        >
          {title}
        </ModalHeader>
        <ModalBody>
          <FilesSelector
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
          />
        </ModalBody>
        <ModalCloseButton />
        <ModalFooter justifyContent="center">
          <Box paddingBottom={2}>
            <Button variant="primary" onClick={handleAnswerSubmit}>
              Enviar
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { FilesUploadModal };
