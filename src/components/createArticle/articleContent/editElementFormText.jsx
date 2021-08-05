import React from 'react';
import { VStack, Text, Textarea } from '@chakra-ui/react';

const EditElementFormText = ({ textParagraph, setTextParagraph }) => {
  return (
    <VStack h="250px" w="90%">
      <Textarea
        h="100%"
        value={textParagraph}
        onChange={(el) => setTextParagraph(el.target.value)}
      />
    </VStack>
  );
};

export { EditElementFormText };
