import React from 'react';
import { VStack, Text, Textarea } from '@chakra-ui/react';

const EditElementFormText = ({ textParagraph, setTextParagraph }) => {
  return (
    <VStack w="90%" h="250px">
      <Textarea h="100%"
        value={textParagraph}
        onChange={(el) => setTextParagraph(el.target.value)}
      />
    </VStack>
  );
};

export { EditElementFormText };
