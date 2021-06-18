import React from 'react';
import { HStack, Text } from '@chakra-ui/react';

const DisplayRelatedArticle = ({options, article}) => {
  const index = options.findIndex((option) => option.key === article);
  const titleString = options[index].value;
  const subtitleString = options[index].subtitle;

  return (
    <HStack p={4} bg="gray.400">
      <Text>{titleString}</Text>
      <Text>{subtitleString}</Text>
    </HStack>
  );
}

export { DisplayRelatedArticle }
