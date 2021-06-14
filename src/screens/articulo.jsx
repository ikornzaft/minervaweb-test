import React, { useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Stack, Heading, Box, Spinner } from '@chakra-ui/react';
import { useFetchArticle } from '../hooks/useFetchArticle';
import { ArticlesDb } from '../resources/articlesDb';
import { ItemArticulo } from '../components/itemArticulo';
import { ArticleContent } from '../components/article/articleContent';
import { LABELS } from '../locals/sp/labels';

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

const Articulo = () => {
  // const res = useFetchArticle('msgid-1');

  //ESTO DESPUÉS SE VA
  const res = {
    "loading": false,
  }


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
      {!res.loading ? (
        <ArticleContent article={article} />
      ) : (
        <Loader />
      )}

    </Stack>
  );
};

export { Articulo };

/*

  useEffect(() => {
    fetch('http://afatecha.com:8080/minerva-server-web/minerva/perform', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        'id': "msgid-1",
        'target': "soa@service/minerva",
        'method': "mods/articles/handlers/GetArticle",
        'requester': "root:YWNhY2lhITIwMTc=",
        'principal': "root:cm9vdA==",
        'message': {
      
           'entityRef': { "publicId": "test/1" }
      
        }
      }),
    })
      .then((response) => response.json())
      .then((data) => setFetchedData(data.message.entity.resource));
  }, []);


  */
