import React from 'react';
import { Stack, Image, Heading, Container, Text, Box, Badge, HStack } from '@chakra-ui/react';

import fallBackImg from '../../assets/images/Online-Tutor.svg';
import { CreateAreaBadge } from '../common/createAreaBadge';
import { SectionsList } from '../article/sectionsList';
import { LABELS } from '../../locals/sp/labels';

import { ParagraphItemDisplay } from './paragraphs/paragraphItemDisplay';
import { ParagraphPopover } from './paragraphPopover';

const ArticleContent = ({ article }) => {
  let cover;
  let footer;

  if (article.resource.articleHeader.image) {
    cover = `http://www.afatecha.com/id/files/image/${article.resource.articleHeader.image.location}`;
    footer = article.resource.articleHeader.image.descriptor.title;
  } else {
    cover = fallBackImg;
    footer = null;
  }
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const articleDate = new Date(article.logs.inserted.timestamp).toLocaleDateString(
    'es-Es',
    options
  );
  const badge = CreateAreaBadge(article.resource.workarea.publicId);
  const isStudent = localStorage.getItem('isStudent');

  return (
    <>
      {article ? (
        <>
          <Stack
            alignItems="flex-start"
            maxWidth="45rem"
            paddingBottom={6}
            paddingTop={localStorage.getItem('isEditor') === 'true' ? '20' : '12'}
            textAlign="left"
          >
            <Stack paddingBottom={2} textAlign="left">
              <Box paddingTop={2}>
                <Badge colorScheme={badge.color} paddingX={2}>
                  {badge.content}
                </Badge>
              </Box>
              <Box paddingTop={1}>
                <Text color="gray.500" fontSize="xs">
                  Publicado: {articleDate}
                </Text>
              </Box>
              <Heading as="h1" fontSize="4xl">
                {article.resource.articleHeader.descriptor.title}
              </Heading>
              <Heading as="h4" fontWeight="100" lineHeight="1.5rem" size="sm">
                {article.resource.articleHeader.descriptor.subtitle}
              </Heading>
            </Stack>
            <Image
              alt={LABELS.ACTIVITIES.ACTIVITY.IMAGE_ALT}
              borderRadius="lg"
              fallbackSrc={fallBackImg}
              objectFit="cover"
              src={cover}
              width="100%"
            />

            <HStack justifyContent="flex-end" w="42rem">
              {footer ? (
                <Text color="gray.500" fontSize="xs">
                  Imágen: {footer}
                </Text>
              ) : null}
            </HStack>
          </Stack>
          <Stack alignItems="center">
            {article.resource.paragraphs.map((el, id) => (
              <Stack key={id} direction="row" paddingLeft={6} role="group" width="50rem">
                <Container maxWidth="90ch">
                  {!el.content ? (
                    <Box paddingBottom={4}>
                      <Text fontFamily="Open Sans" fontSize="sm">
                        {el.descriptor.description}
                      </Text>
                    </Box>
                  ) : (
                    <HStack justifyContent="center" w="100%">
                      <ParagraphItemDisplay item={el} />
                    </HStack>
                  )}
                </Container>
                <Stack alignItems="center" justifyContent="center" width="1rem">
                  {isStudent === 'true' ? (
                    <ParagraphPopover
                      area={article.resource.workarea.publicId}
                      articleId={article.header.publicId}
                      articleSubtitle={article.resource.articleHeader.descriptor.subtitle}
                      articleTitle={article.resource.articleHeader.descriptor.title}
                      header={LABELS.ARTICLE.POPOVER.TITLE}
                      paragraphId={id}
                    />
                  ) : null}
                </Stack>
              </Stack>
            ))}
          </Stack>
          <SectionsList sections={article.resource.sections} />
        </>
      ) : null}
    </>
  );
};

export { ArticleContent };
