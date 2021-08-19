import React, { useState, useEffect } from 'react';
import { Stack, Badge, Text, Image, Heading, Box } from '@chakra-ui/react';

import { LABELS } from '../../locals/sp/labels';
import fallBackImg from '../../assets/images/Online-Tutor.svg';
import { ParagraphReducer } from '../common/paragraphReducer';
import { useCreateAreaBadge } from '../../hooks/useCreateAreaBadge';

const SectionItem = ({ article }) => {
  const area = article.workArea;
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  const date = new Date(article.logs.inserted.timestamp).toLocaleDateString('es-Es', options);
  const image = article.resource.articleHeader.imageLink;

  const badge = useCreateAreaBadge(area);

  return (
    <Stack
      _hover={{ bg: 'gray.100' }}
      alignItems="flex-start"
      bgColor="gray.50"
      borderRadius="lg"
      borderStyle="solid"
      borderWidth="1px"
      direction="row"
      justifyContent="flex-start"
      maxHeight="125px"
      overflow="hidden"
      width="50rem"
    >
      <Image
        alt={LABELS.ACTIVIDADES.ACTIVIDAD.IMAGE_ALT}
        boxSize="125px"
        fallbackSrc={fallBackImg}
        objectFit="cover"
        src={image}
      />
      <Stack justifyContent="flex-start" width="100%">
        <Stack
          alignItems="center"
          borderBottomStyle="solid"
          borderBottomWidth="1px"
          direction="row"
          justifyContent="flex-start"
          marginX={2}
          paddingX={2}
          paddingY="2px"
        >
          <Badge colorScheme={badge.color} paddingX={2}>
            {badge.content}
          </Badge>
          <Text fontSize="sm">{date}</Text>
        </Stack>
        <Stack alignItems="center" direction="row" paddingX={4} width="100%">
          <Stack alignItems="flex-start">
            <Heading as="h3" fontFamily="Open Sans" lineHeight="0.7rem" marginLeft={0} size="sm">
              {article.resource.articleHeader.descriptor.title}
            </Heading>
            <Box marginTop="0" paddingLeft={0} textAlign="left">
              <Text as="h5" fontFamily="Open Sans" fontSize="sm" fontWeight="400">
                {ParagraphReducer(article.resource.articleHeader.descriptor.subtitle)}
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export { SectionItem };
