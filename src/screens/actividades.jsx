import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Stack, Heading } from '@chakra-ui/react';
import { Actividad } from '../components/actividad';
import { LABELS } from '../locals/sp/labels';
import { ArticlesDb } from '../resources/articlesDb';

const Actividades = () => {
  const param = useParams();
  const filterArticles = (el) => {
    if (el.activMateria.toLowerCase() === param.id) {
      return true;
    } else {
      return false;
    }
  };
  let filteredArticles = [];
  param.id
    ? (filteredArticles = ArticlesDb.filter(filterArticles))
    : (filteredArticles = ArticlesDb);
  return (
    <Container maxWidth="container.lg" alignSelf="center" padding="0px">
      <Stack direction="column" textAlign="center">
        <Stack alignItems="center" padding={2} paddingBottom={8} spacing={6}>
        <Stack direction="row">
        <Heading as="h3" fontSize="xl" fontWeight="100" color="gray.600">
          {LABELS.ACTIVIDADES.TITLE}
        </Heading>
        {param.id ? <Heading as="h3" fontSize="xl" fontWeigth="100" color="blue.500"> {param.id} </Heading> : null}
        </Stack>
          {filteredArticles.map((actividad) => (
            <Actividad
              articleId={actividad.activId}
              title={actividad.activTitulo}
              subtitle={actividad.activSubtitulo}
              group={actividad.activGrupo}
              date={actividad.activFecha}
              image={actividad.activImg}
            />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};

export { Actividades };
