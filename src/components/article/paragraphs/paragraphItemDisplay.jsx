import React from 'react';
import { VStack } from '@chakra-ui/react';
import { DisplayImage } from './displayImage';
import { DisplayLink } from './displayLink';
import { DisplayAudio } from './displayAudio';
import { DisplayDocument } from './displayDocument';

const ParagraphItemDisplay = ({ item }) => {
  const paragraphType = item.content.link.type;
  const linkLocation = item.content.link.location;
  const title = item.descriptor.title;
  const subtitle = item.descriptor.subtitle;

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
