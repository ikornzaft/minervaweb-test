import React, { useState, useEffect } from 'react';
import {
  Stack,
  Button,
  Image,
  Heading,
  Container,
  Text,
  Box,
  VStack,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import fallBackImg from '../../assets/images/Online-Tutor.svg';
import { ParagraphItemDisplay } from '../article/paragraphs/paragraphItemDisplay';
import { DisplayKnowMore } from '../article/displayKnowMore';
import { DisplayToDo } from '../article/displayToDo';
import { HeaderModal } from './headerModal';
import { ContentModal } from './contentModal';
import { KnowMoreModal } from './knowMoreModal';
import { TodoInputModal } from './todoInputModal';
import { FaEdit } from 'react-icons/fa';
import { LABELS } from '../../locals/sp/labels';

const DraftContent = ({
  draft,
  setArticleHeader,
  setParagraphs,
  setSections,
}) => {
  const [draftHeader, setDraftHeader] = useState({
    ...draft.resource.articleHeader,
  });
  const [draftContent, setDraftContent] = useState([
    ...draft.resource.paragraphs,
  ]);
  const [draftKnowMore, setDraftKnowMore] = useState([
    ...draft.resource.sections[0].contents,
  ]);

  const [selectedHomeworks, setSelectedHomeworks] = useState([]);
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [selectedExams, setSelectedExams] = useState([]);

  let todoArr;
  if (Array.isArray(draft.resource.sections[1].contents)) {
    todoArr = [...draft.resource.sections[1].contents];
  } else {
    todoArr = [];
  }
  const [draftToDo, setDraftToDo] = useState(todoArr);
  console.log(draft.resource);

  const {
    isOpen: isOpenHeaderModal,
    onOpen: onOpenHeaderModal,
    onClose: onCloseHeaderModal,
  } = useDisclosure();
  const {
    isOpen: isOpenContentModal,
    onOpen: onOpenContentModal,
    onClose: onCloseContentModal,
  } = useDisclosure();
  const {
    isOpen: isOpenKnowMoreModal,
    onOpen: onOpenKnowMoreModal,
    onClose: onCloseKnowMoreModal,
  } = useDisclosure();
  const {
    isOpen: isOpenToDoModal,
    onOpen: onOpenToDoModal,
    onClose: onCloseToDoModal,
  } = useDisclosure();

  let cover;
  let footer;
  if (draftHeader.image) {
    cover = `http://www.afatecha.com/id/files/image/${draftHeader.image.location}`;
    footer = draftHeader.image.descriptor.title;
  }

  const handleHeaderModal = (e) => {
    onOpenHeaderModal();
  };
  const handleContentModal = (e) => {
    onOpenContentModal();
  };
  const handleKnowMoreModal = (e) => {
    onOpenKnowMoreModal();
  };
  const handleToDoModal = (e) => {
    onOpenToDoModal();
  };

  useEffect(() => {
    setArticleHeader(draftHeader);
  }, [draftHeader]);
  useEffect(() => {
    setParagraphs(draftContent);
  }, [draftContent]);
  useEffect(() => {
    const sections = [
      {
        contents: draftKnowMore,
        section: {
          publicId: '1',
        },
      },
      {
        contents: draftToDo,
        section: {
          publicId: '2',
        },
      },
    ];
    setSections(sections);
  }, [draftKnowMore, draftToDo]);

  return (
    <>
      <Stack
        maxWidth="49rem"
        paddingTop={24}
        paddingBottom={6}
        alignItems="flex-start"
        textAlign="left"
      >
        <VStack
          w="49rem"
          alignItems="flex-start"
          bg="gray.100"
          paddingX="2rem"
          paddingY="2rem"
          borderRadius="lg"
          borderColor="gray.300"
          borderWidth="1px"
        >
          <HStack justifyContent="flex-end" paddingBottom="1rem" w="100%">
            <Button
              colorScheme="gray"
              color="blue.600"
              bg="white"
              w="11rem"
              size="sm"
              variant="outline"
              fontWeight="400"
              rightIcon={<FaEdit />}
              onClick={handleHeaderModal}
            >
              Editar encabezado
            </Button>
          </HStack>
          <Stack textAlign="left" paddingBottom={2}>
            <Heading as="h1" fontSize="4xl">
              {draftHeader.descriptor.title}
            </Heading>
            <Heading as="h4" size="sm" fontWeight="100" lineHeight="1.5rem">
              {draftHeader.descriptor.subtitle}
            </Heading>
          </Stack>

          {draftHeader.image ? (
            <>
              <Image
                width="100%"
                objectFit="cover"
                borderRadius="lg"
                src={cover}
                alt={LABELS.ACTIVITIES.ACTIVITY.IMAGE_ALT}
                fallbackSrc={fallBackImg}
              />
              <HStack justifyContent="flex-end" w="42rem">
                {footer ? (
                  <Text fontSize="xs" color="gray.500">
                    Imágen: {footer}
                  </Text>
                ) : null}
              </HStack>
            </>
          ) : null}
        </VStack>
      </Stack>
      <VStack
        maxWidth="49rem"
        bg="gray.100"
        paddingX="2rem"
        paddingY="2rem"
        borderRadius="lg"
        borderColor="gray.300"
        borderWidth="1px"
      >
        <HStack w="100%" justifyContent="flex-end" paddingBottom="2rem">
          <Button
            colorScheme="gray"
            color="blue.600"
            bg="white"
            w="11rem"
            size="sm"
            variant="outline"
            fontWeight="400"
            onClick={handleContentModal}
            rightIcon={<FaEdit />}
          >
            Editar contenido
          </Button>
        </HStack>
        {draftContent.map((el, id) => (
          <Stack width="50rem" paddingLeft={6} direction="row" role="group">
            <Container maxWidth="90ch">
              {!el.content ? (
                <Box paddingBottom={4}>
                  <Text fontFamily="Open Sans" fontSize="sm">
                    {el.descriptor.description}
                  </Text>
                </Box>
              ) : (
                <HStack w="100%" justifyContent="center">
                  <ParagraphItemDisplay item={el} />
                </HStack>
              )}
            </Container>
          </Stack>
        ))}
      </VStack>
      <Box paddingTop={6}>
        <VStack
          maxWidth="49rem"
          bg="gray.100"
          paddingX="2rem"
          paddingTop="2rem"
          paddingBottom="1rem"
          borderRadius="lg"
          borderColor="gray.300"
          borderWidth="1px"
        >
          <HStack w="100%" justifyContent="flex-end">
            <Button
              colorScheme="gray"
              color="blue.600"
              bg="white"
              w="12rem"
              size="sm"
              variant="outline"
              fontWeight="400"
              onClick={handleKnowMoreModal}
              rightIcon={<FaEdit />}
            >
              Editar "Saber Más"
            </Button>
          </HStack>
          <VStack
            bgColor="gray.100"
            borderRadius="lg"
            w="45rem"
            paddingBottom={4}
            paddingX={8}
          >
            {draftKnowMore.length > 0 ? (
              <DisplayKnowMore sections={draftKnowMore} />
            ) : null}
          </VStack>
        </VStack>
      </Box>

      <Box paddingY={6}>
        <VStack
          maxWidth="49rem"
          bg="gray.100"
          paddingX="2rem"
          paddingTop="2rem"
          paddingBottom="1rem"
          borderRadius="lg"
          borderColor="gray.300"
          borderWidth="1px"
        >
          <HStack w="100%" justifyContent="flex-end">
            <Button
              colorScheme="gray"
              color="blue.600"
              bg="white"
              w="12rem"
              size="sm"
              variant="outline"
              fontWeight="400"
              onClick={handleToDoModal}
              rightIcon={<FaEdit />}
            >
              Editar "Para Hacer"
            </Button>
          </HStack>
          <VStack
            bgColor="gray.100"
            borderRadius="lg"
            w="45rem"
            paddingBottom={4}
            paddingX={8}
          >
            {draftToDo.length > 0 ? <DisplayToDo sections={draftToDo} /> : null}
          </VStack>
        </VStack>
      </Box>
      <HeaderModal
        isOpen={isOpenHeaderModal}
        onClose={onCloseHeaderModal}
        draftHeader={draftHeader}
        setDraftHeader={setDraftHeader}
      />
      <ContentModal
        isOpen={isOpenContentModal}
        onClose={onCloseContentModal}
        draftContent={draftContent}
        setDraftContent={setDraftContent}
      />
      <KnowMoreModal
        isOpen={isOpenKnowMoreModal}
        onClose={onCloseKnowMoreModal}
        draftKnowMore={draftKnowMore}
        setDraftKnowMore={setDraftKnowMore}
        area={draft.resource.workarea.publicId}
      />
      <TodoInputModal
        isOpen={isOpenToDoModal}
        onClose={onCloseToDoModal}
        draftToDo={draftToDo}
        setDraftToDo={setDraftToDo}
        selectedHomeworks={selectedHomeworks}
        setSelectedHomeworks={setSelectedHomeworks}
        selectedQuizzes={selectedQuizzes}
        setSelectedQuizzes={setSelectedQuizzes}
        selectedExams={selectedExams}
        setSelectedExams={setSelectedExams}
      />
    </>
  );
};

export { DraftContent };
