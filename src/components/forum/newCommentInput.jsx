import React, { useState, useEffect } from 'react';
import {
  Textarea,
  VStack,
  HStack,
  Button,
  createStandaloneToast,
  useDisclosure,
} from '@chakra-ui/react';
import { darken } from '@chakra-ui/theme-tools';
import { v4 as uuidv4 } from 'uuid';

import { KnowMoreInputModal } from '../createArticle/sections/knowMoreInputModal';
import { AREAS } from '../../locals/sp/areas';

const NewCommentInput = ({ topicId, group, commentsNumber, setCommentsNumber }) => {
  const [paragraphs, setParagraphs] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [knowMore, setKnowMore] = useState([]);
  const [knowMoreLinks, setKnowMoreLinks] = useState([]);
  const [area, setArea] = useState(null);
  const [sectionsList, setSectionsList] = useState([
    {
      section: { publicId: '1' },
      contents: [],
    },
    {
      section: { publicId: '2' },
      contents: [],
    },
  ]);
  const [workAreas, setWorkAreas] = useState([
    { key: AREAS.area_1.tag, value: AREAS.area_1.route },
    { key: AREAS.area_2.tag, value: AREAS.area_2.route },
    { key: AREAS.area_3.tag, value: AREAS.area_3.route },
    { key: AREAS.area_4.tag, value: AREAS.area_4.route },
  ]);

  const {
    isOpen: isOpenKnowMore,
    onOpen: onOpenKnowMore,
    onClose: onCloseKnowMore,
  } = useDisclosure();

  const knowMoreModalHandler = () => {
    onCloseKnowMore();
    onOpenKnowMore();
  };

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitNewComment = () => {
    const credentials = localStorage.getItem('credentials');
    const date = new Date();
    const formatedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
    const commentId = 'CT-' + formatedDate + '-' + uuidv4();
    const newEntry = {
      id: 'msgid-1',
      target: 'soa@service/minerva',
      method: 'mods/topics/handlers/InsertTopicComment',
      requester: 'root:YWNhY2lhITIwMTc=',
      principal: credentials,
      message: {
        resource: {
          articleHeader: {
            descriptor: {
              subtitle: null,
              title: null,
              description: newComment,
            },
          },

          paragraphs: paragraphs,
          workgroup: { publicId: group },
        },
        entityRef: { publicId: topicId },
      },
    };

    const fetchData = async () => {
      const url = 'http://afatecha.com:8080/minerva-server-web/minerva/perform';

      const jsonMessage = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(newEntry),
      };

      const toast = createStandaloneToast();

      try {
        setLoading(true);
        const response = await fetch(url, jsonMessage);

        if (response.status >= 400 && response.status < 600) setError('Bad response from server');
        const resJson = await response.json();

        console.log(topicId, resJson);
        toast({
          title: 'Comentario enviado.',
          status: 'success',
          duration: 2500,
          isClosable: true,
        });
      } catch (err) {
        error = err;
        toast({
          title: 'Se produjo un error al enviar el comentario',
          description: error,
          status: 'error',
          duration: 2500,
          isClosable: true,
        });
      } finally {
        setCommentsNumber(commentsNumber + 1);
        setNewComment('');
        setLoading(false);
      }
    };

    fetchData();
  };

  useEffect(() => {
    setParagraphs([...paragraphs, ...selectedArticles, ...knowMore, ...knowMoreLinks]);
  }, [selectedArticles, knowMore, knowMoreLinks]);

  return (
    <VStack justifyContent="center" paddingTop={3} paddingX={6} w="100%">
      <Textarea
        autoFocus={true}
        borderColor="gray.300"
        fontSize="sm"
        placeholder="Tu comentario..."
        w="100%"
        onChange={(el) => setNewComment(el.target.value)}
      />
      <HStack spacing={4}>
        <Button
          bgColor="white"
          borderRadius="lg"
          colorScheme="blue"
          fontFamily="Poppins"
          fontWeight="400"
          size="sm"
          variant="outline"
          w="10rem"
          onClick={knowMoreModalHandler}
        >
          + Agregar contenido
        </Button>
        <Button
          _hover={newComment === '' ? { bg: 'primary' } : { bg: darken('primary', 10) }}
          isDisabled={newComment === '' ? true : false}
          size="sm"
          variant="primary"
          w="10rem"
          onClick={submitNewComment}
        >
          Publicar comentario
        </Button>
      </HStack>
      <KnowMoreInputModal
        area={area}
        isOpen={isOpenKnowMore}
        knowMore={knowMore}
        knowMoreLinks={knowMoreLinks}
        sectionsList={sectionsList}
        selectedArticles={selectedArticles}
        setKnowMore={setKnowMore}
        setKnowMoreLinks={setKnowMoreLinks}
        setSectionsList={setSectionsList}
        setSelectedArticles={setSelectedArticles}
        title="Agregar contenido"
        workAreas={workAreas}
        onClose={onCloseKnowMore}
      />
    </VStack>
  );
};

export { NewCommentInput };
