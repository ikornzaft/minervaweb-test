import React, { useEffect, useState } from 'react';
import { VStack, HStack, Text, Heading, Button, Tooltip } from '@chakra-ui/react';
import { FaRegTrashAlt } from 'react-icons/fa';

import { ParagraphReducer } from '../../common/paragraphReducer';

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
    <HStack marginBottom={2} width="100%">
      <VStack bg="gray.100" borderRadius="md" p={3} width="100%">
        <Heading as="h4" fontSize="md">
          {link.descriptor.title ? link.descriptor.title : link.content.location}
        </Heading>
        <Text fontSize="xs">{link.descriptor.subtitle}</Text>
      </VStack>
      <Tooltip bg="white" color="gray.700" label="Eliminar archivo">
        <Button id={link.content.link.location} margin="0" size="xs" onClick={deleteItem}>
          <FaRegTrashAlt />
        </Button>
      </Tooltip>
    </HStack>
  );
};

export { DisplayArticleContentLinks };
