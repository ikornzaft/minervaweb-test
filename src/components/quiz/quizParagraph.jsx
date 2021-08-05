import React, { useState } from 'react';
import { VStack, HStack, Heading, Box, Text, Image, RadioGroup, Radio } from '@chakra-ui/react';

const QuizParagraph = ({ paragraph, paragraphIndex, answersArray, setAnswersArray }) => {
  const options = paragraph.content.options;
  const [value, setValue] = useState('');
  const selectRadio = (el) => {
    setValue(+el);
    const answer = {
      id: paragraphIndex,
      value: el,
    };
    const newFilteredArray = answersArray.filter((el) => el.id !== paragraphIndex);

    newFilteredArray.push(answer);
    setAnswersArray(newFilteredArray);
  };

  return (
    <VStack borderColor="gray.300" borderRadius="lg" borderWidth="1px" p={3} w="45rem">
      <Text fontSize="xs">PREGUNTA {paragraphIndex + 1}:</Text>
      <Box paddingBottom={1}>
        <Heading as="h3" fontFamily="open sans" fontSize="md">
          {paragraph.descriptor.title}
        </Heading>
      </Box>
      <Box paddingBottom={1}>
        {paragraph.content.link ? (
          <Image
            borderRadius="lg"
            objectFit="cover"
            src={`http://www.afatecha.com/id/files/image/${paragraph.content.link.location}`}
            width="25rem"
          />
        ) : null}
      </Box>
      {options.map((option, index) => (
        <RadioGroup key={index} value={value} onChange={selectRadio}>
          <Box>
            <HStack
              _hover={{ bg: 'gray.200' }}
              bg="gray.100"
              borderColor="gray.300"
              borderRadius="lg"
              borderWidth="1px"
              p={3}
              w="35rem"
            >
              <Radio borderColor="gray.400" value={index} w="100%">
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
