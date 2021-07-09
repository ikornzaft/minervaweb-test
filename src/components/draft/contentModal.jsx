import React, {useState} from 'react';
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
  Input,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { ArticleContentInputModal } from '../createArticle/articleContent/articleContentInputModal'
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
        width="30rem"
        maxWidth="30rem"
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
  }

  const handleChanges = () => {
    setDraftContent(draftContent)
    console.log(draftContent);
    onClose()
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
          <Box paddingTop={2}>
            {draftContent.map((el, index) => listItems(el, index))}
          </Box>

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

          <Button onClick={handleChanges}>Confirmar cambios</Button>
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
