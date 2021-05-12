import React from 'react';
import { useHistory } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import {
  Container,
  Stack,
  Heading,
  Button,
  Flex,
  Image,
  useDisclosure,
  Spinner,
} from '@chakra-ui/react';
import { GenericModal } from '../components/genericModal';
import { GenericForm } from '../components/genericForm';

const MixedElements = () => {
  const dogFetch = useFetch();
  const history = useHistory();
  const {
    isOpen: isOpenInfo,
    onOpen: onOpenInfo,
    onClose: onCloseInfo,
  } = useDisclosure();
  const {
    isOpen: isOpenDog,
    onOpen: onOpenDog,
    onClose: onCloseDog,
  } = useDisclosure();
  const {
    isOpen: isOpenForm,
    onOpen: onOpenForm,
    onClose: onCloseForm,
  } = useDisclosure();
  const {
    isOpen: isOpenLoader,
    onOpen: onOpenLoader,
    onClose: onCloseLoader,
  } = useDisclosure();
  const modalTitle = 'Acá hay más información';
  const modalContent =
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam rerum iure a aut obcaecati doloribus natus explicabo possimus magni, ipsa cum iste officia esse eum quia eaque reiciendis veniam? Dignissimos.';
  const handleSubmit = (e) => {
    if (e.target.id === 'toFeedBtn') history.push('/feed/');
    if (e.target.id === 'toFormBtn') history.push('/form/');
  };
  return (
    <Container
      maxWidth="container.lg"
      alignSelf="center"
      backgroundColor="gray.50"
      padding="0px"
    >
      <GenericModal
        isOpen={isOpenInfo}
        onClose={onCloseInfo}
        modalTitle={modalTitle}
        modalContent={modalContent}
        secondButtonText="Seguir"
      />
      <GenericModal
        isOpen={isOpenDog}
        onClose={onCloseDog}
        modalTitle="Un perro"
        modalContent={
          <Image objectFit="cover" src={dogFetch.dogImage} alt="Un perro" />
        }
      />
      <GenericModal
        isOpen={isOpenForm}
        onClose={onCloseForm}
        modalTitle="Soy un form genérico"
        modalContent={<GenericForm />}
      />
      <GenericModal
        isOpen={isOpenLoader}
        onClose={onCloseLoader}
        modalTitle="Cargando por siempre..."
        modalContent={<Spinner />}
      />
      <Stack direction="column" textAlign="center">
        <Stack
          backgroundColor="gray.50"
          alignItems="center"
          padding={2}
          paddingBottom={8}
          spacing={6}
        >
          <Heading>Acá hay links y botones</Heading>
          <Flex
            backgroundColor="white"
            width="80%"
            padding={8}
            justifyContent="space-evenly"
            alignItems="center"
            direction="column"
          >
            <Flex
              width="20rem"
              borderColor="gray.500"
              borderWidth="2px"
              borderRadius="lg"
              padding={4}
              justifyContent="space-evenly"
            >
              <Heading as="h4" size="md">
                ¿A dónde querés ir?
              </Heading>
              <Button
                colorScheme="blue"
                mr="4"
                id="toFeedBtn"
                onClick={handleSubmit}
              >
                Feed
              </Button>
              <Button
                colorScheme="blue"
                mr="4"
                id="toFormBtn"
                onClick={handleSubmit}
              >
                Form
              </Button>
            </Flex>
            <Flex
              width="20rem"
              direction="column"
              padding={4}
              justifyContent="flex-start"
            >
              <Button
                colorScheme="blue"
                mr="4"
                id="toFeedBtn"
                onClick={onOpenInfo}
                marginBottom="1rem"
              >
                Más información
              </Button>
              <Button
                colorScheme="blue"
                mr="4"
                id="toFeedBtn"
                onClick={onOpenDog}
              >
                ¿Querés un perro?
              </Button>
            </Flex>
            <Flex
              width="20rem"
              borderColor="gray.500"
              borderWidth="2px"
              borderRadius="lg"
              padding={4}
              justifyContent="space-evenly"
            >
              <Heading as="h4" size="md">
                Más cosas...
              </Heading>
              <Button
                colorScheme="blue"
                mr="4"
                id="toFeedBtn"
                onClick={onOpenForm}
              >
                Otro form
              </Button>
              <Button
                colorScheme="blue"
                mr="4"
                id="toFormBtn"
                onClick={onOpenLoader}
              >
                Loader
              </Button>
            </Flex>
          </Flex>
        </Stack>
      </Stack>
    </Container>
  );
};

export { MixedElements };
