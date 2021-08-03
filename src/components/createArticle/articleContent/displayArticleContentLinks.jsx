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

const DisplayArticleContentLinks = ({
  link,
  index,
  articleContentLinks,
  setArticleContentLinks,
}) => {
  const deleteItem = (e) => {
    //const elementToDelete = options[index].key;

    const linkToDeleteId = e.currentTarget.id;
    const filteredLinks = articleContentLinks.filter(
      (filteredLink) => filteredLink.content.link.location !== linkToDeleteId
    );
    setArticleContentLinks(filteredLinks);
  };

  return (
    <HStack width="100%" marginBottom={2}>
      <VStack width="100%" p={3} bg="gray.100" borderRadius="md">
        <Heading as="h4" fontSize="md">
          {link.descriptor.title
            ? link.descriptor.title
            : link.content.location}
        </Heading>
        <Text fontSize="xs">{link.descriptor.subtitle}</Text>
      </VStack>
      <Tooltip label="Eliminar archivo" bg="white" color="gray.700">
        <Button
          id={link.content.link.location}
          margin="0"
          size="xs"
          onClick={deleteItem}
        >
          <FaRegTrashAlt />
        </Button>
      </Tooltip>
    </HStack>
  );
};

export { DisplayArticleContentLinks };
