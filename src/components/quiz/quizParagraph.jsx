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

const QuizParagraph = ({
  paragraph,
  paragraphIndex,
  answersArray,
  setAnswersArray,
}) => {
  const options = paragraph.content.options;
  const [value, setValue] = useState('');
  const selectRadio = (el) => {
    setValue(+el);
    const answer = {
      id: paragraphIndex,
      value: el,
    };
    const newFilteredArray = answersArray.filter(
      (el) => el.id !== paragraphIndex
    );
    newFilteredArray.push(answer);
    setAnswersArray(newFilteredArray);
  };
  return (
    <VStack
      borderWidth="1px"
      borderColor="gray.300"
      borderRadius="lg"
      w="45rem"
      p={3}
    >
      <Text fontSize="xs">PREGUNTA {paragraphIndex + 1}:</Text>
      <Box paddingBottom={1}>
        <Heading as="h3" fontSize="md" fontFamily="open sans">
          {paragraph.descriptor.title}
        </Heading>
      </Box>
      <Box paddingBottom={1}>
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
        <RadioGroup key={index} onChange={selectRadio} value={value}>
          <Box>
            <HStack
              p={3}
              bg="gray.100"
              borderWidth="1px"
              borderColor="gray.300"
              w="35rem"
              borderRadius="lg"
              _hover={{ bg: 'gray.200' }}
            >
              <Radio borderColor="gray.400" w="100%" value={index}>
                <Box w="100%">
                  <Text>{option.descriptor.title}</Text>
                </Box>
              </Radio>
            </HStack>
          </Box>
        </RadioGroup>
      ))}
    </VStack>
  );
};

export { QuizParagraph };
