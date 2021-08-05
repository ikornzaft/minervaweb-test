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

const HomeworkParagraph = ({
  paragraph,
  paragraphIndex,
  paragraphsLength,
  answersArray,
  setAnswersArray,
  handleChangeTextAnswer,
}) => {
  console.log(paragraphsLength);
  const options = paragraph.content.options;
  const [value, setValue] = useState('');

  const selectRadio = (el) => {
    setValue(+el);
    handleChangeTextAnswer(paragraphIndex, options[el].descriptor.title);
  };

  return (
    <VStack
      borderWidth="1px"
      borderColor="gray.300"
      borderRadius="lg"
      w="45rem"
      p={3}
    >
      {paragraphsLength > 1 ? (
        <Text fontSize="xs">CONSIGNA {paragraphIndex + 1}:</Text>
      ) : null}
      <Box paddingBottom={1}>
        <Heading as="h3" fontSize="md" fontFamily="open sans" fontWeight="400">
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
    </VStack>
  );
};

export { HomeworkParagraph };
