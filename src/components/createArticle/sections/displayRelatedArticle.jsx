import React, { useEffect, useState } from 'react';
import {
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Tooltip,
} from '@chakra-ui/react';
import { ParagraphReducer } from '../../common/paragraphReducer';
import { FaRegTrashAlt } from 'react-icons/fa';

const DisplayRelatedArticle = ({
  options,
  article,
  selectedArticles,
  setSelectedArticles,
}) => {
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
      <VStack width="100%" p={3} bg="gray.100" borderRadius="md">
        <Heading as="h4" fontSize="md">
          {titleString}
        </Heading>
        <Text fontSize="xs">{ParagraphReducer(subtitleString)}</Text>
      </VStack>
      <Tooltip label="Borrar artículo" bg="white" color="gray.700">
        <Button margin="0" size="xs" onClick={deleteItem}>
          <FaRegTrashAlt />
        </Button>
      </Tooltip>
    </HStack>
  );
};

export { DisplayRelatedArticle };
