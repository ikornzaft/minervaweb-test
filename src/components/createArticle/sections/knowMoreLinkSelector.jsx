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

import { DisplayKnowMoreLinks } from './displayKnowMoreLinks';

const KnowMoreLinkSelector = ({ knowMoreLinks, setKnowMoreLinks }) => {
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
          location: addedLink,
          locationType: 'absolute',
          type: 'link',
        }
      },
    };

    setKnowMoreLinks((knowMoreLinks) => [...knowMoreLinks, newLink]);
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
      {knowMoreLinks.map((link, index) => {
        console.log(link)
        if (link.content.link) {
          if (link.content.link.location !== '')
          return (
            <DisplayKnowMoreLinks
              link={link}
              knowMoreLinks={knowMoreLinks}
              setKnowMoreLinks={setKnowMoreLinks}
              index={index}
            />
          );
      }})}
    </VStack>
  );
};

export { KnowMoreLinkSelector };
