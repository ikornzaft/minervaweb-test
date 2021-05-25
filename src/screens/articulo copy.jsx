import React, { useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Stack, Image, Heading, Text, Container } from '@chakra-ui/react';
import { ArticlesDb } from '../resources/articlesDb';
import { ItemArticulo } from '../components/itemArticulo';
import { ParagraphPopover } from '../components/paragraphPopover';
import { LABELS } from '../locals/sp/labels';
import fallBackImg from '../assets/images/Online-Tutor.svg';

const Articulo = () => {
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
      <Stack maxWidth="80%" paddingY={12} alignItems="center" textAlign="left">
        <Image
          boxSize="400px"
          objectFit="cover"
          src={article.articleHeader.imageLink}
          alt={LABELS.ACTIVIDADES.ACTIVIDAD.IMAGE_ALT}
          fallbackSrc={fallBackImg}
        />
        <Stack textAlign="left" paddingLeft="5rem">
          <Heading paddingX={4}>{article.articleHeader.articleTitle}</Heading>
          <Heading as="h4" paddingX={4} size="md">
            {article.articleHeader.articleSubtitle}
          </Heading>
          <Stack alignItems="center">
            {article.articleParagraph.map((el) => (
              <Stack direction="row" role="group">
                <Container maxWidth="75ch">
                  <Text marginBottom={4}>{el.articleContent.document}</Text>
                </Container>
                <Stack width="5rem" justifyContent="center" alignItems="center" >
                  <ParagraphPopover 
                    buttonText="Text"
                    header={LABELS.DE_TODO.POPOVER_1.HEADER}
                    body={LABELS.DE_TODO.POPOVER_1.BODY}
                  />
                </Stack>
              </Stack>
            ))}
          </Stack>
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
