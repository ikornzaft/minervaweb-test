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
  const date = new Date(exam.inserted.timestamp).toLocaleDateString(
    'es-Es',
    options
  );

  const badge = CreateAreaBadge(area);

  return (
    <Stack
      key={uuidv4()}
      width="45rem"
      h="15rem"
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
          <Box paddingX={2}>
            <Text fontSize="sm">{date}</Text>
          </Box>
        </Stack>
        <Stack width="100%" direction="row" alignItems="center" paddingX={4}>
          <Stack alignItems="flex-start" paddingTop={2}>
            <Heading
              as="h3"
              size="sm"
              marginLeft={0}
              lineHeight="0.7rem"
              fontFamily="Open Sans"
            >
              {exam.contentHeader.descriptor.title}
            </Heading>
            <Box textAlign="left" marginTop="0" paddingLeft={0}>
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
