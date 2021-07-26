import React, { useState, useEffect } from 'react';
import {
  Textarea,
  VStack,
  HStack,
  Button,
  createStandaloneToast,
  useDisclosure,
} from '@chakra-ui/react';
import { KnowMoreInputModal } from '../createArticle/sections/knowMoreInputModal';
import { AREAS } from '../../locals/sp/areas';
import { darken } from '@chakra-ui/theme-tools';
import { v4 as uuidv4 } from 'uuid';

const NewCommentInput = ({
  topicId,
  group,
  commentsNumber,
  setCommentsNumber,
}) => {
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

  const handleParagraphsChange = () => {
    setParagraphs([
      ...paragraphs,
      ...selectedArticles,
      ...knowMore,
      ...knowMoreLinks,
    ]);
  };

  const submitNewComment = () => {
    const credentials = localStorage.getItem('credentials');
    const date = new Date();
    const formatedDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
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
        if (response.status >= 400 && response.status < 600)
          setError('Bad response from server');
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
    if (paragraphs.length > 0) submitNewComment();
  }, [paragraphs]);

  return (
    <VStack w="100%" paddingTop={3} paddingX={6} justifyContent="center">
      <Textarea
        w="100%"
        autoFocus={true}
        borderColor="gray.300"
        fontSize="sm"
        placeholder="Tu comentario..."
        onChange={(el) => setNewComment(el.target.value)}
      />
      <HStack spacing={4}>
        <Button
          colorScheme="blue"
          variant="outline"
          bgColor="white"
          fontFamily="Poppins"
          fontWeight="400"
          borderRadius="lg"
          w="10rem"
          size="sm"
          onClick={knowMoreModalHandler}
        >
          + Agregar contenido
        </Button>
        <Button
          w="10rem"
          size="sm"
          variant="primary"
          _hover={
            newComment === ''
              ? { bg: 'primary' }
              : { bg: darken('primary', 10) }
          }
          onClick={handleParagraphsChange}
          isDisabled={newComment === '' ? true : false}
        >
          Publicar comentario
        </Button>
      </HStack>
      <KnowMoreInputModal
        isOpen={isOpenKnowMore}
        onClose={onCloseKnowMore}
        sectionsList={sectionsList}
        setSectionsList={setSectionsList}
        selectedArticles={selectedArticles}
        setSelectedArticles={setSelectedArticles}
        knowMore={knowMore}
        setKnowMore={setKnowMore}
        knowMoreLinks={knowMoreLinks}
        setKnowMoreLinks={setKnowMoreLinks}
        workAreas={workAreas}
        area={area}
        title="Agregar contenido"
      />
    </VStack>
  );
};

export { NewCommentInput };
