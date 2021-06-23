import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Stack, HStack, Heading, Text } from '@chakra-ui/react';
import { SectionElement } from './sectionElement';
import { ParagraphReducer } from '../common/paragraphReducer';
import { RiBook2Line, RiImageLine } from 'react-icons/ri';
import { VscFilePdf } from 'react-icons/vsc';
import { SiMicrosoftword } from 'react-icons/si';

const DisplayKnowMore = ({ sections }) => {
  const clasifySection = (section) => {
    let toRender;
    section.article
      ? (toRender = displayArticle(section))
      : (toRender = displayResource(section));
    return toRender;
  };

  // Si es un artículo relacionado
  const displayArticle = (section) => {
    return (
      <Link to={`/article/${section.article.entity.publicId}`}>
        <SectionElement
          icon={RiBook2Line}
          title={section.descriptor.title}
          subtitle={ParagraphReducer(section.descriptor.subtitle)}
        />
      </Link>
    );
  };

  // Si es otro recurso
  const determineTypeOfResource = (section) => {
    let icon;
    // Document
    if (section.document.type === 'document') {
      const fileName = section.descriptor.subtitle;
      const splittedNameArray = fileName.split('.');
      const extension = splittedNameArray[splittedNameArray.length - 1];
      if (extension === 'pdf') {
        icon = VscFilePdf;
      }
      if (extension === 'doc' || extension === 'docx' || extension === 'rtf' || extension == 'txt') {
        icon = SiMicrosoftword;
      }
    }
    // Image
    if (section.document.type === 'image') {
      icon = RiImageLine;
    }

    return { icon };
  };

  const log = () => console.log('CLICK');

  const displayResource = (section) => {
    const { icon } = determineTypeOfResource(section);
    return (
      <Stack onClick={log} cursor="pointer">
        <SectionElement
          icon={icon}
          title={section.descriptor.title}
          subtitle={ParagraphReducer(section.descriptor.subtitle)}
        />
      </Stack>
    );
  };

  return (
    <>
      <HStack textAlign="left" justifyContent="flex-start" w="40rem">
        <Heading fontSize="sm" color="gray.600" fontWeight="400">
          PARA SABER MÁS
        </Heading>
      </HStack>

      {sections.map((section) => clasifySection(section))}
    </>
  );
};

export { DisplayKnowMore };
