import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Text, Stack, Box, Spinner } from '@chakra-ui/react';
import { ParagraphItemDisplay } from '../article/paragraphs/paragraphItemDisplay';

const RequestReference = ({ articleId, articleParagraph }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paragraph, setParagraph] = useState([]);
  const param = useParams();

  const Loader = () => (
    <Box paddingTop={24} height="50vh">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Box>
  );

  useEffect(() => {
    const url = 'http://afatecha.com:8080/minerva-server-web/minerva/perform';
    const credentials = localStorage.getItem('credentials');
    const jsonMessage = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        id: 'msgid-1',
        target: 'soa@service/minerva',
        method: 'mods/articles/handlers/GetArticle',
        requester: 'root:YWNhY2lhITIwMTc=',
        principal: credentials,

        message: {
          entityRef: { publicId: articleId },
        },
      }),
    };

    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(url, jsonMessage);
        if (res.status >= 400 && res.status < 600)
          setError('Bad response from server');
        const resJson = await res.json();
        setParagraph(
          resJson.message.entity.resource.paragraphs[articleParagraph]
        );
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [param.id]);

  const displayParagraph = () => {
    if (paragraph.content) {
      return (
        <Box>
          <ParagraphItemDisplay item={paragraph} />
        </Box>
      );
    } else {
      if (paragraph.descriptor)
        return (
          <Box p={4}>
            <Text fontSize="xs" color="gray.500">
              {paragraph.descriptor.description}
            </Text>
          </Box>
        );
    }
  };

  return (
    <Stack w="100%" h="100%">
      {isLoading ? <Loader /> : displayParagraph()}
    </Stack>
  );
};

export { RequestReference };
