import React, { useEffect, useState } from 'react';
import { VStack, HStack, Text, Heading, Button, Tooltip } from '@chakra-ui/react';
import { FaRegTrashAlt } from 'react-icons/fa';

import { ParagraphReducer } from '../../common/paragraphReducer';

const DisplayRelatedArticle = ({ options, article, selectedArticles, setSelectedArticles }) => {
  const titleString = article.descriptor.title;
  const subtitleString = article.descriptor.subtitle;

  const deleteItem = (e) => {
    const elementToDelete = article.article.entity.publicId;
    const filteredArticles = selectedArticles.filter(
      (item) => item.article.entity.publicId !== elementToDelete
    );

    setSelectedArticles(filteredArticles);
  };

  return (
    <HStack width="100%">
      <VStack bg="gray.100" borderRadius="md" p={3} width="100%">
        <Heading as="h4" fontSize="sm">
          {titleString}
        </Heading>
        <Text fontSize="xs">{ParagraphReducer(subtitleString)}</Text>
      </VStack>
      <Tooltip bg="white" color="gray.700" label="Borrar artículo">
        <Button margin="0" size="xs" onClick={deleteItem}>
          <FaRegTrashAlt />
        </Button>
      </Tooltip>
    </HStack>
  );
};

export { DisplayRelatedArticle };
