import React from 'react';
import { Link } from 'react-router-dom';
import { Stack, VStack, HStack, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { IoMdCheckboxOutline } from 'react-icons/io';

import { ParagraphReducer } from '../common/paragraphReducer';

import { SectionElement } from './sectionElement';

const DisplayToDo = ({ sections }) => {
  const displayContent = (content) => {
    const type = content.content.type;

    return (
      <Link to={`/${type}/${content.content.entity.publicId}`}>
        <SectionElement
          icon={IoMdCheckboxOutline}
          subtitle={ParagraphReducer(content.descriptor.subtitle)}
          title={content.descriptor.title}
        />
      </Link>
    );
  };

  return (
    <VStack justifyContent="flex-start" textAlign="left" w="40rem">
      <HStack justifyContent="flex-start" textAlign="left" w="40rem">
        <Heading color="gray.600" fontSize="sm" fontWeight="400">
          PARA HACER
        </Heading>
      </HStack>
      {sections.map((content) => displayContent(content))}
    </VStack>
  );
};

export { DisplayToDo };
