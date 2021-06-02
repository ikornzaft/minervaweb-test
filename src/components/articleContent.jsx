import React from 'react';
import { Stack, Image, Heading, Container, Text } from '@chakra-ui/react';
import { ParagraphPopover } from './paragraphPopover';
import fallBackImg from '../assets/images/Online-Tutor.svg';
import { LABELS } from '../locals/sp/labels';

const ArticleContent = ({ article, article2 }) => {
  //console.log(article2.paragraphs[0].descriptor.description);
  return (
    <Stack maxWidth="80%" paddingY={12} alignItems="center" textAlign="left">
      <Image
        boxSize="400px"
        objectFit="cover"
        src={article.articleHeader.imageLink}
        alt={LABELS.ACTIVIDADES.ACTIVIDAD.IMAGE_ALT}
        fallbackSrc={fallBackImg}
      />
      <Stack textAlign="left" paddingLeft="5rem">
        <Heading paddingX={4}>{article2.articleHeader.descriptor.title}</Heading>
        <Heading as="h4" paddingX={4} size="md">
          {article2.articleHeader.descriptor.subtitle}
        </Heading>
        <Stack alignItems="center">
          {article2.paragraphs.map((el) => (
            <Stack direction="row" role="group">
              <Container maxWidth="75ch">
                <Text marginBottom={4}>{el.descriptor.description}</Text>
              </Container>
              <Stack width="5rem" justifyContent="center" alignItems="center">
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
  );
};

export { ArticleContent };
