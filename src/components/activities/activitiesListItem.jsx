import React from 'react';
import { Stack, Badge, Text, Image, Heading, Box } from '@chakra-ui/react';
import { IoMdCheckboxOutline } from 'react-icons/io';

import { LABELS } from '../../locals/sp/labels';
import fallBackImg from '../../assets/images/Online-Tutor.svg';
import testImage from '../../assets/images/test.jpg';
import { ParagraphReducer } from '../common/paragraphReducer';
import { useCreateAreaBadge } from '../../hooks/useCreateAreaBadge';

const ActivitiesListItem = ({ article }) => {
  const area = article.workarea.publicId;
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(article.inserted.timestamp).toLocaleDateString('es-Es', options);
  let image;

  console.log(article);

  if (article.contentHeader.image) {
    image = `http://www.afatecha.com/id/files/image/${article.contentHeader.image.location}`;
  } else if (article.type === 'exam') {
    image = testImage;
  } else {
    image = fallBackImg;
  }
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
      <Box h="125px" w="150px">
        <Image
          alt={LABELS.ACTIVITIES.ACTIVITY.IMAGE_ALT}
          boxSize="125px"
          fallbackSrc={fallBackImg}
          objectFit="cover"
          src={image}
        />
      </Box>

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
              {article.contentHeader.descriptor.title}
            </Heading>
            <Box marginTop="0" paddingLeft={0} textAlign="left">
              <Text as="h5" fontSize="sm" fontWeight="400">
                {ParagraphReducer(article.contentHeader.descriptor.subtitle)}
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export { ActivitiesListItem };
