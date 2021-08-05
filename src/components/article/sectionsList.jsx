import React from 'react';
import { VStack } from '@chakra-ui/react';

import { DisplayKnowMore } from './displayKnowMore';
import { DisplayToDo } from './displayToDo';

const SectionsList = ({ sections }) => {
  return (
    <VStack bgColor="gray.100" borderRadius="lg" paddingX={8} paddingY={4} w="45rem">
      {sections[0].contents.length > 0 ? <DisplayKnowMore sections={sections[0].contents} /> : null}
      {sections[1].contents.length > 0 ? <DisplayToDo sections={sections[1].contents} /> : null}
    </VStack>
  );
};

export { SectionsList };
