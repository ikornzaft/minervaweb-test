import React, {useState} from 'react';
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
  const [selectedGroup, setSelectedGroup] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const param = useParams();
  const storedGroups = JSON.parse(localStorage.getItem('userWorkgroups'));
  const filteredGroups = storedGroups.filter(el => el.publicId.substring(0, 4) !== 'priv')
  const handlePublish = () => {
    console.log(selectedGroup)
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
        method: 'mods/articles/handlers/PublishArticle',
        requester: 'root:YWNhY2lhITIwMTc=',
        principal: credentials,

        message: {
          entity: { publicId: param.id },
          workgroup: {publicId: selectedGroup}
        },
      }),
    };

    async function fetchData() {
      const toast = createStandaloneToast();
      try {
        setIsLoading(true);
        const res = await fetch(url, jsonMessage);
        if (res.status >= 400 && res.status < 600)
          setError('Bad response from server');
        const resJson = await res.json();
        console.log(resJson)
        toast({
          title: 'Artículo compartido',
          description: `El artículo fue compartido al grupo ${selectedGroup}`,
          status: 'success',
          duration: 2500,
          isClosable: true,
        });
      } catch (err) {
        setError(err);
        toast({
          title: 'No pudo compartirse el artículo',
          description: error,
          status: 'error',
          duration: 2500,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
        onClose();
      }
    }
    fetchData();
  }
  return (
    <Modal isOpen={isOpen} size="md" onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding={2}>
        <ModalHeader
          alignSelf="center"
          color="gray.700"
          fontFamily="Poppins"
          fontWeight="300"
        >
          Compartir en...
        </ModalHeader>
        <ModalBody textAlign="center">
        <Select borderRadius="md" size="sm" placeholder="Seleccionar grupo" onChange={e => setSelectedGroup(e.target.value)}>
        {filteredGroups.map((option) => {
          return (
            <option key={option.publicId} value={option.publicId}>
              {option.publicId}
            </option>
          );
        })}
      </Select>
        </ModalBody>
        <ModalCloseButton />
        <ModalFooter>
        <Button 
        fontFamily="Poppins"
        fontWeight="400"
        colorScheme="blue"
        onClick={handlePublish}>Compartir</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { WorkgroupSelector };
