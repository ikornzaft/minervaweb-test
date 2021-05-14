import React, { useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Stack, Image, Heading, Text, Container } from '@chakra-ui/react';
import { ArticlesDb } from '../resources/articlesDb';
import { ItemArticulo } from '../components/itemArticulo';
import { LABELS } from '../locals/sp/labels';
import fallBackImg from '../assets/images/Online-Tutor.svg';

const Articulo = () => {
  const param = useParams();
  const imageRef = useRef();
  const article =
    ArticlesDb[ArticlesDb.findIndex((el) => el.activId === param.id)];
  const { pathname } = useLocation();

  useEffect(() => {
    imageRef.current.scrollIntoView({ behavior: 'smooth' });
    console.log('Hey!');
  }, [pathname]);
  // Esto después se va
  const filtrarPorIndex = (el) => {
    if (el.activId !== article.activId) {
      return true;
    } else {
      return false;
    }
  };
  const otherArticlesIndex = ArticlesDb.filter(filtrarPorIndex);
  //
  return (
    <Stack marginTop={4} alignItems="center" paddingBottom={6} ref={imageRef}>
      <Stack maxWidth="80%" paddingY={4} alignItems="center" textAlign="left">
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
            articleId={el.activId}
            title={el.activTitulo}
            subtitle={el.activSubtitulo}
            image={el.activImg}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export { Articulo };