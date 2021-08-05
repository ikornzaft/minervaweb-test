import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { Stack, Box, Spinner } from '@chakra-ui/react';

import { ArticleContent } from '../components/article/articleContent';
import { DraftMenu } from '../components/navigation/draftMenu';
import { CompleteActivityBar } from '../components/activities/completeActivityBar';

const Loader = () => (
  <Box height="50vh" paddingTop={24}>
    <Spinner color="blue.500" emptyColor="gray.200" size="xl" speed="0.65s" thickness="4px" />
  </Box>
);

const Article = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef();
  const param = useParams();
  const [article, setArticle] = useState([]);

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
          entityRef: { publicId: param.id },
        },
      }),
    };

    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(url, jsonMessage);

        if (res.status >= 400 && res.status < 600) setError('Bad response from server');
        const resJson = await res.json();

        setArticle([resJson.message.entity]);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [param.id]);

  const { pathname } = useLocation();

  useEffect(() => {
    containerRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [pathname]);

  return (
    <Stack ref={containerRef} alignItems="center" marginTop={4} paddingBottom={6}>
      {localStorage.getItem('isEditor') === 'true' ? <DraftMenu /> : null}
      {history.location.state ? <CompleteActivityBar /> : null}

      {isLoading ? (
        <Loader />
      ) : (
        article.map((art, index) => <ArticleContent key={index} article={art} />)
      )}
    </Stack>
  );
};

export { Article };
