import React from 'react';
import { Stack, Badge, Text, Heading, Box } from '@chakra-ui/react';
import { CreateAreaBadge } from '../common/createAreaBadge';
import { ParagraphReducer } from '../common/paragraphReducer';
import { ArticlesDb } from '../../resources/articlesDb';

const RequestItem = ({ question }) => {
  console.log(question);
  const badge = CreateAreaBadge(question.workarea.publicId);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const requestDate = new Date(question.inserted.timestamp).toLocaleDateString(
    'es-Es',
    options
  );
  const articleTitle = question.contentHeader.descriptor.title;
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
      <Stack width="100%" justifyContent="flex-start">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          paddingX={6}
          marginX={2}
          paddingY="2px"
          borderBottomWidth="1px"
          borderBottomStyle="solid"
        >
          <Badge paddingX={2} colorScheme={badge.color}>
            {badge.content}
          </Badge>
          <Text fontSize="sm">{requestDate}</Text>
        </Stack>
        <Stack width="100%" direction="row" alignItems="center" padding={4}>
          <Stack alignItems="center" width="100%">
            <Heading
              as="h3"
              size="sm"
              marginLeft={0}
              lineHeight="0.7rem"
              fontFamily="Open Sans"
            >
              {articleTitle}
            </Heading>
            <Box textAlign="left" marginTop="0" paddingLeft={0}>
              <Text as="h5" fontSize="sm" fontWeight="400">
                {ParagraphReducer(request)}
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export { RequestItem };
