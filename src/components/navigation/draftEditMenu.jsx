import React, { useState, useEffect } from 'react';
import { Link as ReactRouterLink, useParams } from 'react-router-dom';
import { HStack, Button, Text } from '@chakra-ui/react';

const DraftEditMenu = ({ updateDraft, revertDraft, publishDraft }) => {
  const param = useParams();

  return (
    <HStack
      alignItems="flex-end"
      bg="primary_light"
      borderBottomColor="gray.300"
      borderBottomWidth="1px"
      h="82px"
      justifyContent="space-between"
      paddingBottom={1}
      paddingX={6}
      position="fixed"
      w="100vw"
      zIndex="10"
    >
      <HStack alignContent="center" justifyContent="flex-end" paddingLeft="2.6rem" w="38rem">
        <Text color="white" fontSize="xl" fontWeight="700">
          BORRADOR
        </Text>
      </HStack>
      <HStack justifyContent="space-between" w="38rem">
        <Button
          bg="white"
          colorScheme="blue"
          fontFamily="Poppins"
          fontWeight="400"
          size="sm"
          type="button"
          variant="ghost"
          w="12rem"
          onClick={updateDraft}
        >
          {' '}
          Volver al artículo
        </Button>
        <Button
          bg="white"
          colorScheme="blue"
          fontFamily="Poppins"
          fontWeight="400"
          size="sm"
          type="button"
          variant="ghost"
          w="12rem"
          onClick={revertDraft}
        >
          {' '}
          Recuperar original
        </Button>
        <Button
          bg="white"
          colorScheme="blue"
          fontFamily="Poppins"
          fontWeight="400"
          size="sm"
          type="button"
          variant="ghost"
          w="12rem"
          onClick={publishDraft}
        >
          {' '}
          Actualizar artículo
        </Button>
      </HStack>
    </HStack>
  );
};

export { DraftEditMenu };
