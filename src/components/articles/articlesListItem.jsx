import React from 'react';
import { Stack, Badge, Text, Image, Heading, Box } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { LABELS } from '../../locals/sp/labels';
import fallBackImg from '../../assets/images/Online-Tutor.svg';
import { ParagraphReducer } from '../common/paragraphReducer';
import { CreateAreaBadge } from '../common/createAreaBadge';

const ArticlesListItem = ({ article, key }) => {
  const area = article.workarea.publicId;
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(article.inserted.timestamp).toLocaleDateString(
    'es-Es',
    options
  );

  let image;
  if (article.contentHeader.image) {
    image = `http://www.afatecha.com/id/files/image/${article.contentHeader.image.location}`;
  } else {
    image = fallBackImg;
  }

  const badge = CreateAreaBadge(area);

  return (
    <Stack
      key={uuidv4()}
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
      <Box w="150px" h="125px">
        <Image
          boxSize="125px"
          objectFit="cover"
          src={image}
          alt={LABELS.ACTIVITIES.ACTIVITY.IMAGE_ALT}
          fallbackSrc={fallBackImg}
        />
      </Box>
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
              {article.contentHeader.descriptor.title}
            </Heading>
            <Box textAlign="left" marginTop="0" paddingLeft={0}>
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

export { ArticlesListItem };
