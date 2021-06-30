import React, { useState, useRef } from 'react';
import {
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  Textarea,
  Button,
  createStandaloneToast,
} from '@chakra-ui/react';
import { LABELS } from '../../locals/sp/labels';
import { v4 as uuidv4 } from 'uuid';

import { FaQuestion } from 'react-icons/fa';
const ParagraphPopover = ({
  header,
  paragraphId,
  articleId,
  area,
  requests,
  setRequests,
  articleTitle,
  articleSubtitle,
}) => {
  const [question, setQuestion] = useState('');
  const initialFocusRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(area);

    const url = 'http://afatecha.com:8080/minerva-server-web/minerva/perform';
    const credentials = localStorage.getItem('credentials');
    const questionId = uuidv4();
    const newEntry = {
      id: 'msgid-1',
      target: 'soa@service/minerva',
      method: 'mods/questions/handlers/InsertQuestion',
      requester: 'root:YWNhY2lhITIwMTc=',
      principal: credentials,
      message: {
        entity: {
          resource: {
            articleHeader: {
              descriptor: {
                subtitle: paragraphId,
                title: articleTitle,
              },
            },

            paragraphs: [
              {
                descriptor: {
                  title: question,
                },
                content: {
                  link: {
                    type: 'article',
                    locationType: 'relative',
                    location: `http://www.afatecha.com/article/${articleId}`,
                  },
                },
              },
            ],

            workarea: { publicId: area },
          },
          header: { publicId: questionId },
        },
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
        console.log(newEntry)
        const response = await fetch(url, jsonMessage);
        if (response.status >= 400 && response.status < 600)
          setError('Bad response from server');
        const resJson = await response.json();
        console.log(resJson);
        setServerResponse(resJson);
        toast({
          title: 'Consulta enviada.',
          description: 'Se creó un nuevo consulta.',
          status: 'success',
          duration: 2500,
          isClosable: true,
        });

      } catch (err) {
        error = err;
        toast({
          title: 'Se produjo un error al crear la consulta',
          description: error,
          status: 'error',
          duration: 2500,
          isClosable: true,
        });
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    setRequests((requests) => [...requests, question]);

  };

  const questionForm = ({ onClose }) => (
    <form onSubmit={handleSubmit}>
      <Textarea
        ref={initialFocusRef}
        fontFamily="Open Sans"
        fontSize="sm"
        backgroundColor="white"
        id="question"
        name="question"
        value={question}
        onChange={(el) => setQuestion(el.target.value)}
        placeholder={LABELS.ARTICLE.POPOVER.PLACEHOLDER}
      />
      <Button
        marginY={3}
        size="sm"
        variant="primary"
        type="submit"
        onClick={onClose}
      >
        {LABELS.ARTICLE.POPOVER.BUTON_CONTENT}
      </Button>
    </form>
  );

  return (
    <Popover initialFocusRef={initialFocusRef}>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <IconButton
              size="sm"
              bg="primary"
              color="white"
              visibility="hidden"
              _groupHover={{ visibility: 'visible' }}
              isRound={true}
              icon={<FaQuestion />}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader paddingX={4} fontSize="sm">
              {header}
            </PopoverHeader>
            <PopoverBody textAlign="center">
              {questionForm((onClose = { onClose }))}
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};

export { ParagraphPopover };
