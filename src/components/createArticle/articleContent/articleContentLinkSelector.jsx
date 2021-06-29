import React, { useState } from 'react';
import {
  FormControl,
  Button,
  VStack,
  Stack,
  Text,
  Input,
  Textarea,

} from '@chakra-ui/react';

import { DisplayArticleContentLinks } from './displayArticleContentLinks';

const ArticleContentLinkSelector = ({ articleContentLinks, setArticleContentLinks }) => {
  const [addedLink, setAddedLink] = useState(null);
  const [addedLinkTitle, setAddedLinkTitle] = useState(null);
  const [addedLinkDescription, setAddedLinkDescription] = useState(null);

  const onLinkChange = (e) => {
    setAddedLink(e.target.value);
  };

  const onTitleChange = (e) => {
    setAddedLinkTitle(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setAddedLinkDescription(e.target.value);
  };

  const onLinkAdd = () => {
    const newLink = {
      descriptor: {
        title: addedLinkTitle,
        subtitle: addedLinkDescription,
      },
      content: {
        type: 'link',
        locationType: 'absolute',
        link: addedLink,
      },
    };

    setArticleContentLinks((articleContentLinks) => [...articleContentLinks, newLink]);
    setAddedLink("");
    setAddedLinkDescription("");
    setAddedLinkTitle("");
  };

  return (
    <VStack justifyContent="center" paddingTop={4}>
      <VStack
        w="90%"
        p={4}
        bg="gray.50"
        borderRadius="md"
        borderStyle="solid"
        borderWidth="1px"
        marginBottom={4}
      >
        <Text fontSize="sm" color="gray.700">
          Ingresa un link
        </Text>
        <FormControl>
          <Stack w="100%" alignItems="center" justifyContent="flex-start">
            <VStack w="100%" alignItems="flex-start">
              <Input
                id="knowmore-link-input"
                type="text"
                bg="white"
                size="sm"
                value={addedLink}
                borderRadius="md"
                onChange={onLinkChange}
                placeholder="http://"
              />
              <Text fontSize="xs" color="gray.600">
                Título
              </Text>
              <Input
                id="knowmore-link-title"
                type="text"
                value={addedLinkTitle}
                borderRadius="md"
                bg="white"
                size="sm"
                onChange={onTitleChange}
              />
              <Text fontSize="xs" color="gray.600">
                Descripción
              </Text>
              <Textarea
                id="knowmore-link-description"
                bg="white"
                value={addedLinkDescription}
                borderRadius="md"
                size="sm"
                type="textarea"
                onChange={onDescriptionChange}
              />
            </VStack>

            <Button
              type="button"
              colorScheme="blue"
              fontFamily="Poppins"
              fontWeight="400"
              size="xs"
              variant="outline"
              onClick={onLinkAdd}
            >
              {' '}
              Agregar Link
            </Button>
          </Stack>
        </FormControl>
      </VStack>
      {articleContentLinks.map((link, index) => {
        if (link.content.location && link.content.location !== '')
          return (
            <DisplayArticleContentLinks
              link={link}
              articleContentLinks={articleContentLinks}
              setArticleContentLinks={setArticleContentLinks}
              index={index}
            />
          );
      })}
    </VStack>
  );
};

export { ArticleContentLinkSelector };
