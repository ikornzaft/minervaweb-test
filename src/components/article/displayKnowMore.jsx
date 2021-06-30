import React from 'react';
import { Link } from 'react-router-dom';
import { Stack, HStack, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { SectionElement } from './sectionElement';
import { ParagraphReducer } from '../common/paragraphReducer';
import { RiBook2Line, RiImageLine, RiVideoLine } from 'react-icons/ri';
import { VscFilePdf, VscFile, VscLinkExternal } from 'react-icons/vsc';
import { SiMicrosoftword } from 'react-icons/si';
import { FiSpeaker } from 'react-icons/fi';

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
    let type;
    // Document
    if (section.content.link.type === 'document') {
      const fileName = section.descriptor.subtitle;
      const splittedNameArray = fileName.split('.');
      const extension = splittedNameArray[splittedNameArray.length - 1];
      if (extension === 'pdf') {
        icon = VscFilePdf;
      } else if (
        extension === 'doc' ||
        extension === 'docx' ||
        extension === 'rtf' ||
        extension == 'txt'
      ) {
        icon = SiMicrosoftword;
      } else {
        icon = VscFile;
      }
    }
    // Image
    if (section.content.link.type === 'image') {
      icon = RiImageLine;
    }
    // Audio
    if (section.content.link.type === 'audio') {
      icon = FiSpeaker;
      type = 'audio';
    }
    // Video
    if (section.content.link.type === 'video') {
      icon = RiVideoLine;
    }
    // Link
    if (section.content.link.type === 'link') {
      icon = VscLinkExternal;
    }
    return { icon };
  };

  const log = () => console.log('CLICK');

  const displayResource = (section) => {
    const { icon } = determineTypeOfResource(section);
    let resourceLink;
    if (section.content.link.locationType === 'absolute') {
      resourceLink = section.content.link.location;
    } else {
      resourceLink = `http://www.afatecha.com/id/files/${section.content.link.type}/${section.content.link.location}`;
    }
    return (
      <LinkBox>
        <LinkOverlay href={resourceLink} isExternal="true" />
        <Stack cursor="pointer">
          <SectionElement
            icon={icon}
            title={section.descriptor.title}
            subtitle={ParagraphReducer(section.descriptor.subtitle)}
          />
        </Stack>
      </LinkBox>
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
