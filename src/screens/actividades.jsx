import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Stack, Heading } from '@chakra-ui/react';
import { Actividad } from '../components/actividad';
import { LABELS } from '../locals/sp/labels';
import { ArticlesDb } from '../resources/articlesDb';

const Actividades = () => {
  const param = useParams();
  const filterArticles = (el) => {
    if (el.articleHeader.articleSubject.toLowerCase() === param.id) {
      return true;
    } else {
      return false;
    }
  };
  let filteredArticles = [];
  param.id
    ? (filteredArticles = ArticlesDb.filter(filterArticles))
    : (filteredArticles = ArticlesDb.filter(el => el.isPending));
  return (
    <Container maxWidth="container.lg" alignSelf="center" pt={12}>
      <Stack direction="column" textAlign="center">
        <Stack alignItems="center" padding={2} paddingBottom={8} spacing={6}>
        <Stack direction="row">
        <Heading as="h3" fontSize="xl" fontWeight="100" color="gray.600">
          {param.id ? LABELS.ACTIVIDADES.TITLE.SUBJECT : LABELS.ACTIVIDADES.TITLE.PENDENT}
        </Heading>
        {param.id ? <Heading as="h3" fontSize="xl" fontWeigth="100" color="blue.500"> {param.id} </Heading> : null}
        </Stack>
          {filteredArticles.map((actividad) => (
            <Actividad
              articleId={actividad.articleId}
              title={actividad.articleHeader.articleTitle}
              subtitle={actividad.articleHeader.articleSubtitle}
              group={actividad.articleHeader.articleGroup}
              date={actividad.articleHeader.articleDate}
              image={actividad.articleHeader.imageLink}
            />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};

export { Actividades };
