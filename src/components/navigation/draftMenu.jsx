import React, { useState, useEffect } from 'react';
import { Link as ReactRouterLink, useParams } from 'react-router-dom';
import { HStack, Button, Box, useDisclosure } from '@chakra-ui/react';
import { WorkgroupSelector } from '../article/publish/workgroupSelector';
import { NewTopicModal } from '../forum/newTopicModal';

const DraftMenu = () => {
  const param = useParams();
  const {
    isOpen: isOpenGroupSelector,
    onOpen: onOpenGroupSelector,
    onClose: onCloseGroupSelector,
  } = useDisclosure();

  const {
    isOpen: isOpenTopicModal,
    onOpen: onOpenTopicModal,
    onClose: onCloseTopicModal,
  } = useDisclosure();

  const groupSelectorHandler = (e) => {
    onCloseGroupSelector();
    onOpenGroupSelector();
  };

  const createTopic = () => {
    onOpenTopicModal();
  };

  return (
    <HStack
      h="82px"
      borderBottomWidth="1px"
      borderBottomColor="gray.300"
      w="100vw"
      bg="gray.100"
      position="fixed"
      justifyContent="center"
      alignItems="flex-end"
      paddingBottom={1}
      zIndex="90"
    >
      <HStack w="22rem" justifyContent="space-between">
        <Button
          as={ReactRouterLink}
          to={`/draft/${param.id}`}
          w="10rem"
          type="button"
          colorScheme="blue"
          fontFamily="Poppins"
          fontWeight="400"
          size="sm"
          variant="primary"
        >
          {' '}
          Visualizar borrador
        </Button>
        <Button
          w="10rem"
          type="button"
          colorScheme="blue"
          fontFamily="Poppins"
          fontWeight="400"
          size="sm"
          variant="primary"
          onClick={createTopic}
        >
          {' '}
          Publicar en el foro
        </Button>
        <Button
          w="10rem"
          type="button"
          colorScheme="blue"
          fontFamily="Poppins"
          fontWeight="400"
          size="sm"
          variant="primary"
          onClick={groupSelectorHandler}
        >
          {' '}
          Compartir en red
        </Button>
      </HStack>

      <WorkgroupSelector
        isOpen={isOpenGroupSelector}
        onClose={onCloseGroupSelector}
      />
      <NewTopicModal
        isOpen={isOpenTopicModal}
        onClose={onCloseTopicModal}
        articleId={param.id}
      />
    </HStack>
  );
};

export { DraftMenu };
