import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Select,
  ModalFooter,
  Button,
  createStandaloneToast,
} from '@chakra-ui/react';

const WorkgroupSelector = ({ isOpen, onClose }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const param = useParams();
  const groups = JSON.parse(localStorage.getItem('workgroups'));
  const filteredGroups = groups.filter((el) => !el.resource.private);

  const selectContentType = () => {
    if (param.id.slice(0, 1) === 'E')
      return {
        method: 'PublishExam',
        type: 'exams',
        label: 'El examen',
      };
    if (param.id.slice(0, 1) === 'H')
      return {
        method: 'PublishHomework',
        type: 'homeworks',
        label: 'La tarea',
      };
  };
  const handlePublish = () => {
    if (selectedGroup) {
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
          method: `mods/${selectContentType().type}/handlers/${selectContentType().method}`,
          requester: 'root:YWNhY2lhITIwMTc=',
          principal: credentials,

          message: {
            entity: { publicId: param.id },
            workgroup: { publicId: selectedGroup },
          },
        }),
      };

      async function fetchData() {
        const toast = createStandaloneToast();

        try {
          setIsLoading(true);
          const res = await fetch(url, jsonMessage);

          if (res.status >= 400 && res.status < 600) setError('Bad response from server');
          const resJson = await res.json();

          console.log(resJson);

          toast({
            title: 'Artículo compartido',
            description: `${selectContentType().label} se compartió al grupo ${selectedGroup}`,
            status: 'success',
            duration: 2500,
            isClosable: true,
          });
        } catch (err) {
          setError(err);
          toast({
            title: `${selectContentType().label} no pudo compartirse.`,
            description: error,
            status: 'error',
            duration: 2500,
            isClosable: true,
          });
        } finally {
          setIsLoading(false);
          setSelectedGroup(null);
          onClose();
        }
      }
      fetchData();
    }
  };

  return (
    <Modal isOpen={isOpen} size="md" onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding={2}>
        <ModalHeader alignSelf="center" color="gray.700" fontFamily="Poppins" fontWeight="300">
          Compartir en...
        </ModalHeader>
        <ModalBody textAlign="center">
          <Select
            borderRadius="md"
            placeholder="Seleccionar grupo"
            size="sm"
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            {filteredGroups.map((option) => {
              return (
                <option key={option.resource.descriptor.title} value={option.header.privateId}>
                  {option.resource.descriptor.title}
                </option>
              );
            })}
          </Select>
        </ModalBody>
        <ModalCloseButton />
        <ModalFooter>
          <Button colorScheme="blue" fontFamily="Poppins" fontWeight="400" onClick={handlePublish}>
            Compartir
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { WorkgroupSelector };
