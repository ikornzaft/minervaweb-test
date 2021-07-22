import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Heading,
  Box,
  Text,
  Image,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';

const QuizParagraph = ({ paragraph, paragraphIndex, answersArray, setAnswersArray }) => {
  const options = paragraph.content.options;
  const [value, setValue] = useState('');
  const selectRadio = (el) => {
    setValue(+el);
    const answer = {
      id: paragraphIndex,
      value: el
    }
    const newFilteredArray = answersArray.filter(el => el.id !== paragraphIndex)
    newFilteredArray.push(answer)
    setAnswersArray(newFilteredArray);
  };
  return (
    <VStack borderWidth="1px" borderRadius="lg" w="45rem" p={4}>
      <Text fontSize="xs">PREGUNTA {paragraphIndex + 1}:</Text>
      <Box paddingBottom={2}>
        <Heading as="h3" fontSize="md" fontFamily="open sans">
          {paragraph.descriptor.title}
        </Heading>
      </Box>
      <Box paddingBottom={2}>
        {paragraph.content.link ? (
          <Image
            width="25rem"
            objectFit="cover"
            borderRadius="lg"
            src={`http://www.afatecha.com/id/files/image/${paragraph.content.link.location}`}
          />
        ) : null}
      </Box>
      {options.map((option, index) => (
        <RadioGroup onChange={selectRadio} value={value}>
          <Box paddingBottom={2}>
            <HStack p={4} bg="gray.100" w="35rem" h="5rem" borderRadius="lg">
              <Radio value={index}></Radio>
              <Text>{option.descriptor.title}</Text>
            </HStack>
          </Box>
        </RadioGroup>
      ))}
    </VStack>
  );
};

export { QuizParagraph };
