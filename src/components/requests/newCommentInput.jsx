import React, { useState } from 'react';
import { Textarea, VStack, Button, createStandaloneToast } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

const NewCommentInput = ({ questionId, area, commentsNumber, setCommentsNumber }) => {
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleNewComment = () => {
    const credentials = localStorage.getItem('credentials');
    const date = new Date();
    const formatedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
    const commentId = 'CQ-' + formatedDate + '-' + uuidv4();
    const newEntry = {
      id: 'msgid-1',
      target: 'soa@service/minerva',
      method: 'mods/questions/handlers/InsertQuestionComment',
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

          paragraphs: [
            {
              descriptor: {
                title: newComment,
              },
            },
          ],

          workarea: { publicId: area },
        },
        entityRef: { publicId: questionId },
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
      <Button size="sm" variant="primary" w="10rem" onClick={handleNewComment}>
        Agregar comentario
      </Button>
    </VStack>
  );
};

export { NewCommentInput };
