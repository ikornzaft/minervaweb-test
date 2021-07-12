import React, { useState, useEffect } from 'react';
import { Link as ReactRouterLink, useParams } from 'react-router-dom';
import { HStack, Button, useDisclosure } from '@chakra-ui/react';
import { WorkgroupSelector } from '../article/publish/workgroupSelector';

const DraftMenu = () => {
  const param = useParams();
  const {
    isOpen: isOpenGroupSelector,
    onOpen: onOpenGroupSelector,
    onClose: onCloseGroupSelector,
  } = useDisclosure();

  const groupSelectorHandler = (e) => {
    onCloseGroupSelector();
    onOpenGroupSelector();
  };

  return (
    <HStack
      h="82px"
      borderBottomWidth="1px"
      borderBottomColor="gray.300"
      w="100vw"
      bg="gray.100"
      position="fixed"
      justifyContent="flex-end"
      alignItems="flex-end"
      paddingBottom={1}
      paddingX={6}
      zIndex="90"
    >
      <HStack w="21rem" justifyContent="space-between">
        <Button
          as={ReactRouterLink}
          to={`/draft/${param.id}`}
          w="10rem"
          type="button"
          bg="white"
          colorScheme="blue"
          fontFamily="Poppins"
          fontWeight="400"
          size="sm"
          variant="ghost"
        >
          {' '}
          Visualizar borrador
        </Button>
        <Button
          w="10rem"
          type="button"
          bg="white"
          colorScheme="blue"
          fontFamily="Poppins"
          fontWeight="400"
          size="sm"
          variant="ghost"
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
    </HStack>
  );
};

export { DraftMenu };
