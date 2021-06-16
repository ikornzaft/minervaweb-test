import React from 'react';
import { useHistory, Link } from 'react-router-dom';
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
import { LABELS } from '../locals/sp/labels';

const Compartidos = () => {
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
      <Stack direction="column" textAlign="center">
        <Stack
          backgroundColor="gray.50"
          alignItems="center"
          padding={2}
          paddingBottom={8}
          spacing={6}
        >
          <Heading>{LABELS.MIXED_ELEMENTS.TITLE}</Heading>
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
              <Link to="/feed/">
                <Heading as="h4" size="md">
                  {LABELS.MIXED_ELEMENTS.SECTION_1.TITLE}
                </Heading>
              </Link>
              <Button
                colorScheme="blue"
                mr="4"
                id="toFeedBtn"
                onClick={handleSubmit}
              >
                {LABELS.MIXED_ELEMENTS.SECTION_1.BUTTON_1}
              </Button>
              <Button
                colorScheme="blue"
                mr="4"
                id="toFormBtn"
                onClick={handleSubmit}
              >
                {LABELS.MIXED_ELEMENTS.SECTION_1.BUTTON_2}
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
                id="toModal1Btn"
                onClick={onOpenInfo}
                marginBottom="1rem"
              >
                {LABELS.MIXED_ELEMENTS.MODAL_1.BUTTON_TEXT}
              </Button>
              <Button
                colorScheme="blue"
                mr="4"
                id="toModal2Btn"
                onClick={onOpenDog}
              >
                {LABELS.MIXED_ELEMENTS.MODAL_2.BUTTON_TEXT}
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
                {LABELS.MIXED_ELEMENTS.SECTION_2.TITLE}
              </Heading>
              <Button
                colorScheme="blue"
                mr="4"
                id="toFeedBtn"
                onClick={onOpenForm}
              >
                {LABELS.MIXED_ELEMENTS.SECTION_2.MODAL_3.BUTTON_TEXT}
              </Button>
              <Button
                colorScheme="blue"
                mr="4"
                id="toFormBtn"
                onClick={onOpenLoader}
              >
                {LABELS.MIXED_ELEMENTS.SECTION_2.MODAL_4.BUTTON_TEXT}
              </Button>
            </Flex>
          </Flex>
        </Stack>
      </Stack>
      <GenericModal
        isOpen={isOpenInfo}
        onClose={onCloseInfo}
        modalTitle={LABELS.MIXED_ELEMENTS.MODAL_1.TITLE}
        modalContent={LABELS.MIXED_ELEMENTS.MODAL_1.CONTENT}
        secondButtonText={LABELS.MIXED_ELEMENTS.MODAL_1.SECOND_BUTON_TEXT}
      />
      <GenericModal
        isOpen={isOpenDog}
        onClose={onCloseDog}
        modalTitle={LABELS.MIXED_ELEMENTS.MODAL_2.TITLE}
        modalContent={
          <Image objectFit="cover" src={dogFetch.dogImage} alt="Un perro" />
        }
      />
      <GenericModal
        isOpen={isOpenForm}
        onClose={onCloseForm}
        modalTitle="Soy un form genérico"
        modalContent={<GenericForm firstFieldLabel={LABELS.MIXED_ELEMENTS.SECTION_2.MODAL_3.FIRST_FIELD_LABEL} firstFieldPlaceholder={LABELS.MIXED_ELEMENTS.SECTION_2.MODAL_3.FIRST_FIELD_PLACEHOLDER} firstFieldType='text' firstFieldId='opinion' buttonText={LABELS.MIXED_ELEMENTS.SECTION_2.MODAL_3.SUBMIT_BUTTON_TEXT}  />}
      />
      <GenericModal
        isOpen={isOpenLoader}
        onClose={onCloseLoader}
        modalTitle={LABELS.MIXED_ELEMENTS.SECTION_2.MODAL_4.TITLE}
        modalContent={<Spinner />}
      />
    </Container>
  );
};

export { Compartidos };
