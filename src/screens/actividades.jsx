import React from 'react';
import { Container, Stack, Heading } from '@chakra-ui/react';
import { Actividad } from '../components/actividad';
import { LABELS } from '../locals/sp/labels';
import { ArticlesDb } from '../resources/articlesDb';

const Actividades = () => {
  
  return (
    <Container maxWidth="container.lg" alignSelf="center" padding="0px">
      <Stack direction="column" textAlign="center">
        <Stack alignItems="center" padding={2} paddingBottom={8} spacing={6}>
          <Heading as="h3" fontSize="xl" fontWeight="100" color="gray.600">
            {LABELS.ACTIVIDADES.TITLE}
          </Heading>
          {ArticlesDb.map((actividad) => (
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
