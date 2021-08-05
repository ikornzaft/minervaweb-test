import React from 'react';
import { Link } from 'react-router-dom';
import { Stack, HStack, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { RiBook2Line, RiImageLine, RiVideoLine, RiExternalLinkFill } from 'react-icons/ri';
import { VscFilePdf, VscFile, VscLinkExternal } from 'react-icons/vsc';
import { SiMicrosoftword } from 'react-icons/si';
import { FiSpeaker } from 'react-icons/fi';

import { ParagraphReducer } from '../common/paragraphReducer';

import { SectionElement } from './sectionElement';

const DisplayKnowMore = ({ sections, isTopic }) => {
  const clasifySection = (section) => {
    let toRender;

    section.article ? (toRender = displayArticle(section)) : (toRender = displayResource(section));

    return toRender;
  };

  const displayArticle = (section) => {
    return (
      <Link to={`/article/${section.article.entity.publicId}`}>
        <SectionElement
          icon={RiBook2Line}
          subtitle={ParagraphReducer(section.descriptor.subtitle)}
          title={section.descriptor.title}
        />
      </Link>
    );
  };

  const determineTypeOfResource = (section) => {
    let icon;

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
        extension === 'txt'
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
    }
    // Video
    if (section.content.link.type === 'video') {
      icon = RiVideoLine;
    }
    // Link
    if (section.content.link.type === 'link') {
      icon = RiExternalLinkFill;
    }

    return { icon };
  };

  const displayResource = (section) => {
    const { icon } = determineTypeOfResource(section);
    let resourceLink;

    if (section.content.link.locationType === 'absolute') {
      resourceLink = section.content.link.location;
      if (resourceLink.substring(0, 4) !== 'http') resourceLink = `http://${resourceLink}`;
    } else {
      resourceLink = `http://www.afatecha.com/id/files/${section.content.link.type}/${section.content.link.location}`;
    }

    return (
      <LinkBox>
        <LinkOverlay href={resourceLink} isExternal="true" />
        <Stack cursor="pointer">
          <SectionElement
            icon={icon}
            subtitle={ParagraphReducer(section.descriptor.subtitle)}
            title={section.descriptor.title}
          />
        </Stack>
      </LinkBox>
    );
  };

  return (
    <>
      <HStack justifyContent="flex-start" textAlign="left" w="40rem">
        <Heading color="gray.600" fontSize="sm" fontWeight="400">
          PARA SABER MÁS
        </Heading>
      </HStack>

      {sections.map((section) => clasifySection(section))}
    </>
  );
};

export { DisplayKnowMore };
