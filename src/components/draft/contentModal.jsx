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
        width="35rem"
        maxWidth="35rem"
        minWidth="30rem"
        paddingY={2}
        paddingX={6}
        bgColor="gray.100"
        borderRadius="md"
        marginBottom={2}
        justifyContent="space-between"
      >
        <ArticleContentItem descriptor={descriptor} content={content} />
        <ArticleContentElementMenu
          index={index}
          paragraphList={draftContent}
          setParagraphList={setDraftContent}
          forceRender={forceRender}
          setForceRender={setForceRender}
          isImage="false"
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
        <ModalHeader
          alignSelf="center"
          color="gray.700"
          fontFamily="Poppins"
          fontWeight="300"
        >
          Editar contenido
        </ModalHeader>
        <ModalBody textAlign="center">
          <VStack
            w="100%"
            paddingX={4}
            paddingBottom={4}
            borderRadius="md"
            borderWidth="1px"
          >
            <Button
              mt={4}
              colorScheme="blue"
              type="button"
              variant="outline"
              bgColor="white"
              onClick={addContentHandler}
              size="sm"
              fontFamily="Poppins"
              fontWeight="400"
            >
              Agregar contenido
            </Button>
            <VStack paddingTop={2}>
              {draftContent.map((el, index) => listItems(el, index))}
            </VStack>
          </VStack>
          <HStack w="100%" justifyContent="center" paddingY={4}>
          <Button
            fontFamily="Poppins"
            fontWeight="400"
            colorScheme="blue"
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
        onClose={onCloseAddContent}
        paragraphList={draftContent}
        setParagraphList={setDraftContent}
      />
    </Modal>
  );
};

export { ContentModal };
