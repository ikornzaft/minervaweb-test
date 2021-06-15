import React, { useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Stack, Box, Spinner } from '@chakra-ui/react';
import { useFetchArticle } from '../hooks/useFetchArticle';
import { ArticlesDb } from '../resources/articlesDb';
import { ArticleContent } from '../components/article/articleContent';

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

const Article = ({requests, setRequests}) => {
  // const res = useFetchArticle('msgid-1');

  //ESTO DESPUÉS SE VA
  const res = {
    loading: false,
  };

  const param = useParams();
  const containerRef = useRef();
  const article =
    ArticlesDb[ArticlesDb.findIndex((el) => el.header.publicId === param.id)];
  const { pathname } = useLocation();

  useEffect(() => {
    containerRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [pathname]);
  // Esto después se va

  //
  return (
    <Stack
      marginTop={4}
      alignItems="center"
      paddingBottom={6}
      ref={containerRef}
    >
      {!res.loading ? <ArticleContent article={article} requests={requests} setRequests={setRequests} /> : <Loader />}
    </Stack>
  );
};

export { Article };
