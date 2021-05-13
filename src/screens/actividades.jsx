import React from 'react';
import { Container, Stack, Heading } from '@chakra-ui/react';
import { Actividad } from '../components/actividad';
import { LABELS } from '../locals/sp/labels';

const Actividades = () => {
  const actividades = [
    {
      activTitulo: 'Esta es la primera tarea',
      activSubtitulo:
        'Y esta es la descripción de esa tarea, para tener una idea de qué se trata',
      activGrupo: 'Grupo 1',
      activFecha: 'Lunes, 3 de marzo de 2021',
      activImg: 'https://source.unsplash.com/1600x900/?nature,water',
    },
    {
      activTitulo: 'Esta es otra actividad más',
      activSubtitulo: 'Más detalles de la actividad',
      activGrupo: 'Grupo 2',
      activFecha: 'Lunes, 4 de abril de 2021',
      activImg: 'https://source.unsplash.com/1600x900/?city,building',
    },
    {
      activTitulo: 'Último ejemplo de tareas',
      activSubtitulo: 'Esta es otra descripción de la actividad',
      activGrupo: 'Grupo 3',
      activFecha: 'Lunes, 5 de mayo de 2021',
    },
  ];
  return (
    <Container maxWidth="container.lg" alignSelf="center" padding="0px">
      <Stack direction="column" textAlign="center">
        <Stack alignItems="center" padding={2} paddingBottom={8} spacing={6}>
          <Heading as="h3" fontSize="xl" fontWeight="100" color="gray.600">
            {LABELS.ACTIVIDADES.TITLE}
          </Heading>
          {actividades.map((actividad) => (
            <Actividad
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
