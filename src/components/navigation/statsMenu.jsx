import React, { useState, useEffect } from 'react';
import { Link as ReactRouterLink, useParams } from 'react-router-dom';
import { HStack, Button, Box, useDisclosure } from '@chakra-ui/react';

import { WorkgroupSelector } from '../common/workgroupSelector';
import { NewTopicModal } from '../forum/newTopicModal';

const StatsMenu = () => {
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
      alignItems="flex-end"
      bg="primary_light"
      borderBottomColor="gray.300"
      borderBottomWidth="1px"
      h="82px"
      justifyContent="flex-end"
      paddingBottom={1}
      paddingX={6}
      position="fixed"
      w="100vw"
      zIndex="90"
    >
      <HStack justifyContent="flex-end" spacing={4} w="38rem">
        <Button
          bg="white"
          colorScheme="blue"
          fontFamily="Poppins"
          fontWeight="400"
          size="sm"
          type="button"
          variant="ghost"
          w="12rem"
          onClick={groupSelectorHandler}
        >
          {' '}
          Compartir en red
        </Button>
        <Button
          as={ReactRouterLink}
          bg="white"
          colorScheme="blue"
          fontFamily="Poppins"
          fontWeight="400"
          size="sm"
          to={`/stats/${param.id}`}
          type="button"
          variant="ghost"
          width="12rem"
        >
          {' '}
          Ver estadísticas
        </Button>
      </HStack>

      <WorkgroupSelector isOpen={isOpenGroupSelector} onClose={onCloseGroupSelector} />
      <NewTopicModal articleId={param.id} isOpen={isOpenTopicModal} onClose={onCloseTopicModal} />
    </HStack>
  );
};

export { StatsMenu };
