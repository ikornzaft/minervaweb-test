import React from 'react';
import { Link } from 'react-router-dom';
import {
  VStack,
  HStack,
  Heading,
  Text,
  Stack,
  Box,
  Image,
} from '@chakra-ui/react';
import { SectionItem } from './sectionItem';
import articleIcon from '../../assets/images/application.svg';
import linkIcon from '../../assets/images/www.svg';
import quizIcon from '../../assets/images/quiz.svg';

const SectionsList = ({ sections }) => {
  console.log(sections);

  return (
    <VStack
      bgColor="gray.100"
      borderRadius="lg"
      w="45rem"
      paddingY={4}
      paddingX={8}
    >
      <HStack textAlign="left" justifyContent="flex-start" w="40rem">
        <Heading
          fontFamily="Poppins"
          fontSize="sm"
          color="gray.600"
          fontWeight="400"
        >
          ARTÍCULOS RELACIONADOS
        </Heading>
      </HStack>
      <Stack
        width="40rem"
        bgColor="white"
        borderRadius="lg"
        justifyContent="flex-start"
        alignItems="flex-start"
        direction="row"
        overflow="hidden"
        borderStyle="solid"
        borderWidth="1px"
        maxHeight="100px"
        _hover={{ bg: 'gray.100' }}
      >
        <Box w="90px" h="90px" p={2}>
          <Image src={articleIcon}></Image>
        </Box>
        <Stack width="100%" justifyContent="flex-start">
          <Stack width="100%" direction="row" alignItems="center" paddingX={4}>
            <Stack paddingTop={4} alignItems="flex-start">
              <Heading
                as="h3"
                size="sm"
                marginLeft={0}
                lineHeight="0.7rem"
                fontFamily="Open Sans"
              >
                ¿Qué es la genética?
              </Heading>
              <Box textAlign="left" marginTop="0" paddingLeft={0}>
                <Text
                  as="h5"
                  fontSize="xs"
                  fontFamily="Open Sans"
                  fontWeight="400"
                >
                  La genética es el área de estudio de la biología que busca
                  comprender y explicar cómo se transmite la herencia biológica
                  de generación en generación mediante el ADN.
                </Text>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <HStack textAlign="left" justifyContent="flex-start" w="40rem" paddingTop={2}>
      <Heading
        fontFamily="Poppins"
        fontSize="sm"
        color="gray.600"
        fontWeight="400"

      >
        PARA CONOCER MÁS
      </Heading>
    </HStack>
    <Stack
      width="40rem"
      bgColor="white"
      borderRadius="lg"
      justifyContent="flex-start"
      alignItems="flex-start"
      direction="row"
      overflow="hidden"
      borderStyle="solid"
      borderWidth="1px"
      maxHeight="100px"
      _hover={{ bg: 'gray.100' }}
    >
      <Box w="90px" h="90px" p={2}>
        <Image src={linkIcon}></Image>
      </Box>
      <Stack width="100%" justifyContent="flex-start">
        <Stack width="100%" direction="row" alignItems="center" paddingX={4}>
          <Stack paddingTop={4} alignItems="flex-start">
            <Heading
              as="h3"
              size="sm"
              marginLeft={0}
              lineHeight="0.7rem"
              fontFamily="Open Sans"
            >
            La mitosis: ¿cómo se dividen tus células?
            </Heading>
            <Box textAlign="left" marginTop="0" paddingLeft={0}>
              <Text
                as="h5"
                fontSize="xs"
                fontFamily="Open Sans"
                fontWeight="400"
              >
              https://genotipia.com/mitosis/
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>

    <HStack textAlign="left" justifyContent="flex-start" w="40rem" paddingTop={2}>
    <Heading
      fontFamily="Poppins"
      fontSize="sm"
      color="gray.600"
      fontWeight="400"

    >
      PARA HACER
    </Heading>
  </HStack>
  <Stack
    width="40rem"
    bgColor="white"
    borderRadius="lg"
    justifyContent="flex-start"
    alignItems="flex-start"
    direction="row"
    overflow="hidden"
    borderStyle="solid"
    borderWidth="1px"
    maxHeight="100px"
    _hover={{ bg: 'gray.100' }}
  >
    <Box w="90px" h="90px" p={2}>
      <Image src={quizIcon}></Image>
    </Box>
    <Stack width="100%" justifyContent="flex-start">
      <Stack width="100%" direction="row" alignItems="center" paddingX={4}>
        <Stack paddingTop={4} alignItems="flex-start">
          <Heading
            as="h3"
            size="sm"
            marginLeft={0}
            lineHeight="0.7rem"
            fontFamily="Open Sans"
          >
            Autoevaluación: División celular
          </Heading>
          <Box textAlign="left" marginTop="0" paddingLeft={0}>
            <Text
              as="h5"
              fontSize="xs"
              fontFamily="Open Sans"
              fontWeight="400"
            >
              
            </Text>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  </Stack>

    </VStack>
  );
};

export { SectionsList };
