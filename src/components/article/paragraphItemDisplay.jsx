import React from 'react';
import { VStack } from '@chakra-ui/react';
import { DisplayImage } from './paragraphs/displayImage';
import { DisplayLink } from './paragraphs/displayLink';
import { DisplayAudio } from './paragraphs/displayAudio';
import { DisplayDocument } from './paragraphs/displayDocument';
import { RiVideoLine } from 'react-icons/ri';
import { VscFile, VscLinkExternal } from 'react-icons/vsc';
import { FiSpeaker } from 'react-icons/fi';

const ParagraphItemDisplay = ({ item }) => {
  const paragraphType = item.content.link.type;
  const linkLocation = item.content.link.location;
  const title = item.descriptor.title;
  const subtitle = item.descriptor.subtitle;
  const selectIcon = () => {
    switch (paragraphType) {
      case 'document':
        return VscFile;
        break;
      case 'audio':
        return FiSpeaker;
        break;
      case 'video':
        return RiVideoLine;
        break;
      case 'link':
        return VscLinkExternal;
    }
  };

  return (
    <VStack w="100%" p={6}>
      {paragraphType === 'image' ? (
        <DisplayImage linkLocation={linkLocation} title={title} />
      ) : null}
      {paragraphType === 'link' ? (
        <DisplayLink
          linkLocation={linkLocation}
          title={title}
          subtitle={subtitle}
        />
      ) : null}
      {paragraphType === 'audio' ? (
        <DisplayAudio
          linkLocation={linkLocation}
          title={title}
          subtitle={subtitle}
        />
      ) : null}
      {paragraphType === 'document' ? (
        <DisplayDocument
          linkLocation={linkLocation}
          title={title}
          subtitle={subtitle}
        />
      ) : null}
    </VStack>
  );
};

export { ParagraphItemDisplay };
