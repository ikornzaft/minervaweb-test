import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Tooltip,
} from '@chakra-ui/react';
import { ParagraphReducer } from '../../common/paragraphReducer';
import { FaRegTrashAlt } from 'react-icons/fa';

const DisplayQuiz = ({
  options,
  quiz,
  selectedQuizzes,
  setSelectedQuizzes,
}) => {
  const titleString = quiz.descriptor.title;
  const subtitleString = quiz.descriptor.subtitle;

  const [removedElement, setRemovedElement] = useState(null);

   const deleteItem = (e) => {
    const filteredQuizzes = selectedQuizzes.filter(
      (el) => el.content.entity.publicId !== quiz.content.entity.publicId
    );
    setSelectedQuizzes(filteredQuizzes);
  };

  return (
    <HStack width="100%">
      <VStack width="100%" p={3} bg="gray.100" borderRadius="md">
        <Heading as="h4" fontSize="sm">
          {titleString}
        </Heading>
        <Text fontSize="xs" color="gray.700">{ParagraphReducer(subtitleString)}</Text>
      </VStack>
      <Tooltip label="Borrar artículo" bg="white" color="gray.700">
        <Button margin="0" size="xs" onClick={deleteItem} >
          <FaRegTrashAlt />
        </Button>
      </Tooltip>
    </HStack>
  );
};

export { DisplayQuiz };
