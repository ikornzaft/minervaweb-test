import React, { useRef } from 'react';
import {
  Stack,
  Image,
  Heading,
  Container,
  Text,
  Box,
  Badge,
  HStack,
} from '@chakra-ui/react';
import { ParagraphPopover } from './paragraphPopover';
import fallBackImg from '../../assets/images/Online-Tutor.svg';
import { CreateAreaBadge } from '../common/createAreaBadge';
import { SectionsList } from '../article/sectionsList';
import { ParagraphItemDisplay } from './paragraphItemDisplay';
import { LABELS } from '../../locals/sp/labels';

const ArticleContent = ({ article, requests, setRequests }) => {
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
  const articleDate = new Date(
    article.logs.inserted.timestamp
  ).toLocaleDateString('es-Es', options);
  const badge = CreateAreaBadge(article.resource.workarea.publicId);
  return (
    <>
      {article ? (
        <>
          <Stack
            maxWidth="45rem"
            paddingTop={12}
            paddingBottom={6}
            alignItems="flex-start"
            textAlign="left"
          >
            <Stack textAlign="left" paddingBottom={2}>
              <Box paddingTop={8}>
                <Text fontSize="xs" color="gray.500">
                  Publicado: {articleDate}
                </Text>
              </Box>
              <Heading as="h1" fontSize="4xl">
                {article.resource.articleHeader.descriptor.title}
              </Heading>
              <Heading as="h4" size="sm" fontWeight="100" lineHeight="1.5rem">
                {article.resource.articleHeader.descriptor.subtitle}
              </Heading>
              <Box>
                <Badge paddingX={2} colorScheme={badge.color}>
                  {badge.content}
                </Badge>
              </Box>
            </Stack>
            <Image
              width="100%"
              objectFit="cover"
              borderRadius="lg"
              src={cover}
              alt={LABELS.ACTIVITIES.ACTIVITY.IMAGE_ALT}
              fallbackSrc={fallBackImg}
            />

            <HStack justifyContent="flex-end" w="42rem">
              {footer ? (
                <Text fontSize="xs" color="gray.500">
                  Imágen: {footer}
                </Text>
              ) : null}
            </HStack>
          </Stack>
          <Stack alignItems="center">
            {article.resource.paragraphs.map((el, id) => (
              <Stack width="50rem" paddingLeft={6} direction="row" role="group">
                <Container maxWidth="90ch">
                  {!el.content ? (
                    <Box paddingBottom={4}>
                      <Text fontFamily="Open Sans" fontSize="sm">
                        {el.descriptor.description}
                      </Text>
                    </Box>
                  ) : (
                    <HStack w="100%" justifyContent="center">
                      <ParagraphItemDisplay item={el} />
                    </HStack>
                  )}
                </Container>
                <Stack width="1rem" justifyContent="center" alignItems="center">
                  <ParagraphPopover
                    requests={requests}
                    paragraphId={id}
                    articleId={article.header.publicId}
                    area={article.resource.workarea.publicId}
                    articleTitle={
                      article.resource.articleHeader.descriptor.title
                    }
                    articleSubtitle={
                      article.resource.articleHeader.descriptor.subtitle
                    }
                    setRequests={setRequests}
                    header={LABELS.ARTICLE.POPOVER.TITLE}
                  />
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
