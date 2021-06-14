import React, { useState, useEffect } from 'react';
import { Stack, Badge, Text, Image, Heading, Box } from '@chakra-ui/react';
import { LABELS } from '../../locals/sp/labels';
import fallBackImg from '../../assets/images/Online-Tutor.svg';
import { useParagraphReducer } from '../../hooks/useParagraphReducer';
import { useCreateAreaBadge } from '../../hooks/useCreateAreaBadge';

const SectionItem = ({ article }) => {

  // Esto después se va

  const area = article.workArea;
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  const date = new Date(
    article.logs.inserted.timestamp
  ).toLocaleDateString('es-Es', options);
  const image = article.resource.articleHeader.imageLink;

  const badge = useCreateAreaBadge(area);

  return (
    <Stack
      width="50rem"
      bgColor="gray.50"
      borderRadius="lg"
      justifyContent="flex-start"
      alignItems="flex-start"
      direction="row"
      overflow="hidden"
      borderStyle="solid"
      borderWidth="1px"
      maxHeight="125px"
      _hover={{ bg: 'gray.100' }}
    >
      <Image
        boxSize="125px"
        objectFit="cover"
        src={image}
        alt={LABELS.ACTIVIDADES.ACTIVIDAD.IMAGE_ALT}
        fallbackSrc={fallBackImg}
      />
      <Stack width="100%" justifyContent="flex-start">
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          paddingX={2}
          marginX={2}
          paddingY="2px"
          borderBottomWidth="1px"
          borderBottomStyle="solid"
        >
          <Badge paddingX={2} colorScheme={badge.color}>
            {badge.content}
          </Badge>
          <Text fontSize="sm">{date}</Text>
        </Stack>
        <Stack width="100%" direction="row" alignItems="center" paddingX={4}>
          <Stack alignItems="flex-start">
            <Heading
              as="h3"
              size="sm"
              marginLeft={0}
              lineHeight="0.7rem"
              fontFamily="Open Sans"
            >
              {article.resource.articleHeader.descriptor.title}
            </Heading>
            <Box textAlign="left" marginTop="0" paddingLeft={0}>
              <Text
                as="h5"
                fontSize="sm"
                fontFamily="Open Sans"
                fontWeight="400"
              >
                {useParagraphReducer(
                  article.resource.articleHeader.descriptor.subtitle
                )}
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export { SectionItem };
