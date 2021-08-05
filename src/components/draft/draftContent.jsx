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
import { FaEdit } from 'react-icons/fa';

import fallBackImg from '../../assets/images/Online-Tutor.svg';
import { ParagraphItemDisplay } from '../article/paragraphs/paragraphItemDisplay';
import { DisplayKnowMore } from '../article/displayKnowMore';
import { DisplayToDo } from '../article/displayToDo';
import { LABELS } from '../../locals/sp/labels';

import { HeaderModal } from './headerModal';
import { ContentModal } from './contentModal';
import { KnowMoreModal } from './knowMoreModal';
import { TodoInputModal } from './todoInputModal';

const DraftContent = ({ draft, setArticleHeader, setParagraphs, setSections }) => {
  const [draftHeader, setDraftHeader] = useState({
    ...draft.resource.articleHeader,
  });
  const [draftContent, setDraftContent] = useState([...draft.resource.paragraphs]);
  const [draftKnowMore, setDraftKnowMore] = useState([...draft.resource.sections[0].contents]);

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
        alignItems="flex-start"
        maxWidth="49rem"
        paddingBottom={6}
        paddingTop={24}
        textAlign="left"
      >
        <VStack
          alignItems="flex-start"
          bg="gray.100"
          borderColor="gray.300"
          borderRadius="lg"
          borderWidth="1px"
          paddingX="2rem"
          paddingY="2rem"
          w="49rem"
        >
          <HStack justifyContent="flex-end" paddingBottom="1rem" w="100%">
            <Button
              bg="white"
              color="blue.600"
              colorScheme="gray"
              fontWeight="400"
              rightIcon={<FaEdit />}
              size="sm"
              variant="outline"
              w="11rem"
              onClick={handleHeaderModal}
            >
              Editar encabezado
            </Button>
          </HStack>
          <Stack paddingBottom={2} textAlign="left">
            <Heading as="h1" fontSize="4xl">
              {draftHeader.descriptor.title}
            </Heading>
            <Heading as="h4" fontWeight="100" lineHeight="1.5rem" size="sm">
              {draftHeader.descriptor.subtitle}
            </Heading>
          </Stack>

          {draftHeader.image ? (
            <>
              <Image
                alt={LABELS.ACTIVITIES.ACTIVITY.IMAGE_ALT}
                borderRadius="lg"
                fallbackSrc={fallBackImg}
                objectFit="cover"
                src={cover}
                width="100%"
              />
              <HStack justifyContent="flex-end" w="42rem">
                {footer ? (
                  <Text color="gray.500" fontSize="xs">
                    Imágen: {footer}
                  </Text>
                ) : null}
              </HStack>
            </>
          ) : null}
        </VStack>
      </Stack>
      <VStack
        bg="gray.100"
        borderColor="gray.300"
        borderRadius="lg"
        borderWidth="1px"
        maxWidth="49rem"
        paddingX="2rem"
        paddingY="2rem"
      >
        <HStack justifyContent="flex-end" paddingBottom="2rem" w="100%">
          <Button
            bg="white"
            color="blue.600"
            colorScheme="gray"
            fontWeight="400"
            rightIcon={<FaEdit />}
            size="sm"
            variant="outline"
            w="11rem"
            onClick={handleContentModal}
          >
            Editar contenido
          </Button>
        </HStack>
        {draftContent.map((el, id) => (
          <Stack key={id} direction="row" paddingLeft={6} role="group" width="50rem">
            <Container maxWidth="90ch">
              {!el.content ? (
                <Box paddingBottom={4}>
                  <Text fontFamily="Open Sans" fontSize="sm">
                    {el.descriptor.description}
                  </Text>
                </Box>
              ) : (
                <HStack justifyContent="center" w="100%">
                  <ParagraphItemDisplay item={el} />
                </HStack>
              )}
            </Container>
          </Stack>
        ))}
      </VStack>
      <Box paddingTop={6}>
        <VStack
          bg="gray.100"
          borderColor="gray.300"
          borderRadius="lg"
          borderWidth="1px"
          maxWidth="49rem"
          paddingBottom="1rem"
          paddingTop="2rem"
          paddingX="2rem"
        >
          <HStack justifyContent="flex-end" w="100%">
            <Button
              bg="white"
              color="blue.600"
              colorScheme="gray"
              fontWeight="400"
              rightIcon={<FaEdit />}
              size="sm"
              variant="outline"
              w="12rem"
              onClick={handleKnowMoreModal}
            >
              Editar &quot;Saber Más&quot;
            </Button>
          </HStack>
          <VStack bgColor="gray.100" borderRadius="lg" paddingBottom={4} paddingX={8} w="45rem">
            {draftKnowMore.length > 0 ? <DisplayKnowMore sections={draftKnowMore} /> : null}
          </VStack>
        </VStack>
      </Box>

      <Box paddingY={6}>
        <VStack
          bg="gray.100"
          borderColor="gray.300"
          borderRadius="lg"
          borderWidth="1px"
          maxWidth="49rem"
          paddingBottom="1rem"
          paddingTop="2rem"
          paddingX="2rem"
        >
          <HStack justifyContent="flex-end" w="100%">
            <Button
              bg="white"
              color="blue.600"
              colorScheme="gray"
              fontWeight="400"
              rightIcon={<FaEdit />}
              size="sm"
              variant="outline"
              w="12rem"
              onClick={handleToDoModal}
            >
              Editar &quot;Para Hacer&quot;
            </Button>
          </HStack>
          <VStack bgColor="gray.100" borderRadius="lg" paddingBottom={4} paddingX={8} w="45rem">
            {draftToDo.length > 0 ? <DisplayToDo sections={draftToDo} /> : null}
          </VStack>
        </VStack>
      </Box>
      <HeaderModal
        draftHeader={draftHeader}
        isOpen={isOpenHeaderModal}
        setDraftHeader={setDraftHeader}
        onClose={onCloseHeaderModal}
      />
      <ContentModal
        draftContent={draftContent}
        isOpen={isOpenContentModal}
        setDraftContent={setDraftContent}
        onClose={onCloseContentModal}
      />
      <KnowMoreModal
        area={draft.resource.workarea.publicId}
        draftKnowMore={draftKnowMore}
        isOpen={isOpenKnowMoreModal}
        setDraftKnowMore={setDraftKnowMore}
        onClose={onCloseKnowMoreModal}
      />
      <TodoInputModal
        draftToDo={draftToDo}
        isOpen={isOpenToDoModal}
        selectedExams={selectedExams}
        selectedHomeworks={selectedHomeworks}
        selectedQuizzes={selectedQuizzes}
        setDraftToDo={setDraftToDo}
        setSelectedExams={setSelectedExams}
        setSelectedHomeworks={setSelectedHomeworks}
        setSelectedQuizzes={setSelectedQuizzes}
        onClose={onCloseToDoModal}
      />
    </>
  );
};

export { DraftContent };
