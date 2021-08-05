import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  HStack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

import { ArticleContentInputModal } from '../createArticle/articleContent/articleContentInputModal';
import { ArticleContentItem } from '../createArticle/articleContent/articleContentItem';
import { ArticleContentElementMenu } from '../createArticle/articleContent/articleContentElementMenu';

const ContentModal = ({ isOpen, onClose, draftContent, setDraftContent }) => {
  const [forceRender, setForceRender] = useState(true);
  const listItems = (el, index) => {
    const descriptor = el.descriptor;
    let content;

    el.content ? (content = el.content) : (content = null);

    return (
      <HStack
        key={index}
        bgColor="gray.100"
        borderRadius="md"
        justifyContent="space-between"
        marginBottom={2}
        maxWidth="35rem"
        minWidth="30rem"
        paddingX={6}
        paddingY={2}
        width="35rem"
      >
        <ArticleContentItem content={content} descriptor={descriptor} />
        <ArticleContentElementMenu
          forceRender={forceRender}
          index={index}
          isImage="false"
          paragraphList={draftContent}
          setForceRender={setForceRender}
          setParagraphList={setDraftContent}
        />
      </HStack>
    );
  };

  const {
    isOpen: isOpenAddContent,
    onOpen: onOpenAddContent,
    onClose: onCloseAddContent,
  } = useDisclosure();

  const addContentHandler = (e) => {
    onCloseAddContent();
    onOpenAddContent();
  };

  const handleChanges = () => {
    setDraftContent(draftContent);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding={2}>
        <ModalHeader alignSelf="center" color="gray.700" fontFamily="Poppins" fontWeight="300">
          Editar contenido
        </ModalHeader>
        <ModalBody textAlign="center">
          <VStack borderRadius="md" borderWidth="1px" paddingBottom={4} paddingX={4} w="100%">
            <Button
              bgColor="white"
              colorScheme="blue"
              fontFamily="Poppins"
              fontWeight="400"
              mt={4}
              size="sm"
              type="button"
              variant="outline"
              onClick={addContentHandler}
            >
              Agregar contenido
            </Button>
            <VStack paddingTop={2}>{draftContent.map((el, index) => listItems(el, index))}</VStack>
          </VStack>
          <HStack justifyContent="center" paddingY={4} w="100%">
            <Button
              colorScheme="blue"
              fontFamily="Poppins"
              fontWeight="400"
              onClick={handleChanges}
            >
              Confirmar cambios
            </Button>
          </HStack>
        </ModalBody>
        <ModalCloseButton />
      </ModalContent>
      <ArticleContentInputModal
        isOpen={isOpenAddContent}
        paragraphList={draftContent}
        setParagraphList={setDraftContent}
        onClose={onCloseAddContent}
      />
    </Modal>
  );
};

export { ContentModal };
