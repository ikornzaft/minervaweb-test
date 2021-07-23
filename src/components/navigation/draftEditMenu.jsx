import React, { useState, useEffect } from 'react';
import { Link as ReactRouterLink, useParams } from 'react-router-dom';
import { HStack, Button, Text } from '@chakra-ui/react';

const DraftEditMenu = ({ updateDraft, revertDraft, publishDraft }) => {
  const param = useParams();
  return (
    <HStack
      h="82px"
      borderBottomWidth="1px"
      borderBottomColor="gray.300"
      w="100vw"
      bg="primary_light"
      position="fixed"
      justifyContent="space-between"
      alignItems="flex-end"
      paddingBottom={1}
      paddingX={6}
      zIndex="10"
    >
      <HStack
        w="38rem"
        justifyContent="flex-end"
        alignContent="center"
        paddingLeft="2.6rem"
      >
        <Text color="white" fontWeight="700" fontSize="xl">
          BORRADOR
        </Text>
      </HStack>
      <HStack w="38rem" justifyContent="space-between">
        <Button
          w="12rem"
          type="button"
          bg="white"
          colorScheme="blue"
          fontFamily="Poppins"
          fontWeight="400"
          size="sm"
          variant="ghost"
          onClick={updateDraft}
        >
          {' '}
          Volver al artículo
        </Button>
        <Button
          w="12rem"
          type="button"
          bg="white"
          colorScheme="blue"
          fontFamily="Poppins"
          fontWeight="400"
          size="sm"
          variant="ghost"
          onClick={revertDraft}
        >
          {' '}
          Recuperar original
        </Button>
        <Button
          w="12rem"
          type="button"
          bg="white"
          colorScheme="blue"
          fontFamily="Poppins"
          fontWeight="400"
          size="sm"
          variant="ghost"
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
