import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, VStack, HStack, Heading, Box, Text, Image } from '@chakra-ui/react';
import { GoCheck, GoX } from 'react-icons/go';

import { DisplayContent } from '../forum/displayContent';

const ParagraphList = ({ paragraph, paragraphIndex, answersArray = [], student }) => {
  const param = useParams();

  const options = paragraph.content.options;

  const DisplayAnswer = (index) => {
    if (answersArray[student]?.resource.paragraphs[index].files) {
      return (
        <Box paddingTop={4}>
          <DisplayContent paragraphs={answersArray[student]?.resource.paragraphs[index].files} />
        </Box>
      );
    } else {
      return (
        <Text color="gray.700">
          {answersArray[student]?.resource.paragraphs[index].descriptor.description}
        </Text>
      );
    }
  };

  return (
    <VStack bg="white" borderColor="gray.300" borderRadius="lg" borderWidth="1px" p={3} w="45rem">
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
              <Text>
                {param.id.slice(0, 1) === 'H'
                  ? answersArray[student]?.resource.paragraphs[paragraphIndex].descriptor
                      .description
                  : answersArray[student]?.resource.paragraphs[paragraphIndex]}
              </Text>
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
        <Box>
          {param.id.slice(0, 1) === 'H' ? (
            <Stack
              alignItems="center"
              borderColor="gray.300"
              borderRadius="lg"
              borderWidth="1px"
              justifyContent="center"
              p={6}
              w="35rem"
            >
              {DisplayAnswer(paragraphIndex)}
            </Stack>
          ) : (
            <Stack
              alignItems="center"
              borderColor="gray.300"
              borderRadius="lg"
              borderWidth="1px"
              justifyContent="center"
              p={6}
              w="35rem"
            >
              <Box>{answersArray[student]?.resource.paragraphs[paragraphIndex]}</Box>
            </Stack>
          )}
        </Box>
      )}
    </VStack>
  );
};

export { ParagraphList };
