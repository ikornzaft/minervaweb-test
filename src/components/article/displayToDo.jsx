import React from 'react';
import { Link } from 'react-router-dom';
import { Stack, VStack, HStack, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { SectionElement } from './sectionElement';
import { ParagraphReducer } from '../common/paragraphReducer';

const DisplayToDo = ({sections}) => {
  console.log(sections)

  const displayContent = (content) => {
    console.log(content)
    return (
      <Link to={`/quiz/${content.content.entity.publicId}`}>
        <SectionElement
          icon={IoMdCheckboxOutline}
          title={content.descriptor.title}
          subtitle={ParagraphReducer(content.descriptor.subtitle)}
        />
      </Link>
    );

    
  
  }

  return (
    <VStack textAlign="left" justifyContent="flex-start" w="40rem">
    <HStack textAlign="left" justifyContent="flex-start" w="40rem">

    <Heading fontSize="sm" color="gray.600" fontWeight="400">
      PARA HACER 
    </Heading>
    </HStack>
    {sections.map((content) => displayContent(content))}

  </VStack>
  )
}

export { DisplayToDo }
