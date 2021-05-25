import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Stack, Heading } from '@chakra-ui/react';
import { useFetchArticle } from '../hooks/useFetchArticle';
import { ArticlesDb } from '../resources/articlesDb';
import { ItemArticulo } from '../components/itemArticulo';
import { ArticleContent } from '../components/articleContent';
import { LABELS } from '../locals/sp/labels';

const Articulo = () => {
  const res = useFetchArticle('msgid-1');

  const [fetchedData, setFetchedData] = useState('');

  const param = useParams();
  const containerRef = useRef();
  const article =
    ArticlesDb[ArticlesDb.findIndex((el) => el.articleId === param.id)];
  const { pathname } = useLocation();

  useEffect(() => {
    containerRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [pathname]);
  // Esto después se va
  const filtrarPorIndex = (el) => {
    if (el.articleId !== article.articleId) {
      return true;
    } else {
      return false;
    }
  };
  const otherArticlesIndex = ArticlesDb.filter(filtrarPorIndex);
  //
  return (
    <Stack
      marginTop={4}
      alignItems="center"
      paddingBottom={6}
      ref={containerRef}
    >
      {!res.loading ? <ArticleContent article={article} article2={res.articleContent}/> : <h1>LOADING...</h1>}
      <Stack
        backgroundColor="gray.100"
        borderRadius="lg"
        maxWidth="80%"
        width="80%"
        padding={4}
      >
        <Heading as="h3" size="md" fontWeight="light">
          {LABELS.ARTICULO.SECCION.HEADING}
        </Heading>
        {otherArticlesIndex.map((el) => (
          <ItemArticulo
            articleId={el.articleId}
            title={el.articleHeader.articleTitle}
            subtitle={el.articleHeader.articleSubtitle}
            image={el.articleHeader.imageLink}
          />
        ))}
      </Stack>
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
