import React from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Image, Heading, Text, Container } from '@chakra-ui/react';
import { ArticlesDb } from '../resources/articlesDb';
import { LABELS } from '../locals/sp/labels';
import fallBackImg from '../assets/images/Online-Tutor.svg';

const Articulo = () => {
  const param = useParams();
  const article =
    ArticlesDb[ArticlesDb.findIndex((el) => el.activId === param.id)];
  return (
    <Stack marginTop={4} alignItems="center">
      <Stack
        maxWidth="80%"
        paddingY={4}
        alignItems="center" 
        textAlign="left"
      >
        <Image
          boxSize="400px"
          objectFit="cover"
          src={article.activImg}
          alt={LABELS.ACTIVIDADES.ACTIVIDAD.IMAGE_ALT}
          fallbackSrc={fallBackImg}
        />
        <Stack textAlign="left">
          <Heading paddingX={4}>{article.activTitulo}</Heading>
          <Heading as="h4" paddingX={4} size="md">
            {article.activSubtitulo}
          </Heading>
          <Container>
            <Text>{article.activContenido}</Text>
          </Container>
        </Stack>
      </Stack>
      <Stack
        backgroundColor="gray.50"
        borderRadius="lg"
        maxWidth="80%"
        paddingY={4}
      >
        <Heading as="h3" size="md" fontWeight="light">
          {LABELS.ARTICULO.SECCION.HEADING}
        </Heading>
        <Stack>
        <Image
        boxSize="125px"
        objectFit="cover"
        src={fallBackImg}
        alt={LABELS.ACTIVIDADES.ACTIVIDAD.IMAGE_ALT}
        fallbackSrc={fallBackImg}
      />
        </Stack>
      </Stack>
    </Stack>
  );
};

export { Articulo };
