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
} from '@chakra-ui/react';

import { FetchComponent } from './fetchComponent';

const PublishWorkgroupSelector = ({ isOpen, onClose }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [content, setContent] = useState([]);
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
      const method = `mods/${selectContentType().type}/handlers/${selectContentType().method}`;
      const message = {
        entity: { publicId: param.id },
        workgroup: { publicId: selectedGroup },
      };
      const successToastTitle = 'Artículo compartido';
      const successToastDescription = `${
        selectContentType().label
      } se compartió al grupo ${selectedGroup}`;
      const errorToastTitle = `${selectContentType().label} no pudo compartirse.`;

      FetchComponent(
        method,
        message,
        setIsLoading,
        setError,
        setContent,
        successToastTitle,
        successToastDescription,
        errorToastTitle
      );

      setSelectedGroup(null);
      onClose();
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

export { PublishWorkgroupSelector };
