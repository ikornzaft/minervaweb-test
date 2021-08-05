import React, { useState } from 'react';
import { FormControl, Button, VStack, Stack, Text, Input, Textarea } from '@chakra-ui/react';

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
        link: {
          type: 'link',
          locationType: 'absolute',
          location: addedLink,
        },
      },
    };

    setArticleContentLinks((articleContentLinks) => [...articleContentLinks, newLink]);
    setAddedLink('');
    setAddedLinkDescription('');
    setAddedLinkTitle('');
  };

  return (
    <VStack justifyContent="center" paddingTop={4}>
      <VStack
        bg="gray.50"
        borderRadius="md"
        borderStyle="solid"
        borderWidth="1px"
        marginBottom={4}
        p={4}
        w="90%"
      >
        <Text color="gray.700" fontSize="sm">
          Ingresa un link
        </Text>
        <FormControl>
          <Stack alignItems="center" justifyContent="flex-start" w="100%">
            <VStack alignItems="flex-start" w="100%">
              <Input
                bg="white"
                borderRadius="md"
                id="knowmore-link-input"
                placeholder="http://"
                size="sm"
                type="text"
                value={addedLink}
                onChange={onLinkChange}
              />
              <Text color="gray.600" fontSize="xs">
                Título
              </Text>
              <Input
                bg="white"
                borderRadius="md"
                id="knowmore-link-title"
                size="sm"
                type="text"
                value={addedLinkTitle}
                onChange={onTitleChange}
              />
              <Text color="gray.600" fontSize="xs">
                Descripción
              </Text>
              <Textarea
                bg="white"
                borderRadius="md"
                id="knowmore-link-description"
                size="sm"
                type="textarea"
                value={addedLinkDescription}
                onChange={onDescriptionChange}
              />
            </VStack>

            <Button
              colorScheme="blue"
              disabled={addedLink && addedLink !== '' ? false : true}
              fontFamily="Poppins"
              fontWeight="400"
              size="xs"
              type="button"
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
        if (link.content.link.location && link.content.link.location !== '')
          return (
            <DisplayArticleContentLinks
              articleContentLinks={articleContentLinks}
              index={index}
              link={link}
              setArticleContentLinks={setArticleContentLinks}
            />
          );
      })}
    </VStack>
  );
};

export { ArticleContentLinkSelector };
