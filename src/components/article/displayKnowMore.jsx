import React from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { Box, Stack, HStack, Heading, Text } from '@chakra-ui/react';
import { SectionElement } from './sectionElement';
import { AudioPlayer } from '../common/players/audioPlayer';
import { ParagraphReducer } from '../common/paragraphReducer';
import { RiBook2Line, RiImageLine, RiVideoLine } from 'react-icons/ri';
import { VscFilePdf, VscFile } from 'react-icons/vsc';
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
    if (section.document.type === 'document') {
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
    if (section.document.type === 'image') {
      icon = RiImageLine;
    }
    // Audio
    if (section.document.type === 'audio') {
      icon = FiSpeaker;
      type = "audio";
    }
    // Video
    if (section.document.type === 'video') {
      icon = RiVideoLine;
    }
    return { icon, type };
  };

  const choosePlayer = (type, section) => {
    if (type === "audio") AudioPlayer(section);
    console.log("Player")
  }
  
  const log = () => console.log('CLICK');
  
  const displayResource = (section) => {
    const { icon, type } = determineTypeOfResource(section);
    return (
      <Stack onClick={() => choosePlayer(type, section)} cursor="pointer">
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
