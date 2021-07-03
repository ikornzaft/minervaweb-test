import React from 'react';
import { VStack, Textarea, Input } from '@chakra-ui/react';

const EditElementFormLink = ({
  title,
  setTitle,
  subtitle,
  setSubtitle,
  location,
  setLocation,
}) => {
  return (
    <VStack w="90%" h="250px">
    <Input type="text" value={location} onChange={(el) => setLocation(el.target.value)} />
    <Input type="text" value={title} onChange={(el) => setTitle(el.target.value)} />
      <Textarea
        h="100%"
        value={subtitle}
        onChange={(el) => setSubtitle(el.target.value)}
      />
    </VStack>
  );
};

export { EditElementFormLink };
