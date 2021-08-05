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
    <VStack p={6} w="100%">
      {paragraphType === 'image' ? (
        <DisplayImage linkLocation={linkLocation} title={title} />
      ) : null}
      {paragraphType === 'link' ? (
        <DisplayLink linkLocation={linkLocation} subtitle={subtitle} title={title} />
      ) : null}
      {paragraphType === 'audio' ? (
        <DisplayAudio linkLocation={linkLocation} subtitle={subtitle} title={title} />
      ) : null}
      {paragraphType === 'document' ? (
        <DisplayDocument linkLocation={linkLocation} subtitle={subtitle} title={title} />
      ) : null}
    </VStack>
  );
};

export { ParagraphItemDisplay };
