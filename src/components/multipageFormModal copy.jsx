import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { MultipageFormStep1 } from './multipageFormStep1';
import { MultipageFormStep2 } from './multipageFormStep2';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  createStandaloneToast,
} from '@chakra-ui/react';

const MultipageFormModal = ({ isOpen, onClose, modalTitle }) => {
  const [data, setData] = useState({
    title: '',
    subtitle: '',
    paragraph: '',
  });

  const [newArticle, setNewArticle] = useState({});

  const [currentStep, setCurrentStep] = useState(0);

  
  const createArticle = () => {
    console.log(newArticle);
    const url =
    'http://afatecha.com:8080/minerva-server-web/minerva/perform';
    const randomId = uuidv4();
    const jsonMessage = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        id: { randomId },
        target: 'soa@service/minerva',
        method: 'mods/articles/handlers/InsertArticle',
        requester: 'root:YWNhY2lhITIwMTc=',
        principal: 'root:cm9vdA==',
        message: {
          entity: {
            header: { publicId: 'test/2' },
            resource: {
              articleHeader: {
                descriptor: {
                  title: newArticle.title,
                  subtitle: newArticle.subtitle,
                },
              },
              paragraphs: [
                {
                  descriptor: {
                    description: newArticle.paragraph,
                  },
                },
              ],
              sections: [],
            },
          },
        },
      }),
    };
    let serverResponse = {};
    let loading = true;
    let error = '';
    
    const fetchData = async () => {
      try {
        const response = await fetch(url, jsonMessage);
        if (response.status >= 400 && response.status < 600)
        error = 'Bad response from server';
        const resJson = await response.json();
        serverResponse = resJson;
      } catch (err) {
        error = err;
      } finally {
        loading = false;
      }
    };
    fetchData();
    
    return { serverResponse, error, loading };
  };
  
  useEffect(() => {
    if (newArticle.title) createArticle();
  }, [newArticle]);
  
  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (final) {
      setNewArticle(data)
      setCurrentStep(0);
      const toast = createStandaloneToast();
      toast({
        title: 'Artículo guardado.',
        description: 'Se creó un nuevo artículo.',
        status: 'success',
        duration: 2500,
        isClosable: true,
      });
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
    <MultipageFormStep2
      next={handleNextStep}
      data={data}
      prev={handlePrevStep}
    />,
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding={2}>
        <ModalHeader alignSelf="center">{modalTitle}</ModalHeader>
        <ModalBody textAlign="center">{steps[currentStep]}</ModalBody>
        <ModalCloseButton />
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export { MultipageFormModal };
