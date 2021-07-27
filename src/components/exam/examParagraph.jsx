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
  Textarea
} from '@chakra-ui/react';

const ExamParagraph = ({
  paragraph,
  paragraphIndex,
  answersArray,
  setAnswersArray,
  handleChangeTextAnswer,
}) => {
  const options = paragraph.content.options;
  const [value, setValue] = useState('');

  const selectRadio = (el) => {
    setValue(+el);
    handleChangeTextAnswer(paragraphIndex, options[el].descriptor.title)
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
      {options.length > 0 ? (
      <Box>
      {options.map((option, index) => (
        <RadioGroup onChange={selectRadio} value={value}>
          <Stack p={1}>
            <HStack
              p={3}
              bg="gray.100"
              borderWidth="1px"
              borderColor="gray.300"
              w="35rem"
              borderRadius="lg"
              _hover={{bg:"gray.200"}}
            >
              <Radio borderColor="gray.400" w="100%" value={index}>
                <Box w="100%" >
                  <Text>{option.descriptor.title}</Text>
                </Box>
              </Radio>
            </HStack>
          </Stack>
        </RadioGroup>
      ))}
      </Box>
      ) : <Textarea placeholder="Tu respuesta..." onChange={el => handleChangeTextAnswer(paragraphIndex, el.target.value)} />}
    </VStack>
  );
};

export { ExamParagraph };
