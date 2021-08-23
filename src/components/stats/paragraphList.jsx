import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Stack,
  Heading,
  Box,
  Text,
  Image,
  RadioGroup,
  Radio,
  Textarea,
} from '@chakra-ui/react';
import { GoCheck, GoX } from 'react-icons/go';

const ParagraphList = ({ paragraph, paragraphIndex, answersArray = [], student }) => {
  console.log(answersArray);
  console.log(student);
  console.log(paragraph);
  const options = paragraph.content.options;
  const [value, setValue] = useState('');

  const selectRadio = (el) => {
    setValue(+el);
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
      {options.length > 0 ? (
        <HStack>
          {answersArray[student]?.resource.paragraphs[paragraphIndex] ? (
            <>
              <Text>{answersArray[student]?.resource.paragraphs[paragraphIndex]}</Text>
              {options.find((el) => el.answer === true).descriptor.title ===
              answersArray[student]?.resource.paragraphs[paragraphIndex] ? (
                <Box as={GoCheck} color="green" size="20px" />
              ) : (
                <Box as={GoX} color="red" size="20px" />
              )}
            </>
          ) : null}
        </HStack>
      ) : (
        <Box borderColor="gray.300" borderRadius="lg" borderWidth="1px" p={6} w="35rem">
          {answersArray[student]?.resource.paragraphs[paragraphIndex]}
        </Box>
      )}
    </VStack>
  );
};

export { ParagraphList };
