import React from 'react';
import { Stack, Badge, Text, Image, Heading, Box } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

import { LABELS } from '../../locals/sp/labels';
import fallBackImg from '../../assets/images/Online-Tutor.svg';
import { ParagraphReducer } from '../common/paragraphReducer';
import { CreateAreaBadge } from '../common/createAreaBadge';

const ExamsListItem = ({ exam, key }) => {
  const area = exam.workarea.publicId;
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(exam.inserted.timestamp).toLocaleDateString('es-Es', options);

  const badge = CreateAreaBadge(area);

  return (
    <Stack
      key={uuidv4()}
      _hover={{ bg: 'gray.100' }}
      alignItems="flex-start"
      bgColor="gray.50"
      borderRadius="lg"
      borderStyle="solid"
      borderWidth="1px"
      direction="row"
      h="15rem"
      justifyContent="flex-start"
      maxHeight="125px"
      overflow="hidden"
      width="45rem"
    >
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
          <Box paddingX={2}>
            <Text fontSize="sm">{date}</Text>
          </Box>
        </Stack>
        <Stack alignItems="center" direction="row" paddingX={4} width="100%">
          <Stack alignItems="flex-start" paddingTop={2}>
            <Heading as="h3" fontFamily="Open Sans" lineHeight="0.7rem" marginLeft={0} size="sm">
              {exam.contentHeader.descriptor.title}
            </Heading>
            <Box marginTop="0" paddingLeft={0} textAlign="left">
              <Text as="h5" fontSize="sm" fontWeight="400">
                {ParagraphReducer(exam.contentHeader.descriptor.subtitle)}
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export { ExamsListItem };
