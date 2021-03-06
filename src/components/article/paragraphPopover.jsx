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
  Box,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { FaQuestion } from 'react-icons/fa';

import { LABELS } from '../../locals/sp/labels';
const ParagraphPopover = ({ header, paragraphId, articleId, area, articleTitle }) => {
  const [question, setQuestion] = useState('');
  const initialFocusRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const credentials = localStorage.getItem('credentials');
    const date = new Date();
    const formatedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
    const questionId = 'Q-' + formatedDate + '-' + uuidv4();
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
                subtitle: paragraphId.toString(),
                title: articleTitle,
                description: question,
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
                    location: { articleId },
                  },
                },
              },
            ],

            workarea: { publicId: area },
            workgroup: { publicId: 'aula/test_a/quinto' },
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
        const response = await fetch(url, jsonMessage);

        if (response.status >= 400 && response.status < 600) setError('Bad response from server');
        const resJson = await response.json();

        toast({
          title: 'Consulta enviada.',
          description: 'Se cre?? un nuevo consulta.',
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
      } finally {
        setLoading(false);
        setQuestion('');
      }
    };

    fetchData();
  };

  const questionForm = ({ onClose }) => (
    <form onSubmit={handleSubmit}>
      <Textarea
        ref={initialFocusRef}
        backgroundColor="white"
        fontFamily="Open Sans"
        fontSize="sm"
        id="question"
        name="question"
        placeholder={LABELS.ARTICLE.POPOVER.PLACEHOLDER}
        value={question}
        onChange={(el) => setQuestion(el.target.value)}
      />
      <Box paddingY={3}>
        <Button size="sm" type="submit" variant="primary" onClick={onClose}>
          {LABELS.ARTICLE.POPOVER.BUTON_CONTENT}
        </Button>
      </Box>
    </form>
  );

  return (
    <Popover initialFocusRef={initialFocusRef}>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger zIndex="1">
            <IconButton
              _groupHover={{ visibility: 'visible' }}
              bg="primary"
              color="white"
              icon={<FaQuestion />}
              isRound={true}
              size="sm"
              visibility="hidden"
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader fontSize="sm" paddingX={4}>
              {header}
            </PopoverHeader>
            <PopoverBody textAlign="center">{questionForm((onClose = { onClose }))}</PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};

export { ParagraphPopover };
