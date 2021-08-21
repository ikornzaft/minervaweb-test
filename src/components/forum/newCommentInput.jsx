import React, { useState, useEffect } from 'react';
import { Textarea, VStack, HStack, Button, useDisclosure } from '@chakra-ui/react';
import { darken } from '@chakra-ui/theme-tools';
import { v4 as uuidv4 } from 'uuid';

import { KnowMoreInputModal } from '../createArticle/sections/knowMoreInputModal';
import { FetchComponent } from '../common/fetchComponent';
import { AREAS } from '../../locals/sp/areas';

const NewCommentInput = ({ topicId, group, commentsNumber, setCommentsNumber }) => {
  const [paragraphs, setParagraphs] = useState([]);
  const [disabledSubmitButton, setDisabledSubmitButton] = useState(true);
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

  useEffect(() => {
    if (sectionsList[0].contents.length > 0 || newComment !== '') {
      setDisabledSubmitButton(false);
    } else {
      setDisabledSubmitButton(true);
    }
  }, [sectionsList, newComment]);

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
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState([]);

  const submitNewComment = () => {
    const date = new Date();
    const formatedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
    const commentId = 'CT-' + formatedDate + '-' + uuidv4();
    const method = 'mods/topics/handlers/InsertTopicComment';
    const message = {
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
    };

    const successToastTitle = 'Comentario enviado.';
    const successToastDescription = '';
    const errorToastTitle = 'Se produjo un error al enviar el comentario.';

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

    setCommentsNumber(commentsNumber + 1);
    setNewComment('');
    setIsLoading(false);
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
          isDisabled={disabledSubmitButton ? true : false}
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
