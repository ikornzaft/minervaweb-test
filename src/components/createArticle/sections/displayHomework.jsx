import React, { useState } from 'react';
import { VStack, HStack, Text, Heading, Button, Tooltip } from '@chakra-ui/react';
import { FaRegTrashAlt } from 'react-icons/fa';

import { ParagraphReducer } from '../../common/paragraphReducer';

const DisplayHomework = ({ options, homework, selectedHomeworks, setSelectedHomeworks }) => {
  console.log(homework);
  console.log(selectedHomeworks);
  const titleString = homework.descriptor.title;
  const subtitleString = homework.descriptor.subtitle;

  const [removedElement, setRemovedElement] = useState(null);

  const deleteItem = () => {
    const filteredHomeworks = selectedHomeworks.filter(
      (el) => el.content.entity.publicId !== homework.content.entity.publicId
    );

    setSelectedHomeworks(filteredHomeworks);
  };

  return (
    <HStack width="100%">
      <VStack bg="gray.100" borderRadius="md" p={3} width="100%">
        <Heading as="h4" fontSize="sm">
          {titleString}
        </Heading>
        <Text color="gray.700" fontSize="xs">
          {ParagraphReducer(subtitleString)}
        </Text>
      </VStack>
      <Tooltip bg="white" color="gray.700" label="Borrar artículo">
        <Button margin="0" size="xs" onClick={deleteItem}>
          <FaRegTrashAlt />
        </Button>
      </Tooltip>
    </HStack>
  );
};

export { DisplayHomework };
