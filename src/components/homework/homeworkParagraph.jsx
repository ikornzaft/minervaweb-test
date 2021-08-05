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
    <VStack borderColor="gray.300" borderRadius="lg" borderWidth="1px" p={3} w="45rem">
      {paragraphsLength > 1 ? <Text fontSize="xs">CONSIGNA {paragraphIndex + 1}:</Text> : null}
      <Box paddingBottom={1}>
        <Heading as="h3" fontFamily="open sans" fontSize="md" fontWeight="400">
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
    </VStack>
  );
};

export { HomeworkParagraph };
