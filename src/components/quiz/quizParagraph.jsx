import React from 'react'
import { VStack, Heading, Box, Text, Image } from '@chakra-ui/react';
import { OptionDisplay } from './optionDisplay';

const QuizParagraph = ({paragraph, paragraphIndex}) => {
  const options = paragraph.content.options;
  console.log(paragraph)
  return (
    <VStack borderWidth="1px" borderRadius="lg" w="45rem" p={4} >
      <Text fontSize="xs">PREGUNTA {paragraphIndex + 1}:</Text>
      <Box paddingBottom={2}>
        <Heading as="h3" fontSize="md" fontFamily="open sans">{paragraph.descriptor.title}</Heading>
      </Box>
      <Box paddingBottom={2}>
      {paragraph.content.link ? <Image width="25rem" objectFit="cover" borderRadius="lg" src={`http://www.afatecha.com/id/files/image/${paragraph.content.link.location}`} /> : null}
      </Box>

      {options.map((option, index)=> (
        <OptionDisplay option={option} optionIndex={index} />
      ))}

    </VStack>
  )
}

export { QuizParagraph }
