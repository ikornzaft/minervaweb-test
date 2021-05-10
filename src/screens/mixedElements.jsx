import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Stack,
  Heading,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Text,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';

const MixedElements = () => {
  const history = useHistory();
  const {
    isOpen: isOpenInfo,
    onOpen: onOpenInfo,
    onClose: onCloseInfo,
  } = useDisclosure();
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
      <Modal isOpen={isOpenInfo} onClose={onCloseInfo}>
        <ModalOverlay />
        <ModalContent padding={4}>
          <Heading alignSelf="center" as="h4" size="sm">
            Acá hay más información
          </Heading>
          <Container paddingTop={4}>
            <Text>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Laboriosam rerum iure a aut obcaecati doloribus natus explicabo
              possimus magni, ipsa cum iste officia esse eum quia eaque
              reiciendis veniam? Dignissimos.
            </Text>
          </Container>
          <ModalCloseButton />
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseInfo}>
              Close
            </Button>

            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
            justifyContent="flex-start"
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
              >
                Más información
              </Button>
            </Flex>
          </Flex>
        </Stack>
      </Stack>
    </Container>
  );
};

export { MixedElements };
